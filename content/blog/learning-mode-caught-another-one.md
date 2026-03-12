---
title: "Drawing Constellations with Claude - And Learning Mode Shines Again"
category: "ai"
excerpt: "Building a visualization tool shows the value of learning mode, yet again...but with bears."
date: "2026-03-11"
readingTime: "7 min read"
---

I'm building a visualization tool that turns text into constellations. Think of it like this...you feed it structured information (an org chart, a family tree, a research graph) and it maps each data point as a star, with connections drawn as edges between them. The functionality I've been working on is turning that graph into a constellation shape that reflects the content of text. Imagine feeding the app a short story about your family's interaction with a bear, along with a relationship graph of the people involved in the incident, and getting back a constellation for each of the members of the family in the shape of a bear. 

The project is still in stealth, so I'll keep the details light. What I *can* share is what we're building technically and how [Learning Mode](/blog/learning-mode-teaching-ai-to-teach) keeps catching things I would have shipped without understanding.

## Teaching an AI to Arrange Stars

Each constellation starts as a cluster of stars in a default spiral layout. Functional, but every constellation looks the same. We wanted to give each one a visual identity, so we built a feature where we analyze our content, and prompt [Claude's Haiku model](https://docs.anthropic.com/en/docs/about-claude/models) to produce a visual identify of the content that then prompts Haiku again to arranges the stars into that shape.

Cost: about $0.002 per shape generation. Under a dollar a month during active development.

## The Graph Problem

Then we added connections between stars. Star A connects to Star B, B connects to C. This turned constellations from point clouds into actual structures...directed graphs with edges. Creating a constellation from a series of connected points is easy. But, our data often is shaped with more complexity. A parent having multiple children, for example. 

This raised a question I genuinely didn't know the answer to. If Haiku is placing stars into a telescope shape, does it understand that connected stars should stay near each other? A telescope shape is meaningless if the connection lines zigzag across the entire canvas.

My gut said this would need a fundamentally different approach. Instead of guessing, we tested it. We built graph-aware prompts with named nodes and explicit edges, and sent them to Haiku. Five test scenarios...simple chain, branching tree, complex graph, orphan node, multi-parent diamond.

The prompt:

```
You are arranging stars into a constellation.

Shape: bear
Stars: A, B, C, D, E (5 total)
Connections: A → B, B → C, B → D, D → E

Rules:
1. Return a JSON array of {id, x, y} objects, one per star
2. x and y must be between -1 and 1
3. The overall arrangement should look like a bear
4. Connected stars should be near each other
5. No two stars should overlap (keep at least 0.15 distance)

Return ONLY the JSON array.
```

Here's a real response from Haiku:

```json
[
  {"id": "A", "x": -0.80, "y": 0.00},
  {"id": "B", "x": -0.30, "y": 0.00},
  {"id": "C", "x":  0.20, "y": 0.25}
  {"id": "D", "x":  0.20, "y": -0.25}
  {"id": "E", "x":  0.80, "y": -0.25}
]
```

Plotted:

```

  ┌────────────────────────────────────────────────────────────┐
  │                                                            │
  │                                                            │
  │                                                            │
  │                                                            │
  │                                                            │
  │                     A                                      │
  │                       .                                    │
  │                           .                                │
  │                              B                             │
  │                            .     .                         │
  │                           .         D                      │
  │                          .             .                   │
  │                         C                .                 │
  │                                            E               │
  │                                                            │
  │                                                            │
  │                                                            │
  │                                                            │
  │                                                            │
  │                                                            │
  └────────────────────────────────────────────────────────────┘
  Edges: A→B  B→C  B→D  D→E
```

The best part about constellations is the ability to use your imagination. Do you see a bear with a head at A, feet at C and E? Or do you see a roaring bear, arms wide at A and E, a body represented by B, C and D.

Here's what I saw...

 ![A stylized illustration of a constellation arranged in the shape of a bear against a dark, star-filled sky. Bright white stars are connected by thin glowing lines that form the same angular pattern as the original constellation, with several stars labeled A, B, C, D, and E. Overlaid on top of the connected stars is a luminous blue outline of a walking bear, with the constellation lines running through the bear’s head, back, legs, and tail to visually match the animal’s shape. The bear faces left with its head slightly lowered, while the stars and connecting lines remain clearly visible inside the outline.](../../public/bear-image.png "Constellation Bear")

This was absolutely awesome. The fact that we could send complex graphs and get a visual representation back was astounding. 

Moving on to our next feature in the app, allowing the user to move stars.

## Moving Stars

Stars use [PixiJS](https://pixijs.com/) pointer events for hover and click. Canvas panning uses DOM `addEventListener` on the same canvas element. Two completely separate event systems...clicking on a star fires both. We need a way to recognize a pan from a move, and to ensure both don't happen at the same time.

Claude's initial implementation used a two-phase flag approach. On `pointerdown`, the DOM sets `isPanning = true`. At the Pixijs level, we recorded the drag start state but didn't set the "I'm dragging a star" flag yet. On `pointermove`, once the cursor passed a 3-pixel threshold, *then* we set `isDraggingStar = true`, but `isPanning` is still set to true. So we  forced `isPanning = false` to cancel the pan that had already started.

It worked. The code looked like this:

```javascript
function setDraggingStar(dragging) {
  isDraggingStar = dragging;
  if (dragging) {
    isPanning = false;  // cancel the pan that already started
  }
}
```

And the canvas move handler needed a redundant guard:

```javascript
canvas.addEventListener("pointermove", function (e) {
  if (!isPanning || isDraggingStar) return;  // double-check needed
  ...
});
```

Two flags coordinating across two event systems, with cleanup logic and a secondary guard. Convoluted, but functional. I probably wouldn't have caught Claude's convoluted solution.

Then Learning Mode asked its post-code quiz:

> **Q3:** The `pointerdown` handler on the canvas checks `isDraggingStar` and returns early. But at the moment `pointerdown` fires on the canvas, could `isDraggingStar` already be true? Think about the order of events...which fires first, the PixiJS `pointerdown` on the star, or the DOM `pointerdown` on the canvas?

Claude and I had to stop and trace the event registration order. PixiJS registered its listener during `app.init()`, before our `setupPanZoom()` registered the canvas listener. So PixiJS's `pointerdown` fires **first**. By the time the DOM handler runs, the flag could already be set.

The follow-up landed: *"This makes sense, but feels convoluted. Is there another way to interrupt the pan, so we don't get a small pan and then an actual star move?"*

The answer was obvious once you saw the ordering. Set the flag **immediately on pointerdown**, not on pointermove. Since PixiJS fires before the DOM listener, the flag is already true when the canvas handler runs. The pan never starts:

```javascript
function setDraggingStar(dragging) {
  isDraggingStar = dragging;
}
```

No cleanup. No secondary guards. No canceling a pan that already started. One flag, set once, checked once.

## Why Learning Mode Keeps Catching Things

This isn't the first time Learning Mode has caught something I would have shipped. But this one made me think about *why* it keeps working.

When Claude is in Learning Mode, it doesn't just write code and move on. It has to:

1. **Write the code** (first pass)
2. **Explain what it did** (second pass...it has to re-read its own work to explain it clearly)
3. **Generate quiz questions** (third pass...it has to identify the parts that are tricky, ambiguous, or likely to be misunderstood)
4. **Review my answers** (fourth pass...it has to compare my understanding against the actual implementation)

That's at least three reviews of its own code before I even see a question. And here's the insight...the questions Claude asks aren't random. They're the areas where Claude itself felt the code needed human eyes. Q3 wasn't about syntax or naming conventions. It was about event ordering across two systems...exactly the kind of subtle interaction that's easy to get wrong.

The convoluted version would have shipped and worked. A traditional code review might have caught it, might not (it *worked*, after all). But Learning Mode forced Claude to re-examine its own implementation from a teaching perspective, and that third pass...the one where it has to generate questions...is where it noticed the complexity it had just created.

Learning Mode isn't just a teaching tool. It's a multi-pass code review that happens *during* development, not after.

## What's Next

We're updating the production prompts to use the graph-aware format...named nodes and edges instead of anonymous star counts. Shape editing after initial layout is next.

Learning Mode stays on for all of it.