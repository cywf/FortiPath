import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  languages: Record<string, number>;
  recentCommits: Array<{
    sha: string;
    message: string;
    author: string;
    date: string;
  }>;
}

async function fetchRepoData() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.warn('GITHUB_TOKEN not set, using mock data');
    return createMockData();
  }

  const owner = 'cywf';
  const repo = 'FortiPath';

  try {
    // Fetch repository info
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json();

    // Fetch languages
    const languagesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const languages = languagesResponse.ok
      ? await languagesResponse.json()
      : {};

    // Fetch recent commits (last 12 weeks)
    const since = new Date();
    since.setDate(since.getDate() - 84); // 12 weeks ago

    const commitsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?since=${since.toISOString()}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const commits = commitsResponse.ok ? await commitsResponse.json() : [];

    const stats: RepoStats = {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      watchers: repoData.subscribers_count || 0,
      openIssues: repoData.open_issues_count || 0,
      languages,
      recentCommits: commits.slice(0, 50).map((commit: any) => ({
        sha: commit.sha,
        message: commit.commit.message,
        author: commit.commit.author.name,
        date: commit.commit.author.date,
      })),
    };

    return stats;
  } catch (error) {
    console.error('Error fetching repo data:', error);
    return createMockData();
  }
}

function createMockData(): RepoStats {
  return {
    stars: 12,
    forks: 3,
    watchers: 5,
    openIssues: 8,
    languages: {
      Python: 45000,
      Rust: 30000,
      Go: 15000,
      JavaScript: 8000,
      TypeScript: 5000,
    },
    recentCommits: [
      {
        sha: 'abc123',
        message: 'Initial commit',
        author: 'cywf',
        date: new Date().toISOString(),
      },
    ],
  };
}

async function main() {
  const stats = await fetchRepoData();

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  const outputPath = path.join(outputDir, 'stats.json');
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));

  console.log('✅ Repository stats saved to', outputPath);
}

main().catch(console.error);
