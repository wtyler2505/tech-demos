---
name: project-planning
description: Concise project-planning skill for demo MVPs. Use before writing any code for a new demo under apps/<slug>/.
---

# Demo MVP Project Planning

## When to Use

Read this skill at the start of every new demo before touching code.

## Steps

### 1. Scope (answer these before writing PLAN.md)

- What is the ONE thing this demo shows? (≤ 15 words)
- What is the happy-path interaction? (user does X → sees Y)
- What is explicitly OUT of scope?
- Runtime: Bun + Vite SPA (default) or other justified choice?

### 2. Write PLAN.md

Save to `apps/<slug>/PLAN.md` using the template below.

### 3. Acceptance Checks (PR cannot merge without these)

- [ ] `bun install && bun run dev` works from `apps/<slug>/`
- [ ] Happy path works end-to-end in the browser
- [ ] Screenshot of the running app attached to PR body
- [ ] Screen recording (video) of the running app attached to PR body
- [ ] No TypeScript errors / console errors on load

---

## PLAN.md Template

```markdown
# [Demo Title] — PLAN.md

**Goal:** [One sentence: what does this demo show?]

**Happy Path:** [User does X → sees Y]

**Out of Scope:** [What we are NOT building]

**Tech Stack:** Bun · Vite · [other libs]

## File Layout

- `index.html` — entry point
- `src/main.ts` — app bootstrap
- `src/App.tsx` — root component
- `src/components/` — UI components
- `src/fixtures/` — typed JSON sample data
- `src/lib/` — core logic (parser, renderer helpers)
- `package.json` — bun scripts: dev, build, preview

## Tasks

### Task 1: Project scaffold
- [ ] `bun create vite . --template react-ts` (or manual)
- [ ] Verify `bun run dev` starts without errors
- [ ] Commit: `chore: scaffold archify-playground`

### Task 2: [Feature A]
- [ ] ...
- [ ] Commit

### Task 3: [Feature B]
- [ ] ...
- [ ] Commit

### Task N: Acceptance check
- [ ] Run through happy path manually
- [ ] Capture screenshot → attach to PR
- [ ] Record screen video → attach to PR
```
