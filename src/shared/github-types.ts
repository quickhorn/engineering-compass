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
