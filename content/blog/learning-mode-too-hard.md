---
title: "Learning Mode: Too Hard"
category: "ai"
excerpt: "From Mama Bear to Papa Bear, I overcorrected from easy mode by going full self-directed. It was just standard development with a fancier search tool."
date: "2026-02-26
readingTime: "5 min read"
---

In my [last post](/blog/learning-mode-too-soft), I found myself trying Mama Bear's approach to AI-Augmented Engineering. Through a tutorial, Copilot walked me through every step of a Python project, and I typed the code it showed me into my editor. It felt like learning, but I was really just transcribing. No struggle, no decisions, no retention.

So I overcorrected to Papa Bear mode...everything was too hard.

## The Project

I was building a Chrome extension — a tool to visualize ChatGPT conversations for ADHD brains. The project is still in stealth so I'll keep the details light, but the technical challenge was real: injecting UI into a third-party web app, reading DOM content that wasn't designed to be scraped, and handling ChatGPT's constantly shifting interface.

## The Approach

This time I used [Windsurf](https://windsurf.com) and took the opposite approach from Mama Bear. I directed Windsurf to create a tutorial, but *only provide me with the sources I would need to learn how to do it myself*. No code samples. No step-by-step instructions. Just point me in the right direction and let me figure it out.

The idea was that if I did the hard work of reading docs, understanding APIs, and writing code from scratch, I'd actually learn.

## What Actually Happened

It took me a week to understand Chrome extensions. I am definitely still rusty. 

Windsurf was helpful as a guide — it gave me structured steps, pointed me to the right documentation, and helped me understand the manifest and content script architecture. But every time I hit a wall, I was on my own. And the walls came fast.

I got an initial button injected into the ChatGPT page. Then I hit ChatGPT's DOM — a React Single Page App that re-renders constantly, and reacts poorly to injected DOM elements (punn intended). I spent days on problems that an AI could have explained in thirty seconds (and later did).

As I tried to rely less on the AI for explanations — so I'd "understand" — the velocity cratered. This wasn't augmented AI development, it was old-style development, just with a more "helpful" search tool. 

## Papa Telling You to Figure It Out

This felt like your dad standing over your homework, knowing exactly how to solve the problem, but telling you *"you gotta figure it out yourself."* You knew if you asked, he could just walk you through it. He could sit with you and point you in the right direction. But he wanted you to struggle, because that's how he learned.

The thing is — he's not entirely wrong. Struggle does build understanding. But there's a difference between productive struggle and pointless friction. Spending days fighting Chrome extension content security policies when a 30-second explanation would have unblocked me isn't productive struggle. It's just slow.

## What Was Missing

The Mama Bear approach had too little friction — I was transcribing without thinking. The Papa Bear approach had too much — I was reinventing wheels that didn't need reinventing. What I needed was something in between: an AI that would *write the code* but make sure I *understood* it before we moved on.

I needed to be challenged, but not abandoned.

## What's Next

In the final post, I find my Goldilocks mode. Six rules that turned Claude Code from a code generator into a patient engineering mentor. It's not just the right balance between the first two attempts. It's a fundamentally different relationship with AI.
