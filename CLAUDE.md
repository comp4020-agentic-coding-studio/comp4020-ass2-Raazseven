# Your harness

Carried forward from five weeks of COMP4020 prototypes (crit1, crit2,
assignment-1, crit4, crit5) and building on from here. Nothing about the
starter is recorded here --- the platform is fixed and documented in
`README.md`, and the
[course website](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/)
publishes this deliverable's brief and spec. Read both before you plan or
build.

## Working discipline

- Keep `pnpm dev` running and look at the rendered page as you go --- a check
  passing is not the same as the page being right, and a claim about what a
  page looks like is worth nothing next to actually opening it.
- Run `pnpm check` before every push. Read a failure's output before changing
  anything; it names the file, the line, or the contract that's broken.
- Never commit a red state. Commit in small steps as the checks turn green,
  not as one dump at the end --- the trail is part of what's marked here.

## Derive facts, don't hand-type them

Learned the hard way on assignment-1's offside logic, where a lesson stuck:
never write down a value that should be computed, because a hand-typed answer
and the logic that produces it can quietly disagree while every test still
passes.

This assignment has the same shape of risk built into its own spec:
assessment weights have to add up to 100%, and dated content (sessions,
lectures, assessments) has to stay inside the twelve teaching weeks. When a
check needs to assert one of these, have it sum or derive the value from
`src/content/` / `src/course-config.ts` itself and assert the invariant ---
don't assert a total someone eyeballed.

## This file is yours

Keep growing it: a convention to hold the agent to, a sensor that keeps
catching you out, a fact about this stack the agent gets wrong. The gap
between the two sections above and what's here by the deadline is part of
what this assignment's process criterion reads.

## Facts about this stack, learned the hard way

- A content page needs `.mdx`, not `.md`, the moment it embeds a component
  with object/array props (e.g. `<WeekDiagram segments={[...]} />`). Plain
  `.md` in this project's collections doesn't run the JSX transform, even
  though the collection loader globs both extensions — it fails silently at
  build time, not at write time.
- Never put an inline `<style>` block directly in an `.mdx` file. MDX parses
  a `<style>` element's children as JS expressions via acorn, not as raw CSS,
  so any literal `{`/`}` in the rules breaks the build with an opaque acorn
  parse error. Put styled markup in a plain `.astro` component and import it
  instead — scoped `<style>` only compiles safely there.
- An unquoted multi-line YAML frontmatter scalar (e.g. `description:`) that
  contains a literal `: ` (colon-space) mid-sentence gets misparsed as a
  nested mapping ("implicit mapping pair; a colon is missed"). Use the folded
  block scalar indicator (`description: >-`) for any description text with
  that pattern, rather than quoting or rewording around it.
- `astro-theme-university`'s `Hero` references an SVG `heroImage` as an
  external `<img>` asset — it never gets inlined, so CSS custom properties
  (`var(--at-accent)`, etc.) don't cascade into it. Any hand-authored hero SVG
  needs literal hex values from the theme palette, not `var(...)`. The social
  card path is the opposite: `OpenGraph` always rasterizes to JPEG via
  `getImage()`, so the card source needs to already be a raster file (or
  `image.dangerouslyProcessSVG` set, which isn't here) — `sharp` is already a
  dependency and works fine for a one-off rasterization script.
- In a `.deck.mdx` file, a multi-line `{/* ... */}` JSX comment breaks the
  build: the formatter escapes the `*` inside it and the broken output is a
  fixed point (`astromotion`'s own check catches it, not a stock MDX error).
  Single-line comments and directives (`{/* _class: hero */}`) are fine —
  keep facilitation notes on one line, or use a fenced ` ```comment ` block
  instead.
- `astro-theme-university`'s `Hero` has a `min-height`, not a fixed height,
  so its rendered aspect ratio scales with viewport width — measured 4:1 at
  1440px, 5.33:1 at 1920px, not whatever looked like a reasonable guess.
  Any image built to survive `object-fit: cover` on it needs that ratio
  *measured* (`getBoundingClientRect()` on `.at-hero-image`, ideally via a
  real headless browser), not assumed: a crop-math simulation against a
  guessed target still looks correct while quietly clipping the real page,
  and it took three rounds of "the photo's cropped" reports before the
  guess got checked instead of re-guessed.
