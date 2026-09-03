# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

A 23-page Astro course site for "Lost Capability: Studies in Institutional
Forgetting" (SLOP6119) — twelve weekly seminars tracing capabilities that
institutions lost and, sometimes, bought back, plus a readings list, a
glossary, three assessments, and a policies page. The site holds two
registers apart on purpose: the seminar content is sincere subject matter
(tacit knowledge, deskilling, automation surprise, contested reconstructions,
one live and unresolved case), while the surrounding institutional furniture
— nav labels, policies, the "Slop University" framing — is played completely
straight as satire, never winking at the reader. A single shared diagram
component (time axis, record track, capability track, rupture point) gives
every week's claim the same visual grammar, so a "record survives, capability
stops" case (week 4, FOGBANK) reads differently at a glance from a "stops,
then resumes at cost" case (week 5, week 8).

## How I got here

I built the vertical slice first, per the brief: one seminar's worth of
content collection, lecture entry, and an actual Reveal.js deck, to prove the
plumbing before writing the other eleven weeks blind. Week 4 (FOGBANK) was
the deliberate choice for that slice, because it's also the week under the
tightest constraint — the brief bans any materials, process, or engineering
detail belonging to the weapons component, so the deck and lecture entry
[`6f4773f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6f4773f)
had to stay strictly institutional and documentary from the first draft, not
be trimmed down to that later. The shared diagram component came out of the
same slice
[`eeca766`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/eeca766) —
four parameterised primitives rather than twelve one-off SVGs, so a rupture
point always means the same thing wherever it appears.

With the slice proven, I wrote the remaining people, then all twelve seminars
against the fixed claim/case/activity/reading/question shape
[`2d5ef7f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/2d5ef7f),
[`6bbac85`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6bbac85).
Two build-time errors surfaced only once `pnpm check` actually ran the build,
not at authoring time: an unquoted YAML `description:` scalar containing a
literal `: ` mid-sentence was misread as a nested mapping in three week
files, fixed with the `>-` folded-scalar indicator; and MDX parses a
`<style>` block's braces as JS expressions rather than raw CSS, which broke
the readings and glossary pages until their markup and scoped styles were
pulled out into dedicated `.astro` components
[`cd8ac7b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/cd8ac7b).
Week 11 (the live, unresolved case) is written as an explicit case and
counter-case with no verdict in the course's voice, checked by re-reading it
against the brief's own no-verdict constraint rather than by any automated
test — that one is a judgement call, not a check.

The three assessments were weighted 30/25/45
[`e4a7dfe`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e4a7dfe),
and `spec/assignment-2.test.ts`
[`e31e44b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e31e44b)
sums that weight from `dist/api/index.json` rather than asserting `100`
by hand, for the same reason `CLAUDE.md` already flags for date ranges: a
hand-typed total and the data that produces it can silently drift apart while
the test keeps passing. The same file checks every teaching week has a dated
session and that at least one lecture's `slides` field points at a deck that
actually built, so the vertical slice claim is enforced, not just asserted in
this file.

The policies page
[`37b83fc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/37b83fc)
and the home page and hero/card art
[`3a3d5ad`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/3a3d5ad)
came last. The hero SVG reuses the diagram system's own vocabulary at large
scale (a capability that stops, then resumes heavier, at cost) so the front
page states the course's thesis visually before any copy does — and because
`astro-theme-university`'s `Hero` component references an SVG as an external
`<img>` asset rather than inlining it, its colours are hardcoded hex values
from `astro-theme-slop`'s palette, not CSS custom properties, which don't
cascade across that boundary.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
