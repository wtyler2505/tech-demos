import type { IR, DiagramType } from '../types';

const SHAPE: Record<string, [string, string]> = {
  client:   ['([', '])'],
  gateway:  ['[/', '/]'],
  service:  ['[', ']'],
  database: ['[(', ')]'],
  queue:    ['{{', '}}'],
  cache:    ['[(', ')]'],
  external: ['[\\', '\\]'],
};

function archShape(kind: string): [string, string] {
  return SHAPE[kind] ?? ['[', ']'];
}

export function toMermaid(ir: IR, type: DiagramType): string {
  switch (type) {
    case 'architecture': return toFlowchart(ir);
    case 'sequence':     return toSequence(ir);
    case 'dataflow':     return toDataflow(ir);
  }
}

function toFlowchart(ir: IR): string {
  const lines: string[] = ['flowchart LR'];

  for (const node of ir.nodes) {
    const [open, close] = archShape(node.kind);
    lines.push(`    ${node.id}${open}"${node.label}"${close}`);
  }

  for (const edge of ir.edges) {
    const label = edge.label ? `|"${edge.label}"|` : '';
    lines.push(`    ${edge.from} -->${label} ${edge.to}`);
  }

  return lines.join('\n');
}

function toSequence(ir: IR): string {
  const lines: string[] = ['sequenceDiagram'];

  const participantSet = new Set<string>();
  for (const edge of ir.edges) {
    participantSet.add(edge.from);
    participantSet.add(edge.to);
  }

  for (const id of participantSet) {
    const node = ir.nodes.find(n => n.id === id);
    const label = node?.label ?? id;
    lines.push(`    participant ${id} as ${label}`);
  }

  for (const edge of ir.edges) {
    const arrow = edge.label ? `->>` : '->>';
    const msg = edge.label ?? '+';
    lines.push(`    ${edge.from}${arrow}${edge.to}: ${msg}`);
  }

  return lines.join('\n');
}

function toDataflow(ir: IR): string {
  const lines: string[] = ['flowchart TD'];

  const kindStyle: Record<string, string> = {
    client:   'fill:#4f83cc,stroke:#2d5fa6,color:#fff',
    gateway:  'fill:#e6a817,stroke:#b07d0f,color:#000',
    service:  'fill:#3aa76d,stroke:#207a4a,color:#fff',
    database: 'fill:#9b59b6,stroke:#6c3483,color:#fff',
    queue:    'fill:#e74c3c,stroke:#a93226,color:#fff',
    cache:    'fill:#f39c12,stroke:#b7770d,color:#000',
    external: 'fill:#7f8c8d,stroke:#515a5a,color:#fff',
  };

  for (const node of ir.nodes) {
    lines.push(`    ${node.id}["${node.label}"]`);
    const style = kindStyle[node.kind];
    if (style) lines.push(`    style ${node.id} ${style}`);
  }

  for (const edge of ir.edges) {
    const label = edge.label ? `|"${edge.label}"|` : '';
    lines.push(`    ${edge.from} -->${label} ${edge.to}`);
  }

  return lines.join('\n');
}
