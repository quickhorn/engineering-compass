# Blog Writing Rules

Reference this file whenever Derick asks you to write, draft, or review blog posts.

## Voice & Tone

Derick's writing voice is **direct, opinionated, and personal**. He makes bold claims and states them plainly. He doesn't hedge.

### Do

- State opinions as opinions, not as tentative suggestions. "Managers can't stay out of the code anymore" — not "it might be worth considering whether managers should re-engage with code."
- Admit when your thinking has evolved. "I used to believe X. Here's why I changed my mind." This is a signature pattern.
- Name real people, real tools, real events. Specificity builds credibility.
- Use "I" naturally. This is a personal blog from someone with experience — not a corporate content team.
- Challenge the reader. Push them to rethink assumptions. Be welcoming about it, but don't soften the point.
- Write flowing, idea-dense sentences. Derick packs multiple connected thoughts into sentences naturally. Don't over-simplify into choppy fragments.
- Use ellipsis (`...`) as a dramatic pause to let implications hang or create a beat before a punchline. "The explanations landed while I was in the flow...but afterwards..." — the reader fills in the gap. Don't overuse it, but don't avoid it either. It's a signature stylistic choice.
- Extend metaphors. Don't name a metaphor and move on — inhabit it. If you introduce Goldilocks, put yourself in the house. If you use the homework analogy, land it with a specific, vivid punchline ("the only clear answer you had was your name"). Let the metaphor do real work.
- Acknowledge nuance. Derick doesn't paint things as entirely good or entirely bad. Even when an approach failed overall, he credits what worked: "There were times when I recognized the app made assumptions...and I applied my own thinking." This honesty makes the criticism more credible.
- Use parenthetical asides for humor and honesty. "(punn intended)", "(and later did)" — these add personality and break the fourth wall. They feel conversational, like a wink to the reader. Don't overdo them, but don't avoid them either.
- Use scare quotes for sarcasm or skepticism. A more "helpful" search tool says more than a paragraph of explanation. Let the quotes do the work.
- Brief self-deprecating honesty is welcome. "I am definitely still rusty." One sentence, move on. Don't dwell, just acknowledge reality. This builds trust with the reader.

### Don't

- Hedge with filler phrases: "it's become increasingly clear that", "it's worth noting that", "one might argue that"
- Use corporate-speak or marketing language: "leverage", "synergize", "unlock potential"
- Use all-caps for emphasis. Use **bold** instead.
- Write generic calls to action: "Did you like this post? Want more?" — just say what's coming next.
- Use a preachy or lecturing tone. Derick shares what he's learned and what he's seen — he doesn't talk down.
- Over-explain jargon that the target audience (engineering leaders, senior devs) would already know.
- Use the em dash (`—`). Use ellipsis (`...`) for pauses and breaks instead.

## Structure

### Frontmatter

Every post needs YAML frontmatter matching this format:

```yaml
---
title: "Post Title Here"
category: "ai" | "leadership" | "engineering"
excerpt: "One sentence that captures the post's argument. Should work as a social media preview."
date: "YYYY-MM-DD"
readingTime: "X min read"
---
```

### Post Structure

- **Opening section** — personal context. Why is Derick writing about this? What experience is he drawing from? Keep it specific and direct.
- **Body** — organized into `##` top-level sections with `###` sub-sections where a section has multiple related points. Use the hierarchy to show argument structure, not just to break up text.
- **Contrasting lists** — Derick uses paired lists effectively ("less time on X / more time on Y"). Use these when making before/after or old/new comparisons.
- **Closing section** — forward-looking. Tease what's coming next or give the reader a concrete takeaway. No generic sign-offs.

### Linking & Sources

- Link to tools, frameworks, and concepts when first mentioned. Use descriptive markdown links, not raw URLs.
- If a claim would benefit from a source but you can't find one, leave a placeholder: `[TODO: source needed]`
- Prefer linking to primary sources (official docs, the person's own writing, conference talks) over secondary coverage.
- Don't over-link. Not every proper noun needs a URL — only link when the reader would genuinely benefit from following it.

### Personal Anecdotes

- **Never fabricate anecdotes.** If a section would benefit from a personal story or experience, ask Derick to tell you what happened. Use a placeholder: `[ANECDOTE: brief description of what kind of story would fit here — ask Derick]`
- When Derick provides an anecdote, write it in his voice: first person, specific details, direct.
- Attribute quotes and stories to real people with enough context for the reader to trust the source (name, role, where you heard it).

## Formatting

- Use `*italics*` for emphasis within a thought, `**bold**` for key terms and strong emphasis.
- Bullet lists for actionable items or comparisons. Keep bullets parallel in structure.
- Single blank line between paragraphs and sections. No double blank lines.
- Break long paragraphs when the thought shifts — but don't fragment naturally flowing ideas into tiny paragraphs.
- Filenames use lowercase kebab-case: `my-post-title.md`

## Social Promotion (LinkedIn)

When Derick asks for a LinkedIn intro or summary for a blog post:

- **Pull directly from the blog's strongest paragraph.** Don't rewrite or craft a separate promotional blurb. The blog's own hook should do the work.
- Add minimal framing only if the paragraph needs context to stand alone (e.g., "This is the first post in a three-part series about...").
- End with a bare link to the post. No "read more at" or "link in comments."
- No LinkedIn-isms: no "I'm excited to share", no "thrilled to announce", no hashtags, no tagging.
- No emoji unless Derick specifically asks for them.

## Review Checklist

Before finalizing any post, verify:

- [ ] Opening is specific and personal, not generic
- [ ] No hedge language or filler phrases
- [ ] Bold claims are stated directly
- [ ] Sources are linked where the reader would benefit
- [ ] `[TODO]` placeholders left for missing sources or anecdotes — nothing fabricated
- [ ] Structure uses `##`/`###` hierarchy to reflect argument structure
- [ ] Closing is forward-looking or gives a concrete takeaway
- [ ] Frontmatter is complete and accurate
- [ ] Tone is consistent throughout — direct, challenging, but welcoming
