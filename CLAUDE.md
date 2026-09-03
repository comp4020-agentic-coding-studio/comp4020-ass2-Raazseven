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
