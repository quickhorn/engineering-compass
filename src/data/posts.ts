export type BlogCategory = "leadership" | "code" | "ai";

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  content: string; // Markdown-ish content stored as a string
  date: string; // ISO date
  readingTime: string;
}

export const categoryLabels: Record<BlogCategory, string> = {
  leadership: "Leadership Lab",
  code: "Code & Context",
  ai: "AI-Assisted Engineering",
};

export const posts: BlogPost[] = [
  {
    slug: "building-engineering-cultures-that-scale",
    title: "Building Engineering Cultures That Scale",
    category: "leadership",
    excerpt:
      "How I developed an onboarding program that connected with every new developer on day one to instill ownership culture.",
    content: `Great engineering cultures don't happen by accident. They're intentionally designed, nurtured, and reinforced at every level of the organization.

## The Problem

When I joined TheoremOne, the engineering team was growing fast. New hires were productive within weeks, but something was missing — they weren't *owners*. They shipped features but didn't feel responsible for the product.

## The Approach

I created a day-one onboarding ritual: every new developer sat with me for 30 minutes. Not to review architecture diagrams or Jira boards, but to talk about **why we build the way we build**.

We discussed:
- **Ownership over tickets** — you don't just close a ticket, you own the outcome
- **Radical candor** — say what needs to be said, with respect
- **Learning in public** — share your mistakes, they're the best documentation

## The Results

Within six months:
- PR review turnaround dropped from 48 hours to under 12
- Team-initiated improvements increased 3x
- Retention improved significantly — people stayed because they felt like owners

The lesson? Culture isn't a slide deck. It's a daily practice.`,
    date: "2025-01-15",
    readingTime: "4 min read",
  },
  {
    slug: "the-pivot-from-corporate-to-entrepreneur",
    title: "The Pivot: From Corporate to Entrepreneur and Back",
    category: "leadership",
    excerpt:
      "My journey from corporate engineering leadership to entrepreneurship and what I learned along the way.",
    content: `In 2019, I left a comfortable engineering management role to start my own company. Three years later, I returned to corporate life. Here's what that journey taught me.

## Why I Left

I was good at my job. But I wanted to know if I could build something from nothing. The entrepreneurial itch was real — and ignoring it felt worse than scratching it.

## What I Built

I co-founded a consulting practice focused on inclusive software development. We built products, trained teams, and tried to prove that diversity in engineering isn't just ethical — it's profitable.

## What I Learned

1. **Sales is engineering's twin** — Building the product is half the battle. Selling it is the other half, and it's harder.
2. **Cash flow is oxygen** — Beautiful code means nothing if you can't make payroll.
3. **Leadership is leadership** — Whether you're managing 30 engineers or 3 contractors, the fundamentals are the same: clarity, empathy, accountability.

## Why I Came Back

I didn't fail — I chose to return. The startup experience made me a fundamentally better engineering leader. I now bring founder-level urgency to every team I join.`,
    date: "2025-01-08",
    readingTime: "5 min read",
  },
  {
    slug: "ai-assisted-engineering-practical-guide",
    title: "AI-Assisted Engineering: A Practical Guide",
    category: "ai",
    excerpt:
      "How I integrate AI tools into my daily workflow to accelerate development without sacrificing quality.",
    content: `AI coding assistants are everywhere. But most engineers use them like autocomplete on steroids. Here's how to actually get value from them.

## My Daily AI Stack

- **Cursor / Copilot** for in-editor completions
- **ChatGPT / Claude** for architectural discussions and code review
- **Lovable** for rapid prototyping of full-stack features

## The Rules I Follow

### 1. AI writes the first draft, I write the final version
Never ship AI-generated code without reviewing it. AI is great at boilerplate but bad at understanding your specific business context.

### 2. Use AI for exploration, not production
When evaluating a new library or pattern, I'll ask AI to generate example implementations. This saves hours of reading docs.

### 3. Pair programming with AI
I treat Claude like a junior developer. I explain the problem, review its solution, and iterate. The conversation itself often clarifies my own thinking.

## What AI Can't Do (Yet)

- Understand your team's coding conventions deeply
- Make architectural decisions with full business context
- Replace code review — it catches syntax, not strategy

## The Bottom Line

AI makes good engineers faster. It doesn't make bad engineers good. Invest in fundamentals first, then amplify with AI.`,
    date: "2025-02-01",
    readingTime: "4 min read",
  },
  {
    slug: "dotnet-to-typescript-lessons",
    title: "From .NET to TypeScript: What Carries Over",
    category: "code",
    excerpt:
      "Patterns and principles that translate across language boundaries, and the ones that don't.",
    content: `After 10+ years in the .NET ecosystem, I made TypeScript my primary language. Here's what surprised me.

## What Translates Perfectly

### SOLID Principles
These are language-agnostic. Single Responsibility, Dependency Inversion — they matter just as much in a React codebase as in a C# API.

### Testing Discipline
If you wrote unit tests in .NET, you'll feel right at home with Vitest or Jest. The mental model is identical.

### Type Thinking
TypeScript's type system is different from C#'s, but the *habit* of thinking in types transfers beautifully. You'll appreciate discriminated unions and template literal types.

## What Doesn't Translate

### The Runtime
.NET gives you a predictable, managed runtime. JavaScript gives you... the event loop. Understanding async/await in JS requires unlearning some .NET assumptions.

### Package Management
NuGet is curated and stable. npm is the wild west. You need different strategies for evaluating dependencies.

### The Build System
MSBuild is opinionated and consistent. The JS ecosystem changes build tools every 18 months. Learn Vite and stay there.

## My Advice

Don't fight the ecosystem. Embrace JavaScript's strengths (flexibility, ecosystem size, community) while bringing your .NET discipline (types, testing, architecture) along for the ride.`,
    date: "2025-01-22",
    readingTime: "5 min read",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return posts.filter((p) => p.category === category);
}
