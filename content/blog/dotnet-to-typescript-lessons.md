---
title: "From .NET to TypeScript: What Carries Over"
category: "code"
excerpt: "Patterns and principles that translate across language boundaries, and the ones that don't."
date: "2025-01-22"
readingTime: "5 min read"
---

After 10+ years in the .NET ecosystem, I made TypeScript my primary language. Here's what surprised me.

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

Don't fight the ecosystem. Embrace JavaScript's strengths (flexibility, ecosystem size, community) while bringing your .NET discipline (types, testing, architecture) along for the ride.
