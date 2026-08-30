/**
 * Build-time listing of public GitHub repos.
 * Does not run in the browser. Handwritten copy in src/data/site.ts always wins.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = 'ragulakrishna237';
const SITE_REPO = 'ragulakrishna237.github.io';
const SKIP = new Set([
  SITE_REPO,
  'zipline',
  'test_project_repo',
  'quant-concepts',
  'data-engineering-projects',
  'quant_platform',
  'trading-platform',
  'market-data-service',
  'streaming-service-',
  'streaming-service',
  'storage-engine',
  'apollo-data-project',
]);

const outPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'data', 'discovered-repos.json');

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${SITE_REPO}-sync`,
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function fetchRepos() {
  const repos = [];
  let url = `https://api.github.com/users/${USER}/repos?type=owner&sort=updated&per_page=100`;
  while (url) {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API ${response.status} ${await response.text()}`);
    }
    const page = await response.json();
    repos.push(...page);
    const next = response.headers.get('link')?.match(/<([^>]+)>;\s*rel="next"/);
    url = next ? next[1] : '';
  }
  return repos;
}

function toRecord(repo) {
  return {
    name: repo.name,
    html_url: repo.html_url,
    description: repo.description ?? '',
    language: repo.language ?? null,
  };
}

try {
  const fetched = await fetchRepos();
  const repos = fetched
    .filter((repo) => !repo.fork && !repo.archived && !SKIP.has(repo.name) && repo.size > 0)
    .map(toRecord);
  writeFileSync(
    outPath,
    `${JSON.stringify({ fetchedAt: new Date().toISOString(), repos }, null, 2)}\n`,
  );
  console.log(`Wrote ${repos.length} public repos to src/data/discovered-repos.json`);
} catch (error) {
  console.warn(`Repo sync skipped: ${error instanceof Error ? error.message : error}`);
}
