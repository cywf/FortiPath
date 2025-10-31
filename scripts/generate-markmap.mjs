#!/usr/bin/env node
// Generates markmap/repo-map.md from the current repo.
// No deps, Node >= 18 (tested on 20). Conservative scan to avoid CI melt-down.

import { promises as fs } from "fs";
import path from "path";

const root = process.cwd();
const outDir = path.join(root, "markmap");
await fs.mkdir(outDir, { recursive: true });

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
  ".pdf",".jar",".exe",".dll",".dylib"
]);

const MAX_FILE_SIZE = 1024 * 1024;     // 1 MB
const MAX_DEPTH = Number(process.env.MARKMAP_MAX_DEPTH || 8);
const MAX_ENTRIES = Number(process.env.MARKMAP_MAX_ENTRIES || 20000);

const LANGUAGE_EXT_MAP = {
  ".ts": "TypeScript", ".tsx": "TypeScript",
  ".js": "JavaScript", ".jsx": "JavaScript",
  ".py": "Python", ".go": "Go", ".rs": "Rust",
  ".java": "Java", ".kt": "Kotlin",
  ".c": "C", ".h": "C", ".cpp": "C++", ".hpp": "C++",
  ".cs": "C#", ".rb": "Ruby", ".php": "PHP",
  ".sh": "Shell", ".ps1": "PowerShell",
  ".scala": "Scala", ".swift": "Swift",
  ".m": "Objective‑C", ".mm": "Objective‑C++",
  ".r": "R", ".lua": "Lua"
};

const ignoreListPath = path.join(root, ".markmapignore");
// Lines in .markmapignore are treated as literal names to skip (dirs or files).
let extraIgnores = [];
try {
  const raw = await fs.readFile(ignoreListPath, "utf8");
  extraIgnores = raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
} catch {}
const IGNORES = new Set([...DEFAULT_IGNORES, ...extraIgnores]);

const extCounts = new Map();
let totalEntries = 0;

function langOf(file) {
  const ext = path.extname(file).toLowerCase();
  if (!ext) return "Other";
  return LANGUAGE_EXT_MAP[ext] || ext.toUpperCase().slice(1);
}

async function walk(dir, depth = 0) {
  if (depth > MAX_DEPTH) return "";
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return "";
  }
  entries.sort((a,b) => a.name.localeCompare(b.name));
  let md = "";
  for (const e of entries) {
    if (totalEntries++ > MAX_ENTRIES) break;
    if (e.name === ".DS_Store" || IGNORES.has(e.name)) continue;

    const full = path.join(dir, e.name);
    const rel = path.relative(root, full);

    if (e.isDirectory()) {
      md += `${"  ".repeat(depth)}- **${e.name}/**\n`;
      md += await walk(full, depth + 1);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (SKIP_EXTS.has(ext)) continue;
      const st = await fs.stat(full).catch(() => null);
      if (!st || st.size > MAX_FILE_SIZE) continue;
      md += `${"  ".repeat(depth)}- ${e.name}\n`;
      extCounts.set(langOf(e.name), (extCounts.get(langOf(e.name)) || 0) + 1);
    }
  }
  return md;
}

const repo =
  process.env.GITHUB_REPOSITORY?.split("/")?.pop() || path.basename(root);

const tree = await walk(root, 0);
const total = Array.from(extCounts.values()).reduce((a,b) => a + b, 0);
const topLangs = Array.from(extCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 12)
  .map(([k, v]) => {
    const pct = total ? Math.round((v * 1000) / total) / 10 : 0;
    return `- ${k}: ${v} files (${pct}%)`;
  })
  .join("\n");

const frontmatter = `--- 
markmap:
  initialExpandLevel: 2
  maxWidth: 320
  color:
    - "#4c78a8"
    - "#f58518"
    - "#e45756"
    - "#72b7b2"
    - "#54a24b"
---`;

const md = `${frontmatter}

# ${repo} — Codebase Map

## Languages (top)
${topLangs || "- None"}

## Structure
${tree}
`;

await fs.writeFile(path.join(outDir, "repo-map.md"), md, "utf8");
console.log(`Wrote ${path.join("markmap", "repo-map.md")}`);
