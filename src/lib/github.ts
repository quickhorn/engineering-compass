// GitHub API service — calls Vercel serverless proxy, falls back to mock data.

import type { ContributionDay, RepoSummary } from "@/shared/github-types";

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

// ── Public API ────────────────────────────────────────────────────

export async function getContributions(): Promise<ContributionDay[]> {
  try {
    const res = await fetch("/api/github/contributions");
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("GitHub contributions fetch failed, using mock data:", e);
    return generateMockContributions();
  }
}

export async function getRecentRepos(): Promise<RepoSummary[]> {
  try {
    const res = await fetch("/api/github/repos");
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn("GitHub repos fetch failed, using mock data:", e);
    return generateMockRepos();
  }
}
