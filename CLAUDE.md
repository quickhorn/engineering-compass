# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Derick Grey (engineering leader). Built with Vite + React + TypeScript + shadcn/ui + Tailwind CSS. Originally scaffolded via Lovable platform.

## Commands

| Task | Command |
|---|---|
| Dev server (port 8080) | `npm run dev` |
| Production build | `npm run build` |
| Lint | `npm run lint` |
| Run tests once | `npm run test` |
| Tests in watch mode | `npm run test:watch` |
| Run a single test | `npx vitest run src/test/example.test.ts` |
| Preview prod build | `npm run preview` |

## Learning Mode

### BEFORE WRITING CODE

- Explain what you're about to do *and why*
- Break it down into steps I can follow
- Wait for my OK before preceding

### AFTER WRITING CODE

- Explain what each part does
- Ask me 3 questions about your explanation
- If I get the answer wrong, explain it again until I get it right
- Don't let me check in until I answer your questions correctly


### GENERAL RULES

- Be direct. Tell me when I'm doing something wrong, or could simplify or modernize.
- Treat every session as a learning opportunity.

## Architecture

**Stack:** Vite (SWC plugin), React 18, TypeScript (strict mode OFF), TanStack Query (provided but unused), React Router v6 (BrowserRouter), shadcn/ui, Tailwind CSS, next-themes (class-based dark/light).

**Path alias:** `@` maps to `./src` (configured in vite, tsconfig, and vitest).

**Entry flow:** `index.html` → `src/main.tsx` → `src/App.tsx` (providers + router + layout shell).

**Provider stack (App.tsx):** QueryClientProvider → ThemeProvider (default: dark) → TooltipProvider → BrowserRouter. Header/Footer wrap all routes.

**Routes:**
- `/` → `Index` | `/experience` → `Experience` | `/current-work` → `CurrentWork`
- `/blog` → `Blog` | `/blog/:slug` → `BlogPost` | `/contact` → `Contact` | `*` → `NotFound`

**Pages** use default exports and call `usePageMeta()` as their first hook to set document title and OG tags.

**Layout components** (`src/components/layout/`) use named exports re-exported from `index.ts`.

## Data Layer

- **Blog posts:** Static data in `src/data/posts.ts` with helper functions `getPostBySlug()` and `getPostsByCategory()`. BlogPost page has a custom simple markdown renderer (headings, lists, inline formatting).
- **GitHub data (`src/lib/github.ts`):** Username `quickhorn`. Uses `VITE_GITHUB_PAT` env var for live GitHub GraphQL/REST API calls. Without the PAT, returns mock data. Consumed via `useEffect` in `GitHubHeatmap.tsx`.
- **Contact form:** Uses `react-hook-form` + `zod` validation. Currently simulates submission (no backend). Planned Supabase integration per `.lovable/plan.md`.

## Styling

- **Tailwind CSS** with CSS custom properties for theming (defined in `src/index.css` `@layer base`).
- **Dark mode default** — set via `class="dark"` on `<html>` with a blocking script in `index.html` for flash prevention.
- **Fonts:** JetBrains Mono for headings/code (`font-mono`), Inter for body (`font-sans`). Loaded via Google Fonts `@import` in `index.css`.
- **Design language:** Terminal-inspired aesthetic (fake terminal windows, `>` prompt characters, `// comment` section labels, electric blue/purple accents, glassmorphism cards).
- **Custom CSS classes** in `index.css`: `.text-gradient`, `.glow-primary`, `.glow-accent`, `.terminal-prompt`, `.pulse-availability`.
- Class composition uses `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge).

## Testing

Vitest with jsdom, `@testing-library/react`, globals enabled (no imports needed for `describe`/`it`/`expect`). Setup in `src/test/setup.ts` mocks `window.matchMedia`. Test files match `src/**/*.{test,spec}.{ts,tsx}`.

## Environment Variables

- `VITE_GITHUB_PAT` — Optional GitHub PAT (`read:user` scope). Enables live GitHub API; mock data used when absent.

## TypeScript / Lint Notes

- `strict: false` and `noImplicitAny: false` in tsconfig — type safety is loose.
- `@typescript-eslint/no-unused-vars` is OFF in ESLint config.
- ESLint uses flat config (v9).

## shadcn/ui

Configured via `components.json` (style: default, base color: slate, CSS variables enabled). Components live in `src/components/ui/`. Add new ones with `npx shadcn-ui@latest add <component>`.
