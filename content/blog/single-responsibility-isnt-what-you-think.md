---
title: "Single Responsibility Isn't What You Think It Is"
category: "code"
excerpt: "We've been reading the Single Responsibility Principle wrong. It's not about what a class does. It's about who it serves."
date: "2026-03-10"
readingTime: "6 min read"
---

I recently picked up Robert C. Martin's [Clean Architecture](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/). It was cool to read a 10 year old architecture book and consider its implications in today's landscape, a landscape that is drastically different from the one where Uncle Bob centered his book. But one chapter stopped me cold. Not because it introduced something new, but because it reframed something I thought I already understood.

The Single Responsibility Principle. The S in SOLID. The one every developer thinks they know.

I used to believe SRP meant that a class should only do one thing. One class, one job. If your class is calculating taxes *and* formatting reports, break it up. Most developers I've worked with believe the same thing. It's how we teach it, it's how we interview on it, and it's how we review code against it.

Uncle Bob says we've been reading it wrong.

## The Common Understanding

Ask a developer what SRP means and you'll almost always hear some version of: *"A class should have only one reason to change."* And then they'll interpret "one reason to change" as "one thing it does."

So we split classes. We create a `TaxCalculator` and a `TaxFormatter` and a `TaxValidator` and a `TaxRepository`. Each one does "one thing." We feel good about being SOLID. The codebase is "clean."

Except now a single tax operation touches four classes across three files, and a new developer has to trace through all of them to understand what should be a straightforward flow. We've traded one kind of complexity for another...and we tell ourselves it's better because it follows the principle.

I've seen this play out on teams I've managed, and on code I've written. Splitting classes so aggressively that the codebase becomes a maze of single-method files, each one "responsible" for exactly one operation. The code is technically SOLID. It's also nearly impossible to read.

## What Uncle Bob Says the S Actually Means

In Clean Architecture, Martin claims a differing understanding of the principle. It's not about what the class *does*. It's about *who the class serves*.

His definition: **"A module should be responsible to one, and only one, actor."**

An actor isn't a method or a function. It's a person...a stakeholder, a department, a business unit. The "responsibility" in Single Responsibility isn't the responsibility of the class. It's about who bears the consequences when the class changes.

## The Employee Example

Martin uses an `Employee` class with three methods:

- `calculatePay()` ...specified by the **CFO** (Finance)
- `reportHours()` ...specified by the **COO** (Operations)
- `save()` ...specified by the **CTO** (Technology)

Three methods, three actors. On the surface, this class does "one thing"...it manages employee data. A traditional SRP reading might leave it alone.

But here's where it breaks down. Say `calculatePay()` and `reportHours()` both use a shared internal method called `regularHours()`. The CFO's team requests a change to how regular hours are calculated for payroll purposes. A developer updates `regularHours()`, `calculatePay()` works correctly with the new logic...and `reportHours()` silently starts producing wrong numbers for the COO.

As Martin puts it: *"Nothing terrifies our customers and managers more than discovering that a program malfunctioned in a way that was, from their point of view, completely unrelated to the changes they requested."*

The class had one "responsibility" in the traditional sense. But it served three actors, and a change for one broke another. According to Uncle Bob, that's what SRP is actually designed to prevent.

## I've Seen This Kill a Project

This isn't just a textbook problem. I watched it happen at scale.

When I was a Sr. Software Engineer II at ARUP Laboratories, I was one of the senior developers assigned to rebuilding our Test Directory, the system that defined test requirements, sample specifications, and processing rules for the lab. Three groups depended on this system:

- **Client Services** ...who managed what customers saw and ordered
- **Clinical Systems** ...who managed the internal data workflows
- **The Labs** ...who actually ran the tests and needed precise processing specs

But we had one product owner, and they came from Clinical Systems. As we built the system, our assumptions about what was supposed to serve all three teams got defined down to a single team's perspective.

The problems surfaced fast. Client Services might ask for a larger sample volume than the labs technically needed, because experience told them another test would likely be ordered alongside it...the extra sample just made sense for their customers. But Clinical Systems and the labs would push for tighter, more precise specifications. Or a lab might lose access to a particular testing process and want to completely change the test requirements, but another lab also processed that same test on the same equipment for a completely different disease analysis.

We were rewriting what was essentially the middle-man system and asserting it was the source of truth. But it wasn't *a* source of truth...it was *three* sources of truth being forced through one product owner's lens.

It became so clear we were attacking the wrong problem that the 3-year project was completely scrapped shortly after I left.

Three actors. One system. One owner. The Single Responsibility Principle, violated at the architecture level.

## The Real Harm of the Traditional Reading

Here's what bugs me about how we typically teach SRP. When developers hear "one class, one job," they tend to over-split. They create abstractions for every operation. They build six-file structures for what could be a single, readable class. They worry that a class with two public methods isn't "SOLID enough."

The result isn't cleaner code. It's *scattered* code. You end up with classes that are technically responsible for one thing, but the "one thing" is so granular that no single file tells you a coherent story. You have to hold six files in your head to understand one feature.

Martin's reframing fixes this. Instead of asking *"does this class do one thing?"* you ask *"who changes this class, and why?"* If the answer is one actor...one business stakeholder, one team, one source of requirements...then the class is fine. Even if it has multiple methods. Even if it "does" more than one thing.

The question isn't about the code's behavior. It's about the code's ownership.

## What to Actually Ask

Next time you're reviewing code (or writing it), try replacing the traditional SRP question with these:

* Who requested this functionality?
* If requirements change, which team or stakeholder drives that change?
* Could a change from one stakeholder break something another stakeholder depends on?

If two different stakeholders can independently drive changes to the same class, that's a violation...even if the class only "does one thing." If one stakeholder owns all the reasons a class might change, it's fine...even if the class does several things.

## The Takeaway

The Single Responsibility Principle isn't about making classes small. It's about making sure a change for one business owner doesn't break another business owner's workflow. It's not a code principle. It's a people principle.

I spent years splitting classes because I thought that's what SOLID meant. Clean Architecture made me realize I was optimizing for the wrong thing. Smaller classes aren't inherently better. Classes with clear ownership are.
