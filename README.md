# tech-demos

Sticky monorepo for weekday tech demos. Apps live under `apps/<slug>/`.

## Layout

```
apps/<slug>/                ← self-contained demo apps (Bun + Vite)
skills/project-planning/    ← planning skill for new demos
tracking/seen-bookmarks.json← idea pipeline (proposed → built / skipped)
AGENTS.md                   ← rules for cloud agents working in this repo
```

## Demos

| Slug | Title | Status |
|------|-------|--------|
| [archify-playground](apps/archify-playground/) | Archify Playground | ✅ built |

## Running a Demo

```bash
cd apps/<slug>
bun install
bun run dev
```

## Adding a New Demo

See [AGENTS.md](AGENTS.md) for the full workflow. TL;DR: read `skills/project-planning/SKILL.md` first, write `PLAN.md`, build, screenshot + video, PR.
