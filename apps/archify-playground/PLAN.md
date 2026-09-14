# Archify Playground — PLAN.md

**Goal:** Turn plain-language system descriptions into interactive architecture, sequence, and data-flow diagrams rendered in the browser.

**Happy Path:** User types a short system description (e.g. "User sends HTTP request → API Gateway → Lambda → DynamoDB") → clicks Generate → sees a live interactive diagram with nodes and edges; can switch between Architecture, Sequence, and Data-Flow views; can toggle dark/light mode.

**Out of Scope:** LLM API calls (we use a local IR parser + hardcoded fixtures); authentication; persistence; exporting diagrams.

**Tech Stack:** Bun · Vite · React · TypeScript · Mermaid.js (diagram rendering) · CSS variables (theming)

## File Layout

```
apps/archify-playground/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── src/
│   ├── main.tsx            ← React root mount
│   ├── App.tsx             ← top-level layout, theme state
│   ├── components/
│   │   ├── DiagramView.tsx ← renders Mermaid diagram
│   │   ├── InputPanel.tsx  ← textarea + Generate button
│   │   ├── TabBar.tsx      ← Architecture / Sequence / DataFlow tabs
│   │   └── ThemeToggle.tsx ← dark/light switch
│   ├── lib/
│   │   ├── parser.ts       ← plain-text → IR (IntermediateRepresentation)
│   │   └── codegen.ts      ← IR → Mermaid diagram string per type
│   ├── fixtures/
│   │   └── examples.ts     ← typed sample system descriptions + IRs
│   └── types.ts            ← shared TypeScript types
└── PLAN.md
```

## Types (types.ts)

```typescript
export type NodeKind = 'client' | 'service' | 'database' | 'queue' | 'gateway';

export interface IRNode {
  id: string;
  label: string;
  kind: NodeKind;
}

export interface IREdge {
  from: string;
  to: string;
  label?: string;
}

export interface IR {
  nodes: IRNode[];
  edges: IREdge[];
  title: string;
}

export type DiagramType = 'architecture' | 'sequence' | 'dataflow';
```

## Tasks

### Task 1: Scaffold the Vite + React + TS project

- [ ] Init project manually (bun create has no stdin in CI)
- [ ] Verify `bun run dev` starts
- [ ] Commit: `chore: scaffold archify-playground`

### Task 2: Types + parser

- [ ] Write `src/types.ts`
- [ ] Write `src/lib/parser.ts` — tokenise lines like "A → B" into IRNode/IREdge
- [ ] Commit: `feat: IR types and plain-text parser`

### Task 3: Mermaid codegen

- [ ] Write `src/lib/codegen.ts` — IR → Mermaid strings for architecture (flowchart LR), sequence, and dataflow
- [ ] Commit: `feat: IR-to-Mermaid codegen`

### Task 4: Fixtures

- [ ] Write `src/fixtures/examples.ts` with 3 sample descriptions
- [ ] Commit: `feat: sample fixtures`

### Task 5: UI components

- [ ] `DiagramView.tsx` — loads mermaid, renders diagram in a div
- [ ] `InputPanel.tsx` — textarea + Generate button
- [ ] `TabBar.tsx` — tab switcher
- [ ] `ThemeToggle.tsx` — button toggling data-theme on :root
- [ ] Commit: `feat: UI components`

### Task 6: App composition + styles

- [ ] `App.tsx` — wire all components, manage state (description, IR, diagramType, theme)
- [ ] CSS with dark/light variables
- [ ] Commit: `feat: compose App with theming`

### Task 7: Acceptance check

- [ ] `bun install && bun run dev` works
- [ ] Happy path: type description → Generate → diagram renders
- [ ] All three diagram types render without errors
- [ ] Dark/light toggle works
- [ ] Screenshot + video captured
