---
title: "Learning Mode: Just Right"
category: "ai"
excerpt: "After two failed experiments, six rules turned Claude Code from a code generator into a patient engineering mentor. This is my Goldilocks mode."
date: "2026-03-04"
readingTime: "7 min read"
---

This is the final post in a three-part series about finding the right way to learn with AI.

In the [first post](/blog/learning-mode-too-soft), I tried Mama Bear's approach...Copilot walked me through a Python project step by step while I typed what it showed me. Too soft. I was transcribing, not learning. In the [second post](/blog/learning-mode-too-hard), I overcorrected to Papa Bear mode...I asked Windsurf to give me just the sources and let me figure it out myself. Too hard. I was back to old-style development with a more "helpful" search tool.

Both approaches failed for the same reason: they didn't make me *think*. The tutorial mode let me coast. The self-directed mode buried me in friction. Neither one forced me to understand the code well enough to explain it back.

I have severe reservations with AI...who bears the brunt of the environmental damage? Which demographics are impacted most by mass AI-driven layoffs? How do we hold corporations that build AI accountable for creating tools that produce incredibly harmful content? These are all questions I think that all AI users need to be asking, and putting their votes and energies in to.

But AI-augmented development is here. The question isn't whether to use it...it's how to use it without losing the skills that make you an engineer. After two failed experiments, I walked into the third room.

## Finding the Right Porridge

Mama Bear gave me all the answers. Papa Bear gave me none. What I needed was something in between...an AI that would write the code *and* make sure I understood it before we moved on. Not a tutorial I transcribed. Not a reading list I struggled through alone. A mentor that worked alongside me, challenged me, and didn't let me fake understanding.

I created a set of rules called **Learning Mode** and added them to my project's `CLAUDE.md` file (the instructions file that [Claude Code](https://claude.ai/code) reads at the start of every session):

```markdown
## Learning Mode

### BEFORE WRITING CODE
- Explain what you're about to do *and why*
- Break it down into steps I can follow
- Wait for my OK before proceeding

### AFTER WRITING CODE
- Explain what each part does
- Ask me 3 questions about your explanation
- If I get the answer wrong, explain it again until I get it right
- Don't let me check in until I answer your questions correctly
```

Six rules. That's it. They completely changed how I work with AI.

## What "Just Right" Looks Like

