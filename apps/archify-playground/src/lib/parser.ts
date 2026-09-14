import type { IR, IRNode, IREdge, NodeKind } from '../types';

const KIND_KEYWORDS: Record<string, NodeKind> = {
  db: 'database', database: 'database', postgres: 'database', mysql: 'database',
  mongo: 'database', redis: 'cache', cache: 'cache', memcached: 'cache',
  queue: 'queue', kafka: 'queue', rabbitmq: 'queue', sqs: 'queue', sns: 'queue',
  gateway: 'gateway', nginx: 'gateway', 'api gateway': 'gateway', 'load balancer': 'gateway',
  client: 'client', browser: 'client', user: 'client', mobile: 'client', app: 'client',
  external: 'external', stripe: 'external', sendgrid: 'external', twilio: 'external',
};

function inferKind(label: string): NodeKind {
  const lower = label.toLowerCase();
  for (const [kw, kind] of Object.entries(KIND_KEYWORDS)) {
    if (lower.includes(kw)) return kind;
  }
  return 'service';
}

function toId(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

export function parse(text: string): IR {
  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && !l.startsWith('#'));

  const title = lines[0]?.replace(/^#+\s*/, '') ?? 'System';
  const nodesMap = new Map<string, IRNode>();
  const edges: IREdge[] = [];

  const arrowPattern = /(.+?)\s*(?:→|->|-->)\s*(.+?)(?:\s*:\s*(.+))?$/;

  for (const line of lines) {
    const match = arrowPattern.exec(line);
    if (!match) continue;

    const [, rawFrom, rawTo, edgeLabel] = match;
    const fromLabel = rawFrom.trim();
    const toLabel = rawTo.trim();

    const fromId = toId(fromLabel);
    const toId2 = toId(toLabel);

    if (!nodesMap.has(fromId)) {
      nodesMap.set(fromId, { id: fromId, label: fromLabel, kind: inferKind(fromLabel) });
    }
    if (!nodesMap.has(toId2)) {
      nodesMap.set(toId2, { id: toId2, label: toLabel, kind: inferKind(toLabel) });
    }

    edges.push({ from: fromId, to: toId2, label: edgeLabel?.trim() });
  }

  return {
    title,
    nodes: Array.from(nodesMap.values()),
    edges,
  };
}
