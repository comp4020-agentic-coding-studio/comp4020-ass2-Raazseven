# Process overview

## Where this came from

I gathered real material rather than inventing a theme first, and came
across a paper on the F-1 rocket engine: decades after Saturn V ended, NASA
needed one again, and the drawings weren't enough — a museum engine had to
be studied as hardware, because the manufacturing judgement behind it never
reached the page. That's a different kind of loss than a record going
missing, and a seminar course built around cases like it felt real rather
than a demo. I wrote a first plan and specification myself, revised it in a
separate Claude conversation, and brought that plan in as the first prompt.

## What I built

A 23-page Astro course site for "Lost Capability: Studies in Institutional
Forgetting" (SLOP6119) — twelve seminars, a readings list, a glossary, three
assessments, and a policies page. The seminar content stays sincere (tacit
knowledge, deskilling, contested reconstructions, one live unresolved case);
the institutional furniture — nav labels, policies, "Slop University" itself
— plays straight as satire. One shared diagram component (time axis, record
track, capability track, rupture point) gives every claim the same grammar,
so week 4's "record survives, capability stops" reads differently from week
5's "stops, then resumes at cost" (the F-1 week itself).

## How I got here

My first instruction was a vertical slice: one seminar, a lecture entry, and
a real Reveal.js deck, to prove the plumbing before the other eleven were
written blind. I chose week 4 (FOGBANK) deliberately — it's under the
brief's tightest constraint on weapons detail
[`6f4773f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6f4773f),
and the shared diagram component came out of that same slice
[`eeca766`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/eeca766).
I then had the rest written against that fixed shape
[`2d5ef7f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/2d5ef7f),
[`6bbac85`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6bbac85) —
catching two build-only errors, a YAML colon misread as a nested mapping and
MDX reading a `<style>` block's braces as JavaScript
[`cd8ac7b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/cd8ac7b),
and had both written into `CLAUDE.md` as stack gotchas
[`5627250`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/5627250) —
and directed week 11's live case as case and counter-case with no verdict,
checked myself against the brief rather than trusted to a test.

I set the three assessments' weights at 30/25/45
[`e4a7dfe`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e4a7dfe)
and had the total summed from the built site's own data, not typed by hand
[`e31e44b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e31e44b) —
the same discipline `CLAUDE.md` holds the agent to for dates. Once all
twelve weeks existed, each got its own deck
[`818ee02`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/818ee02):
the first pass — one claim slide and a prompt — read too thin to run a
seminar from, so I had it rebuilt into a full runsheet with a shared
`SeminarAgenda` visual, later adding a `WeekStats` panel for scale, and had
the rebuild's own MDX comment gotcha recorded in `CLAUDE.md` too
[`4b60607`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/4b60607).

The five people started as flat illustrations; once the rest of the site had
real texture I had them swapped for AI-generated photos
[`e456d07`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e456d07),
which took three rounds of flagged fixes before it landed: an eyes-only crop
widened into a letterboxed frame
[`49deff9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/49deff9),
then its still-flat padding replaced with a blurred backdrop of the same
photo
[`10a49e5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/10a49e5).
The chin was still clipped, from a hero aspect ratio the agent had assumed
rather than measured, so I had it check the actual render with a headless
browser instead
[`532d8ba`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/532d8ba),
and had that measure-don't-guess lesson written into `CLAUDE.md` itself
[`15b75da`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/15b75da).

Search looked unimplemented, but I checked rather than assumed: the theme
already wires it end to end, and only reports the index missing under
`pnpm dev`, since it indexes `dist/`, built only at build time. The
policies page
[`37b83fc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/37b83fc)
and the home page and hero art
[`3a3d5ad`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/3a3d5ad)
came last, reusing the diagram system's own vocabulary at large scale.
