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

Once all twelve seminars existed, I went back and gave each one a deck of
its own
[`818ee02`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/818ee02) —
a `slides` field on the sessions schema, mirroring the one `lectures`
already had. The first pass at those decks was a single claim slide, the
diagram, and a discussion prompt; once built and reviewed, that read as too
thin to actually run a seminar from, so it was rebuilt into a fixed runsheet
every week now follows: framing drawn out past a single paragraph, the
diagram, guided discussion, that week's group activity expanded into timed
steps, a debrief, and a wrap-up — roughly the two hours a seminar actually
runs, not just its talking points. A second shared visual,
`SeminarAgenda.astro`, gives every deck's opening slide the same
proportional runsheet bar, the same pairing `WeekDiagram` already gives the
course's argument. Each deck still reuses that week's own `WeekDiagram`
props rather than restating them, so the deck and the session page can't
quietly drift apart. `spec/session-slides.test.ts` checks that every
session's `slides` link resolves to a deck that actually built, the same
discipline the lecture/deck check already used, and needed no changes when
the decks themselves were rebuilt.

Getting back out of a deck started as a plain link on the last slide, but
that read as an easy-to-miss "button" rather than real navigation, so it
was replaced with a persistent back-to-session button and an Esc-key
shortcut
[`0ad1b85`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/0ad1b85).
`astromotion`'s deck pages carry no site chrome of their own — the route
and layout are injected from the package, not ours to edit — so
`DeckBackNav.astro` renders nothing itself and instead runs a script that
attaches a fixed button to `document.body`, which survives Reveal
navigating between slides regardless of which slide the script was
declared on. Esc claims the key in the capture phase before Reveal's own
(bubble-phase) overview toggle sees it, the same technique astromotion's
own whiteboard module already uses against Reveal. Neither needs a
per-deck session slug: a deck's URL and its session page share the same
last path segment, so the target is derived from `location.pathname` at
runtime.

A third shared visual, `WeekStats.astro`, followed once the runsheet was in
place: `WeekDiagram` argues a case's shape and `SeminarAgenda` shows the
room's two hours, but neither gives a sense of scale — how long, how much,
how contested. Since the project has no charting dependency and most weeks
have no hard numbers to plot (five of twelve do), the component is a small
stat-tile grid rather than a chart: real figures where a week has them
(FOGBANK's "years, tens of millions of dollars"; the Naval Academy's 2015
reinstatement), and a categorical resolution label in the course's own
vocabulary (resumed-at-cost, partial-degraded, contested-unverifiable, and so
on) where it doesn't, so all twelve panels stay the same shape. Each deck
gets one new slide for it, directly after that week's `WeekDiagram` slide,
following the same `role="img"`-on-the-inner-element pattern `SeminarAgenda`
already established rather than the `aria-allowed-role` mistake the runsheet
redesign made and fixed the round before.

The five people photos started as flat risograph-style illustrations, one
per person. Once other pages had more genuine texture to them, that
made those five look inconsistent by comparison, so they were replaced
with AI-generated portrait photos (StyleGAN2, via a public generator, one
distinct face per person), with each `photoAlt` rewritten to describe an
actual photograph rather than the two-ink print style it replaced.

The first crop — a tight 400×400 square, following the illustrations'
own frame — broke on the person page's hero: `astro-theme-university`'s
`Hero` stretches its image full-bleed at up to 100vw against a `min-height`
of only `20rem`, an aspect ratio far wider than a face-filling square, and
`object-fit: cover` on that shape sampled only a thin band through the
middle of the frame — the eyes, on every one of the five. A same-size
source also meant the responsive widths Astro tried to request for that
banner (up to 2560px) were all larger than the source itself, so the
browser was upscaling a 400px image across the full page width. The fix
addresses both: each face is now composited onto a 2400×800 canvas — a
wide letterboxed frame with generous flat padding either side rather than
a tighter crop, since `object-fit: cover`'s visible band size in source
pixels is set by the *target*'s aspect ratio, not by how the source itself
is padded vertically, so only widening the canvas (not just padding it
taller) keeps the whole face inside whatever band a given crop samples.
2400px also gives the hero real width options to pick from instead of
upscaling a single small source.

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
