# Cloud Agent Rules — tech-demos

## Golden Rules

1. **One sticky monorepo.** Do NOT create new GitHub repositories. All demos live here.
2. **Demos live under `apps/<slug>/` only.** No top-level app code.
3. **Runtime: Bun.** Every demo must work with `bun install && bun run dev` from its directory.
4. **One PR per demo.** PRs must include at least one screenshot AND one video of the running app in the PR body. Non-negotiable.
5. **Plan before coding.** Read and follow `skills/project-planning/SKILL.md` before writing any demo code.

## Directory Layout

```
apps/<slug>/          ← demo app (self-contained)
skills/               ← reusable agent skills
tracking/             ← JSON tracking files
AGENTS.md             ← this file
README.md             ← human-facing overview
```

## Workflow for a New Demo

1. Read `skills/project-planning/SKILL.md`.
2. Write `apps/<slug>/PLAN.md` using the template from that skill.
3. Implement the MVP under `apps/<slug>/`.
4. Record screenshot + video of the running app.
5. Open PR with both artifacts in the body.

## Tracking

`tracking/seen-bookmarks.json` — tracks demo ideas sourced from bookmarks:
- `proposed` — ideas seen, not yet built
- `built` — shipped demos (add `slug` and `pr_url`)
- `skipped` — rejected ideas with a `reason`
