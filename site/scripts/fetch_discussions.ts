import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Discussion {
  title: string;
  author: string;
  url: string;
  createdAt: string;
  category: string;
  commentCount: number;
}

async function fetchDiscussions() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN not set, using mock data');
    return createMockData();
  }

  const owner = 'cywf';
  const repo = 'FortiPath';

  const query = `
    query($owner: String!, $repo: String!, $first: Int!) {
      repository(owner: $owner, name: $repo) {
        discussions(first: $first, orderBy: {field: CREATED_AT, direction: DESC}) {
          nodes {
            title
            author {
              login
            }
            url
            createdAt
            category {
              name
            }
            comments {
              totalCount
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          owner,
          repo,
          first: 50,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return createMockData();
    }

    const discussions: Discussion[] =
      result.data?.repository?.discussions?.nodes?.map((node: any) => ({
        title: node.title,
        author: node.author?.login || 'Unknown',
        url: node.url,
        createdAt: node.createdAt,
        category: node.category?.name || 'General',
        commentCount: node.comments?.totalCount || 0,
      })) || [];

    return discussions;
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return createMockData();
  }
}

function createMockData(): Discussion[] {
  return [
    {
      title: 'Welcome to FortiPath Discussions',
      author: 'cywf',
      url: 'https://github.com/cywf/FortiPath/discussions/1',
      createdAt: new Date().toISOString(),
      category: 'Announcements',
      commentCount: 5,
    },
    {
      title: 'Feature Request: AI Threat Analysis',
      author: 'contributor',
      url: 'https://github.com/cywf/FortiPath/discussions/2',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      category: 'Ideas',
      commentCount: 3,
    },
  ];
}

async function main() {
  const discussions = await fetchDiscussions();

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  const outputPath = path.join(outputDir, 'discussions.json');
  fs.writeFileSync(outputPath, JSON.stringify(discussions, null, 2));

  console.log('✅ Discussions data saved to', outputPath);
  console.log(`   Found ${discussions.length} discussions`);
}

main().catch(console.error);
