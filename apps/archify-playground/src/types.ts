export type NodeKind = 'client' | 'service' | 'database' | 'queue' | 'gateway' | 'cache' | 'external';

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

export interface Example {
  id: string;
  title: string;
  description: string;
  ir: IR;
}
