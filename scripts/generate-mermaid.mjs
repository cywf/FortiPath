#!/usr/bin/env node
// Mermaid generator: scans the repo and writes ./mermaid/*.mmd
// No dependencies. Node >= 18 (tested on 20).
// Heuristics over perfection; stubs are written when signals are absent.

import { promises as fs } from "fs";
import path from "path";

const root = process.cwd();
const outDir = path.join(root, "mermaid");
await fs.mkdir(outDir, { recursive: true });

const MAX_DEPTH   = Number(process.env.MMD_MAX_DEPTH   || 4);
const MAX_ENTRIES = Number(process.env.MMD_MAX_ENTRIES || 15000);
const MAX_FILE_MB = Number(process.env.MMD_MAX_FILE_MB || 1);
const MAX_FILE_SIZE = MAX_FILE_MB * 1024 * 1024;

const DEFAULT_IGNORES = new Set([
  ".git", ".github", "node_modules", ".pnpm-store",
  ".venv", "venv", "__pycache__", ".pytest_cache", ".mypy_cache",
  "dist", "build", "out", "coverage", ".next", ".nuxt", ".cache",
  ".gradle", "target", ".idea", ".vscode", ".terraform", "vendor",
  ".dart_tool", ".tox", ".egg-info"
]);

const SKIP_EXTS = new Set([
  ".png",".jpg",".jpeg",".gif",".webp",".svg",".ico",
  ".mp4",".mov",".avi",".mkv",".mp3",".wav",".flac",
  ".zip",".gz",".bz2",".7z",".tar",".tgz",".xz",
  ".pdf",".jar",".exe",".dll",".dylib",".so"
]);

// Allow repo-specific skips
const ignoreListPath = path.join(root, ".mermaidignore");
let extraIgnores = [];
try {
  const raw = await fs.readFile(ignoreListPath, "utf8");
  extraIgnores = raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
} catch {}
const IGNORES = new Set([...DEFAULT_IGNORES, ...extraIgnores]);

const repo = process.env.GITHUB_REPOSITORY?.split("/").pop() || path.basename(root);

// ---------- utility ----------
const posix = p => p.split(path.sep).join("/");
const rel = p => posix(path.relative(root, p)) || ".";
const idify = s => (s.replace(/[^A-Za-z0-9_]/g, "_").replace(/^(\d)/, "_$1") || "n").slice(-64);
const read = p => fs.readFile(p, "utf8").catch(() => "");

async function readdir(dir) {
  try { return await fs.readdir(dir, { withFileTypes: true }); }
  catch { return []; }
}

let entryCount = 0;
async function walk(dir, depth = 0, acc = []) {
  if (depth > MAX_DEPTH || entryCount > MAX_ENTRIES) return acc;
  const entries = (await readdir(dir)).sort((a,b)=>a.name.localeCompare(b.name));
  for (const e of entries) {
    if (entryCount++ > MAX_ENTRIES) break;
    if (e.name === ".DS_Store" || IGNORES.has(e.name)) continue;
    const full = path.join(dir, e.name);
    const st = await fs.stat(full).catch(()=>null);
    if (!st) continue;
    if (e.isDirectory()) {
      acc.push({ type: "dir", path: full });
      await walk(full, depth + 1, acc);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (SKIP_EXTS.has(ext)) continue;
      if (st.size > MAX_FILE_SIZE) continue;
      acc.push({ type: "file", path: full });
    }
  }
  return acc;
}

async function collectByExt(exts) {
  const res = [];
  async function rec(dir) {
    const ents = await readdir(dir);
    for (const e of ents) {
      if (IGNORES.has(e.name)) continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) await rec(p);
      else if (exts.includes(path.extname(e.name).toLowerCase())) res.push(p);
    }
  }
  await rec(root);
  return res;
}

