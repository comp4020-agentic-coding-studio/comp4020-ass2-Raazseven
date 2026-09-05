# Process overview

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

My first instruction was the vertical slice: one seminar's worth of content,
a lecture entry, and a real Reveal.js deck, to prove the plumbing before the
other eleven got written blind. I chose week 4 (FOGBANK) for that slice
deliberately, since it's also under the brief's tightest constraint on
weapons detail
[`6f4773f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6f4773f),
and had the shared diagram component come out of that same slice
[`eeca766`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/eeca766).
I then had the rest written against that fixed shape
[`2d5ef7f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/2d5ef7f),
[`6bbac85`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/6bbac85) —
catching two build-only errors, a YAML colon misread as a nested mapping and
MDX reading a `<style>` block's braces as JavaScript
[`cd8ac7b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/cd8ac7b) —
and directed week 11's live case to be written as case and counter-case with
no verdict, which I checked myself by re-reading it against the brief rather
than trusting any test.

I set the three assessments' weights at 30/25/45
[`e4a7dfe`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e4a7dfe)
and had that total summed from the built site's own data rather than typed
by hand
[`e31e44b`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e31e44b),
the same discipline `CLAUDE.md` holds the agent to for dates. Once all
twelve weeks existed, I had each one given a deck of its own
[`818ee02`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/818ee02):
the first pass, one claim slide and a prompt, read as too thin to run a
seminar from once I looked at it, so I had it rebuilt into a full runsheet
with a shared `SeminarAgenda` visual, and later a `WeekStats` panel for a
sense of scale.

The five people started as flat illustrations; once the rest of the site had
real texture I had them swapped for AI-generated photos instead
[`e456d07`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/e456d07),
which took three rounds of me flagging what was still wrong before it
landed. The first fix widened an eyes-only crop into a letterboxed frame
[`49deff9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/49deff9);
when the flat padding that used still looked cut-and-pasted to me, I had it
replaced with a blurred backdrop of the same photo instead
[`10a49e5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/10a49e5).
The chin was still getting clipped after that, from a hero aspect ratio the
agent had assumed rather than measured, so I had it check the actual render
with a headless browser instead of guessing again
[`532d8ba`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/532d8ba),
and had that measure-don't-guess lesson written into `CLAUDE.md` itself
[`15b75da`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/15b75da).

Search looked unimplemented in review, but I had that checked rather than
taken on faith: the theme already wires it end to end, and only reports the
index missing under `pnpm dev`, since it indexes `dist/`, which doesn't
exist until a build runs. The policies page
[`37b83fc`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/37b83fc)
and the home page and hero art
[`3a3d5ad`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-Raazseven/commit/3a3d5ad)
came last, reusing the diagram system's own vocabulary at large scale.
