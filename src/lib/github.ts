// GitHub API service — uses VITE_GITHUB_PAT when available, falls back to mock data.

const GITHUB_USERNAME = "quickhorn";
const PAT = import.meta.env.VITE_GITHUB_PAT as string | undefined;

const headers: HeadersInit = PAT
  ? { Authorization: `Bearer ${PAT}`, Accept: "application/vnd.github+json" }
  : { Accept: "application/vnd.github+json" };

// ── Types ──────────────────────────────────────────────────────────

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface RepoSummary {
  name: string;
  language: string | null;
  description: string | null;
  commits: number;
  url: string;
  updatedAt: string;
}

// ── Helpers ────────────────────────────────────────────────────────

function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

function threeMonthsAgo(): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  d.setHours(0, 0, 0, 0);
  return d;
}

// ── Mock data generators ──────────────────────────────────────────

function generateMockContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  const start = threeMonthsAgo();
  const cursor = new Date(start);
  // Align to Sunday
  cursor.setDate(cursor.getDate() - cursor.getDay());

  while (cursor <= today) {
    const isWeekday = cursor.getDay() > 0 && cursor.getDay() < 6;
    const chance = isWeekday ? 0.7 : 0.3;
    const count = Math.random() < chance ? Math.floor(Math.random() * 12) + 1 : 0;
    days.push({
      date: cursor.toISOString().split("T")[0],
      count,
      level: toLevel(count),
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function generateMockRepos(): RepoSummary[] {
  return [
    { name: "startup-platform", language: "TypeScript", description: "SaaS platform for early-stage startup", commits: 247, url: "#", updatedAt: "2026-02-10" },
    { name: "api-gateway", language: "C#", description: "Microservice gateway with .NET 8", commits: 89, url: "#", updatedAt: "2026-02-08" },
    { name: "ml-pipeline", language: "Python", description: "Data pipeline for ML model training", commits: 134, url: "#", updatedAt: "2026-01-29" },
    { name: "portfolio-site", language: "TypeScript", description: "Personal portfolio built with React + Vite", commits: 52, url: "#", updatedAt: "2026-02-12" },
    { name: "design-system", language: "TypeScript", description: "Shared component library", commits: 41, url: "#", updatedAt: "2026-01-15" },
  ];
}

// ── Real API fetchers ─────────────────────────────────────────────

async function fetchContributions(): Promise<ContributionDay[]> {
  // GitHub GraphQL is needed for contribution calendar — requires PAT with read:user scope
  const since = threeMonthsAgo().toISOString();
  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection(from: "${since}") {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`);
  const json = await res.json();
  const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;

  const days: ContributionDay[] = [];
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      days.push({
        date: day.date,
        count: day.contributionCount,
        level: toLevel(day.contributionCount),
      });
    }
  }
  return days;
}

async function fetchRepos(): Promise<RepoSummary[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10&type=all`,
    { headers }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const repos = await res.json();

  // Fetch commit counts for recent repos
  const results: RepoSummary[] = [];
  for (const repo of repos.slice(0, 5)) {
    let commits = 0;
    try {
      const contribRes = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/contributors`,
        { headers }
      );
      if (contribRes.ok) {
        const contributors = await contribRes.json();
        const me = contributors.find(
          (c: any) => c.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()
        );
        commits = me?.contributions ?? 0;
      }
    } catch {
      // ignore
    }

    results.push({
      name: repo.name,
      language: repo.language,
      description: repo.description,
      commits,
      url: repo.html_url,
      updatedAt: repo.pushed_at?.split("T")[0] ?? "",
    });
  }
  return results;
}

// ── Public API ────────────────────────────────────────────────────

export async function getContributions(): Promise<ContributionDay[]> {
  if (!PAT) return generateMockContributions();
  try {
    return await fetchContributions();
  } catch (e) {
    console.warn("GitHub contributions fetch failed, using mock data:", e);
    return generateMockContributions();
  }
}

export async function getRecentRepos(): Promise<RepoSummary[]> {
  if (!PAT) return generateMockRepos();
  try {
    return await fetchRepos();
  } catch (e) {
    console.warn("GitHub repos fetch failed, using mock data:", e);
    return generateMockRepos();
  }
}