// ---------- 1) FLOWCHART: directory tree ----------
async function buildFlowchart() {
  const items = await walk(root);
  const nodes = new Set();
  const edges = [];
  const addDir = p => {
    const nodeId = "d_" + idify(rel(p) || repo);
    nodes.add(`${nodeId}["${(p===root? repo : path.basename(p))}/"]:::dir`);
    return nodeId;
  };
  const addFile = (p, base) => {
    const nodeId = "f_" + idify(rel(p));
    nodes.add(`${nodeId}["${base}"]`);
    return nodeId;
  };

  const dirIds = new Map();
  dirIds.set(root, addDir(root));

  // Ensure parents exist
  function ensureParent(p) {
    const parent = path.dirname(p);
    if (!dirIds.has(parent)) {
      if (parent !== p) {
        ensureParent(parent);
        dirIds.set(parent, addDir(parent));
      }
    }
  }

  for (const it of items) {
    ensureParent(it.path);
    const parent = path.dirname(it.path);
    const parentId = dirIds.get(parent);
    if (it.type === "dir") {
      const id = addDir(it.path);
      dirIds.set(it.path, id);
      edges.push(`${parentId} --> ${id}`);
    } else {
      const id = addFile(it.path, path.basename(it.path));
      edges.push(`${parentId} --> ${id}`);
    }
  }

  return [
    "flowchart TB",
    "classDef dir fill:#eef,stroke:#99c,stroke-width:1px;",
    ...nodes,
    ...edges
  ].join("\n") + "\n";
}

