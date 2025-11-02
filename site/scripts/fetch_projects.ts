import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectItem {
  id: string;
  title: string;
  status: string;
  labels: string[];
  url: string;
  createdAt: string;
}

async function fetchProjects() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn('GITHUB_TOKEN not set, using mock data with issues fallback');
    return createMockData();
  }

  const owner = 'cywf';
  const repo = 'FortiPath';

  // Try to fetch Projects v2 data first
  const projectQuery = `
    query($owner: String!, $repo: String!) {
      repository(owner: $owner, name: $repo) {
        projectsV2(first: 1) {
          nodes {
            title
            items(first: 100) {
              nodes {
                id
                content {
                  ... on Issue {
                    title
                    url
                    createdAt
                    labels(first: 10) {
                      nodes {
                        name
                      }
                    }
                  }
                }
                fieldValues(first: 10) {
                  nodes {
                    ... on ProjectV2ItemFieldSingleSelectValue {
                      name
                      field {
                        ... on ProjectV2SingleSelectField {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Try Projects v2
    const projectResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: projectQuery,
        variables: { owner, repo },
      }),
    });

    const projectResult = await projectResponse.json();

    if (
      projectResult.data?.repository?.projectsV2?.nodes?.length > 0 &&
      !projectResult.errors
    ) {
      const project = projectResult.data.repository.projectsV2.nodes[0];
      const items: ProjectItem[] = project.items.nodes
        .filter((item: any) => item.content)
        .map((item: any) => {
          const statusField = item.fieldValues.nodes.find(
            (fv: any) => fv.field?.name === 'Status'
          );
          const labels = item.content.labels?.nodes?.map((l: any) => l.name) || [];

          return {
            id: item.id,
            title: item.content.title,
            status: statusField?.name || 'Todo',
            labels,
            url: item.content.url,
            createdAt: item.content.createdAt,
          };
        });

      return items;
    }

    // Fallback to issues by label
    console.log('Projects v2 not available, falling back to issues by label');
    return await fetchIssuesByLabel(token, owner, repo);
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to issues
    try {
      return await fetchIssuesByLabel(token, owner, repo);
    } catch {
      return createMockData();
    }
  }
}

async function fetchIssuesByLabel(
  token: string,
  owner: string,
  repo: string
): Promise<ProjectItem[]> {
  const statuses = ['todo', 'doing', 'done'];
  const allItems: ProjectItem[] = [];

  for (const status of statuses) {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues?labels=status:${status}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (response.ok) {
      const issues = await response.json();
      issues.forEach((issue: any) => {
        allItems.push({
          id: issue.id.toString(),
          title: issue.title,
          status: status.charAt(0).toUpperCase() + status.slice(1),
          labels: issue.labels.map((l: any) => l.name),
          url: issue.html_url,
          createdAt: issue.created_at,
        });
      });
    }
  }

  return allItems;
}

function createMockData(): ProjectItem[] {
  return [
    {
      id: '1',
      title: 'Setup development environment',
      status: 'Done',
      labels: ['setup', 'status:done'],
      url: 'https://github.com/cywf/FortiPath/issues/1',
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: '2',
      title: 'Implement OSINT web crawler',
      status: 'Doing',
      labels: ['feature', 'status:doing'],
      url: 'https://github.com/cywf/FortiPath/issues/2',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: '3',
      title: 'Add AI threat analysis module',
      status: 'Todo',
      labels: ['enhancement', 'status:todo'],
      url: 'https://github.com/cywf/FortiPath/issues/3',
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
  ];
}

async function main() {
  const items = await fetchProjects();

  // Ensure output directory exists
  const outputDir = path.join(__dirname, '../public/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write to file
  const outputPath = path.join(outputDir, 'projects.json');
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2));

  console.log('✅ Project board data saved to', outputPath);
  console.log(`   Found ${items.length} items`);
}

main().catch(console.error);
