# Process overview

How I got from the brief to the harness and agentic workflow behind this
submission. Markers follow this file's citations rather than trawling the
repo for evidence I didn't point at. This file is the shape; the course
site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement.

## Where this came from

I started by gathering real material rather than inventing a theme first, and
came across a paper on the F-1 rocket engine: decades after Saturn V ended,
NASA needed one again, and the drawings weren't enough — a museum engine had
to be studied as hardware, because the manufacturing judgement behind it
never made it onto the page. That's a different kind of loss than a record
going missing, and a seminar course built around cases like it felt like a
real course rather than a demo. I wrote a first plan and specification
myself, revised it in a separate Claude conversation, and brought that plan
in here as the first prompt.

## What I built

A 23-page Astro course site for "Lost Capability: Studies in Institutional
Forgetting" (SLOP6119) — twelve seminars, a readings list, a glossary, three
assessments, and a policies page. The seminar content stays sincere (tacit
knowledge, deskilling, contested reconstructions, one live unresolved case);
the institutional furniture around it — nav labels, policies, the "Slop
University" framing — is played straight as satire. One shared diagram
component (time axis, record track, capability track, rupture point) gives
every claim the same visual grammar, so FOGBANK's "record survives,
capability stops" (week 4) reads differently from "stops, then resumes at
cost" (week 5, the F-1 week itself).

## How I got here

I built one seminar's worth of content, lecture, and a real Reveal.js deck
first, to prove the plumbing before writing the other eleven blind — week 4,
under the brief's tightest constraint on weapons detail
[`6f4773f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6f4773f),
with the shared diagram component coming out of that same slice
[`eeca766`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/eeca766).
The rest followed against that fixed shape
[`2d5ef7f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/2d5ef7f),
[`6bbac85`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6bbac85),
catching two build-only errors — a YAML colon misread as a nested mapping,
and MDX reading a `<style>` block's braces as JavaScript
[`cd8ac7b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/cd8ac7b).
Week 11's live case is written as case and counter-case with no verdict,
checked by re-reading it against the brief rather than by any test.

The three assessments are weighted 30/25/45
[`e4a7dfe`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e4a7dfe),
summed from the built site's own data rather than typed by hand
[`e31e44b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e31e44b),
the same discipline `CLAUDE.md` holds me to for dates. Each week then got a
deck of its own
[`818ee02`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/818ee02):
a first pass of one claim slide and a prompt was too thin to run a seminar
from, so it became a full runsheet with a shared `SeminarAgenda` visual, and
later a `WeekStats` panel for a sense of scale.

The five people started as flat illustrations; once the rest of the site had
real texture, they became AI-generated photos instead, which took three
passes to land — eyes-only crop, then a visibly cut-and-pasted one, then a
clipped chin from an assumed hero ratio that turned out wrong once I measured
the real render with a headless browser instead of guessing it. Search
looked unimplemented in review but wasn't: the theme already wires it end to
end, and only reports the index missing under `pnpm dev`, since it indexes
`dist/`, which doesn't exist until a build runs.

The policies page
[`37b83fc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/37b83fc)
and the home page and hero art
[`3a3d5ad`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/3a3d5ad)
came last, reusing the diagram system's own vocabulary at large scale.

## Before you ship

`pnpm check:evidence` checks that citations resolve to real commits, a crit
week's reflection is in `reflections/`, and `CLAUDE.md` is there — that the
account is traceable, not that it's good; that's the marker's call. Images
aren't checked: a broken one is visible the moment this renders on GitHub.