// ---------- 2) ER DIAGRAM: SQL + Prisma (heuristic) ----------
async function buildER() {
  let mm = "erDiagram\n";
  const tables = new Map(); // name -> [attributes...]
  const fks = [];           // { from, to }

  // SQL DDL
  const sqlFiles = (await collectByExt([".sql"])).filter(f => /schema|migrat|ddl|create/i.test(f));
  const sql = (await Promise.all(sqlFiles.map(read))).join("\n");
  const ct = /create\s+table\s+["`]?([A-Za-z0-9_]+)["`]?[\s\S]*?\(([\s\S]*?)\)\s*;/ig;
  let m;
  while ((m = ct.exec(sql))) {
    const t = m[1];
    const body = m[2];
    const attrs = [];
    body.split(/\r?\n/).forEach(line => {
      const fk = /foreign\s+key\s*\(([^)]+)\)\s*references\s+["`]?([A-Za-z0-9_]+)["`]?\s*\(([^)]+)\)/i.exec(line);
      if (fk) fks.push({ from: t, to: fk[2] });
      const col = /^\s*["`]?([A-Za-z0-9_]+)["`]?\s+([A-Za-z0-9_()]+)/.exec(line);
      if (col) attrs.push(`${col[2]} ${col[1]}`);
    });
    if (!tables.has(t)) tables.set(t, attrs);
  }

  // Prisma schema
  const prisma = await read(path.join(root, "prisma", "schema.prisma"));
  if (prisma) {
    const pm = /model\s+([A-Za-z0-9_]+)\s*\{([\s\S]*?)\}/g;
    let g;
    while ((g = pm.exec(prisma))) {
      const t = g[1], body = g[2];
      const attrs = tables.get(t) || [];
      body.split(/\r?\n/).forEach(line => {
        const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s+([A-Za-z0-9_\[\]\?]+)/.exec(line);
        if (m) {
          const [, name, type] = m;
          if (/[A-Z][A-Za-z0-9_]*(\[\]|\?)?/.test(type)) {
            const target = type.replace(/[\[\]\?]/g, "");
            if (target !== t) fks.push({ from: t, to: target });
          } else {
            attrs.push(`${type} ${name}`);
          }
        }
      });
      tables.set(t, attrs);
    }
  }

  // Emit
  if (!tables.size) {
    return mm + '  NOTE }o--o{ PLACEHOLDER : "No SQL/Prisma found"\n';
  }
  for (const [t, attrs] of tables) {
    mm += `  ${t} {\n`;
    attrs.slice(0, 12).forEach(a => mm += `    ${a}\n`);
    mm += `  }\n`;
  }
  // naive FK rendering
  const seen = new Set();
  for (const {from,to} of fks) {
    const key = `${from}->${to}`;
    if (seen.has(key)) continue; seen.add(key);
    mm += `  ${from} }o--|| ${to} : FK\n`;
  }
  return mm;
}

// ---------- 3) ARCHITECTURE: compose/k8s/terraform (light heuristics) ----------
async function buildArchitecture() {
  let mm = "architecture-beta\n";
  const nodes = [];

  // Compose services: parse names under top-level 'services:'
  async function composeServices(startDir) {
    const candidates = ["docker-compose.yml","docker-compose.yaml"];
    const found = [];
    async function rec(d) {
      const ents = await readdir(d);
      for (const e of ents) {
        if (IGNORES.has(e.name)) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) await rec(p);
        else if (candidates.includes(e.name)) found.push(p);
      }
    }
    await rec(startDir);
    const services = new Set();
    for (const f of found) {
      const text = await read(f);
      const lines = text.split(/\r?\n/);
      let inServices = false, baseIndent = 0;
      for (const line of lines) {
        if (!inServices && /^\s*services\s*:\s*$/.test(line)) {
          inServices = true; baseIndent = (line.match(/^\s*/)||[""])[0].length; continue;
        }
        if (inServices) {
          const indent = (line.match(/^\s*/)||[""])[0].length;
          if (indent <= baseIndent && line.trim()) { inServices = false; continue; }
          const m = /^\s*([A-Za-z0-9._-]+)\s*:\s*$/.exec(line);
          if (m) services.add(m[1]);
        }
      }
    }
    return Array.from(services);
  }

  // K8s: extract kind/name pairs (regex, no YAML parser)
  async function k8sObjects(startDir) {
    const out = [];
    async function rec(d) {
      const ents = await readdir(d);
      for (const e of ents) {
        if (IGNORES.has(e.name)) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) await rec(p);
        else if (/\.(ya?ml)$/.test(e.name)) {
          const docs = (await read(p)).split(/^---\s*$/m);
          for (const d of docs) {
            const kind = /kind:\s*([A-Za-z]+)/.exec(d)?.[1];
            const name = /metadata:\s*[\s\S]*?name:\s*([A-Za-z0-9._-]+)/.exec(d)?.[1];
            if (kind && name) out.push({ kind, name });
          }
        }
      }
    }
    await rec(startDir);
    return out;
  }

  // Terraform resources
  async function tfResources(startDir) {
    const out = [];
    async function rec(d) {
      const ents = await readdir(d);
      for (const e of ents) {
        if (IGNORES.has(e.name)) continue;
        const p = path.join(d, e.name);
        if (e.isDirectory()) await rec(p);
        else if (e.name.endsWith(".tf")) {
          const text = await read(p);
          const re = /resource\s+"([^"]+)"\s+"([^"]+)"/g;
          let m; while ((m = re.exec(text))) out.push({ type: m[1], name: m[2] });
        }
      }
    }
    await rec(startDir); return out;
  }

  const compose = await composeServices(root);
  const k8s = await k8sObjects(root);
  const tfs = await tfResources(root);

  if (!compose.length && !k8s.length && !tfs.length) {
    return "architecture-beta\nservice none(server)[No infra signals detected]\n";
  }

  if (compose.length) {
    mm += "group compose(cloud)[Docker Compose]\n";
    for (const s of compose.slice(0, 40)) nodes.push(`service ${idify("svc_"+s)}(server)[${s}] in compose`);
  }
  if (k8s.length) {
    mm += "group k8s(cloud)[Kubernetes]\n";
    for (const {kind,name} of k8s.slice(0, 60)) nodes.push(`service ${idify(kind+"_"+name)}(server)[${kind}: ${name}] in k8s`);
  }
  if (tfs.length) {
    mm += "group tf(cloud)[Terraform]\n";
    for (const {type,name} of tfs.slice(0, 60)) nodes.push(`service ${idify(type+"_"+name)}(database)[${type}.${name}] in tf`);
  }

  return mm + nodes.join("\n") + "\n";
}

// ---------- 4) CI SEQUENCE: GitHub Actions ----------
async function buildCISequence() {
  const wfDir = path.join(root, ".github", "workflows");
  const files = await readdir(wfDir);
  const yamls = files.filter(f => /\.ya?ml$/.test(f.name)).map(f=>f.name);
  if (!yamls.length) return "sequenceDiagram\nactor Dev\nDev->>Repo: push\nNote over Repo: No workflows found\n";
  let mm = "sequenceDiagram\nactor Dev\nparticipant GitHub\nparticipant Runner\n";
  for (const f of yamls.slice(0, 4)) {
    const text = await read(path.join(wfDir, f));
    const wfName = (/^name:\s*(.+)$/m.exec(text)?.[1] || f).trim();
    mm += `Dev->>GitHub: triggers "${wfName}"\nGitHub->>Runner: dispatch\nloop ${wfName}\n`;

    // naive: job + step names by indentation
    const jobNames = Array.from(text.matchAll(/^\s{2,}([A-Za-z0-9_-]+):\s*#?\s*job?/gm)).map(m=>m[1]);
    if (!jobNames.length) {
      // fallback: look under 'jobs:' then keys at 2-space indent
      const jobsMatch = /^jobs:\s*$/m.exec(text);
      if (jobsMatch) {
        const afterJobs = text.slice(jobsMatch.index + jobsMatch[0].length);
        const lines = afterJobs.split(/\r?\n/);
        for (const ln of lines) {
          // Stop at next top-level key (no indent)
          if (/^\S/.test(ln) && ln.trim()) break;
          const m = /^  ([A-Za-z0-9_-]+):\s*$/.exec(ln);
          if (m) jobNames.push(m[1]);
        }
      }
    }
    for (const j of jobNames.slice(0, 6)) {
      mm += `Runner->>Runner: job ${j}\n`;
      // Find job block: from "jobname:" to next job at same indent level or end
      const jobMatch = new RegExp(`^  ${j}:\\s*$`, "m").exec(text);
      if (jobMatch) {
        const afterJob = text.slice(jobMatch.index + jobMatch[0].length);
        const lines = afterJob.split(/\r?\n/);
        const jobLines = [];
        for (const ln of lines) {
          // Stop at next job (line starting with 2 spaces and identifier:)
          if (/^  [A-Za-z0-9_-]+:\s*$/.test(ln)) break;
          // Stop at next top-level section
          if (/^\S/.test(ln) && ln.trim()) break;
          jobLines.push(ln);
        }
        const jobBlock = jobLines.join("\n");
        const stepNames = Array.from(jobBlock.matchAll(/^\s{4,}-\s+name:\s*(.+)$/gm)).map(x => x[1].trim()).slice(0, 8);
        for (const s of stepNames) mm += `Runner-->>Runner: ${s}\n`;
      }
    }
    mm += "end\n";
  }
  return mm;
}

// ---------- 5) BPMN-like lanes via subgraphs ----------
async function buildBPMNish() {
  const seq = await buildCISequence(); // reuse names lightly
  const hasCI = /Runner->>Runner: job /.test(seq);
  let mm = "flowchart LR\n";
  mm += 'subgraph DEV[Developer]\n  A[Commit / PR]\nend\n';
  mm += 'subgraph CI[CI/CD]\n  B[Build]\n  C[Test]\n  D[Deploy]\nend\n';
  mm += 'subgraph ENV[Environment]\n  E[Service Live]\nend\n';
  mm += "A --> B --> C --> D --> E\n";
  if (hasCI) mm += "%% CI steps discovered; see ci-sequence.mmd for details\n";
  return mm;
}

// ---------- write all ----------
async function write(name, content) {
  const p = path.join(outDir, name);
  await fs.writeFile(p, content.trim() + "\n", "utf8");
  return p;
}

const [flow, er, arch, seq, bpmn] = await Promise.all([
  buildFlowchart().then(s => write("flowchart.mmd", s)),
  buildER().then(s => write("er.mmd", s)),
  buildArchitecture().then(s => write("architecture.mmd", s)),
  buildCISequence().then(s => write("ci-sequence.mmd", s)),
  buildBPMNish().then(s => write("bpmnish.mmd", s))
]);

console.log("Generated Mermaid files:");
for (const f of [flow, er, arch, seq, bpmn]) console.log(" -", rel(f));
