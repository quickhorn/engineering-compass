import { useMemo, useEffect, useState, useRef } from "react";
import { ExternalLink, GitCommit, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getContributions, getRecentRepos } from "@/lib/github";
import type { ContributionDay, RepoSummary } from "@/shared/github-types";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    Promise.all([getContributions(), getRecentRepos()]).then(([c, r]) => {
      setContributions(c);
      setRepos(r);
      setLoading(false);
    });
  }, []);

  const weeks = useMemo(() => {
    const result: ContributionDay[][] = [];
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

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -280 : 280,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-border/50 bg-card/50 p-6 text-center text-sm text-muted-foreground animate-pulse">
        Loading GitHub data…
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
      {/* Heatmap */}
      <div className="rounded-lg border border-border/50 bg-card/50 p-4 flex flex-col justify-between">
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-[4px]" style={{ minWidth: "max-content" }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[4px]">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`h-3 w-3 rounded-sm ${levelColors[day.level]} transition-colors hover:ring-1 hover:ring-primary/50`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground">
          <span className="font-mono">{total.toLocaleString()} contributions in 3 months</span>
          <div className="flex items-center gap-1">
            <span className="mr-1">Less</span>
            {levelColors.map((c, i) => (
              <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />
            ))}
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>

      {/* Recent Projects Carousel */}
      <div className="rounded-lg border border-border/50 bg-card/50 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-mono text-sm font-semibold text-foreground">Recent Projects</h3>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-30 pointer-events-none"}`}
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-7 w-7 transition-opacity ${canScrollRight ? "opacity-100" : "opacity-30 pointer-events-none"}`}
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block shrink-0"
            >
              <Card className="w-[220px] h-full transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 group">
                <CardContent className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{repo.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-primary/70" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <GitCommit className="h-3 w-3" />
                      {repo.commits}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
