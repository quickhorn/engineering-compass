import { useMemo, useEffect, useState } from "react";
import { ExternalLink, GitCommit } from "lucide-react";
import { getContributions, getRecentRepos, type ContributionDay, type RepoSummary } from "@/lib/github";

const levelColors = [
  "bg-muted/50",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/60",
  "bg-primary/90",
];

export const GitHubHeatmap = () => {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [repos, setRepos] = useState<RepoSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getContributions(), getRecentRepos()]).then(([c, r]) => {
      setContributions(c);
      setRepos(r);
      setLoading(false);
    });
  }, []);

  // Group by weeks
  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
    // Align to week boundaries (Sunday start)
    let weekBuf: ContributionDay[] = [];
    for (const day of contributions) {
      const dow = new Date(day.date + "T00:00:00").getDay();
      if (dow === 0 && weekBuf.length > 0) {
        result.push(weekBuf);
        weekBuf = [];
      }
      weekBuf.push(day);
    }
    if (weekBuf.length > 0) result.push(weekBuf);
    return result;
  }, [contributions]);

  const total = contributions.reduce((s, c) => s + c.count, 0);

  if (loading) {
    return (
      <div className="rounded-lg border border-border/50 bg-card/50 p-6 text-center text-sm text-muted-foreground animate-pulse">
        Loading GitHub data…
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Heatmap */}
      <div className="rounded-lg border border-border/50 bg-card/50 p-4">
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-[3px]" style={{ minWidth: "max-content" }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`h-[10px] w-[10px] rounded-sm ${levelColors[day.level]} transition-colors hover:ring-1 hover:ring-primary/50`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">{total.toLocaleString()} contributions in the last 3 months</span>
          <div className="flex items-center gap-1">
            <span className="mr-1">Less</span>
            {levelColors.map((c, i) => (
              <div key={i} className={`h-[10px] w-[10px] rounded-sm ${c}`} />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>

      {/* Recent Repos */}
      <div className="rounded-lg border border-border/50 bg-card/50 p-4">
        <h3 className="mb-3 font-mono text-sm font-semibold text-foreground">Recent Projects</h3>
        <ul className="space-y-3">
          {repos.map((repo) => (
            <li key={repo.name}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2 rounded-md p-2 -mx-2 transition-colors hover:bg-accent/50"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                      {repo.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  {repo.description && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-primary/70" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <GitCommit className="h-3 w-3" />
                      {repo.commits} commits
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
