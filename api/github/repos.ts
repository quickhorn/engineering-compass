import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { RepoSummary } from "../../src/shared/github-types";

const GITHUB_USERNAME = "quickhorn";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const PAT = process.env.GITHUB_PAT;
  if (!PAT) {
    return res.status(500).json({ error: "GITHUB_PAT not configured" });
  }

  const headers = {
    Authorization: `Bearer ${PAT}`,
    Accept: "application/vnd.github+json",
  };

  try {
    const repoRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10&type=all`,
      { headers }
    );
    if (!repoRes.ok) throw new Error(`GitHub API error: ${repoRes.status}`);
    const repos = await repoRes.json();

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
        // ignore individual contributor fetch failures
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

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=300"
    );
    return res.status(200).json(results);
  } catch (error) {
    console.error("Repos fetch failed:", error);
    return res.status(500).json({ error: "Failed to fetch repos" });
  }
}