Let me show you real exchanges from building this portfolio site...a Vite + React + TypeScript project I deployed to Vercel with a serverless GitHub API proxy and a markdown blog system (the one you're reading right now).

### "Why Do We Call This a Serverless Function?"

While building a Vercel API endpoint to proxy GitHub API calls, I stopped and asked a basic question. Not because I needed the code...but because I wanted to understand the concept.

The answer: serverless functions are code that runs on-demand in response to requests. You don't manage or pay for a server sitting idle. Vercel spins up a tiny container, runs your function, returns the response, and tears it down. You pay per invocation, not per hour.

That single detour gave me a mental model I've used in every architecture conversation since. With Mama Bear, I would have just typed the file and moved on. With Papa Bear, I would have spent a day reading AWS docs about Lambda before writing a line of code. Learning Mode gave me the concept in thirty seconds and made sure I understood it before we continued.

### Environment Variables: Server vs. Client

The original codebase had `VITE_GITHUB_PAT`...a GitHub personal access token baked into the client-side JavaScript bundle. Anyone with browser dev tools could see it (yikes).

In Learning Mode, Claude explained the difference before writing the fix:

- **`VITE_` prefix variables** get replaced at build time with literal values. They end up in the JavaScript bundle anyone can read.
- **`process.env` variables** only exist on the server at runtime. Never sent to the browser.

Then came the quiz: *"If the PAT is in `process.env` on the server, and a user hits `/api/github/contributions` from their browser, does the browser ever see the token?"*

My answer: No. The browser sends a request to the API endpoint. The serverless function reads the token from the server environment, makes the GitHub API call, and returns only the data. The token stays server-side.

Getting that question right meant I understood the *why*, not just the *how*. This is the difference between Goldilocks and the other two approaches...I didn't just copy the fix (Mama Bear), and I didn't have to discover the security vulnerability through trial and error (Papa Bear). I understood the fix *and* why it mattered.

### CDN Caching: The 1001st Visitor

When we added cache headers to the serverless functions, I was asked to explain what this line does:

```
Cache-Control: s-maxage=3600, stale-while-revalidate=300
```

I said: *"The response is cached for 1 hour and 5 minutes."*

Wrong. Those aren't additive. Here's what actually happens:

- `s-maxage=3600`...the CDN caches the response for 1 hour. During that hour, every request gets the cached version (the function doesn't run).
- `stale-while-revalidate=300`...after the hour expires, for the *next 5 minutes*, the CDN still serves the stale cache while fetching a fresh response in the background.

Visitor 1 triggers the function. Visitors 2 through 1000 get the cached response. Visitor 1001 (after the hour) gets the stale cache instantly while the CDN refreshes behind the scenes.

I would never have learned this distinction if the AI just silently added the header. And getting it wrong didn't cost me anything...no production incident, no embarrassed Slack message. Just a private correction from a patient AI that explained it again until I got it right.

## Goldilocks Pushes Back

Here's where this approach diverges from the fairy tale. Goldilocks just ate the porridge and sat in the chair. She was a consumer. Learning Mode made me a collaborator. The "wait for my OK" rule means I'm actively reviewing every decision...and several times, I caught the AI making choices I didn't agree with.

### The Custom Parser Problem

Claude's plan called for a custom 30-line YAML frontmatter parser to avoid adding a dependency. I stopped it:

*"What is the increased level of complexity with using a real YAML parser? Why are we doing any of it manually if there's a standardized way to do it?"*

The AI admitted it was over-optimizing. We installed the `front-matter` package instead...battle-tested, maintained, and four lines of code to use. The custom parser would have been a maintenance burden for zero benefit. Mama Bear would have written the custom parser for me and I would have typed it in without questioning it. Papa Bear would have had me reading YAML specs for two days.

### The Duplicate Sort

After we built the markdown blog loading system, I noticed something in the code:

*"We sort posts inside `buildPosts()`, but Blog.tsx already sorts posts at render time. Why are we doing it twice?"*

The data layer was sorting by date, and then the presentation layer was sorting again. We removed the sort from the data layer...letting the component that cares about display order handle it. This is the kind of catch that only happens when you're reading every line instead of rubber-stamping it.

### Clean Over Compatible

When refactoring the GitHub integration, Claude suggested a backwards-compatible re-export pattern to avoid updating import statements in other files. I pushed back:

*"Since we're just building this app, why not create a cleaner implementation? We don't need to worry about backwards compatibility...we're building the first iteration."*

Types moved to a shared module with clean imports. No compatibility shims, no dead re-exports. The codebase was simpler because I questioned the default approach. AI tools tend to be "safe" by default...backwards compatibility, extra error handling, defensive patterns everywhere. Sometimes you need a human to say "we don't need all that."

## Why This Is the Right Porridge

Mama Bear was comfortable but empty. I transcribed code and felt good about it...until I had to explain what I'd built and couldn't. Papa Bear was brutal but educational in the wrong ways. I learned things, but I could have learned them in a fraction of the time with a guide.

Learning Mode works because it hits the sweet spot on the things that actually matter for retention:

**You have to recall, not just recognize.** Being quizzed after an explanation forces you to retrieve information, which strengthens memory far more than passively reading (or transcribing). When Claude asks me to explain what `stale-while-revalidate` does, I can't just nod along. I have to say it back.

**You learn on your actual project.** Not a toy example, not a tutorial sandbox...your actual codebase. The concepts stick because they're immediately connected to something you care about.

**You get to be wrong safely.** When I said CDN caching was "1 hour and 5 minutes," getting corrected in a private conversation with an AI felt safe. No judgment, no embarrassment, no senior engineer giving you that look. Just a patient correction and another chance to get it right.

**You can't skim.** Knowing you'll be quizzed means you actually read the explanation instead of scrolling to the code block and hitting "accept." I am definitely guilty of doing that more than I'd like to admit.

## The Tradeoff

Learning Mode is slower. A task that takes 20 minutes in "just write the code" mode might take an hour with explanations and questions.

But here's the thing...I only need to learn something once. The next time I encounter CDN caching, or environment variable security, or frontmatter parsing, I don't need to ask. The 40-minute investment pays dividends across every future project. Mama Bear would have been faster in the moment but left me just as lost the next time. Papa Bear would have taken even longer and taught me the wrong lessons (like "struggle through everything alone").

## How to Set It Up

If you're using [Claude Code](https://claude.ai/code), add the Learning Mode rules to your project's `CLAUDE.md` file. That's it. Claude reads these instructions at the start of every session and follows them automatically.

You can toggle it too...leave Learning Mode on by default, but tell Claude to "skip the questions on this one" when you're under deadline pressure. The flexibility is the point.

For other AI tools, you can paste the rules into your system prompt or include them at the start of a conversation. The key ingredients are:

- **Explain before coding** (so you understand the approach)
- **Wait for approval** (so you stay in control)
- **Explain after coding** (so you understand the implementation)
- **Ask verification questions** (so you can't fake understanding)

## The Right Fit

I walked through three rooms. The first was too comfortable...I learned nothing. The second was too harsh...I learned slowly and painfully. The third was just right. Not because it was easy, but because it challenged me exactly the right amount.

AI coding assistants are the best learning tools we've ever had...if we configure them to teach instead of just produce. Six rules transformed my workflow from "generate and ship" to "learn and build."

I'm not just shipping faster. I'm becoming a better engineer while I ship. And for the first time since I started using AI tools...I can explain every line of code in my codebase.
