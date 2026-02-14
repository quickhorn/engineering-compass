import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ContributionDay } from "../../src/shared/github-types";

const GITHUB_USERNAME = "quickhorn";

function toLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const PAT = process.env.GITHUB_PAT;
  if (!PAT) {
    return res.status(500).json({ error: "GITHUB_PAT not configured" });
  }

  try {
    const since = new Date();
    since.setMonth(since.getMonth() - 3);
    since.setHours(0, 0, 0, 0);

    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection(from: "${since.toISOString()}") {
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

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAT}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL error: ${response.status}`);
    }

    const json = await response.json();
    const weeks =
      json.data.user.contributionsCollection.contributionCalendar.weeks;

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

    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=300"
    );
    return res.status(200).json(days);
  } catch (error) {
    console.error("Contributions fetch failed:", error);
    return res.status(500).json({ error: "Failed to fetch contributions" });
  }
}
