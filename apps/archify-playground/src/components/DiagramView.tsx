import { useEffect, useRef, useState } from 'react';
import type { IR, DiagramType } from '../types';
import { toMermaid } from '../lib/codegen';

interface Props {
  ir: IR | null;
  diagramType: DiagramType;
  theme: 'dark' | 'light';
}

let mermaidReady = false;

async function ensureMermaid(theme: 'dark' | 'light') {
  const mermaid = (await import('mermaid')).default;
  mermaid.initialize({
    startOnLoad: false,
    theme: theme === 'dark' ? 'dark' : 'default',
    securityLevel: 'loose',
    flowchart: { curve: 'basis', padding: 20 },
    sequence: { actorMargin: 60, mirrorActors: false },
    fontFamily: 'Inter, system-ui, sans-serif',
  });
  mermaidReady = true;
  return mermaid;
}

export function DiagramView({ ir, diagramType, theme }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);
  const renderIdRef = useRef(0);

  useEffect(() => {
    if (!ir || !containerRef.current) return;

    const thisId = ++renderIdRef.current;
    setRendering(true);
    setError(null);

    const diagram = toMermaid(ir, diagramType);

    ensureMermaid(theme).then(async mermaid => {
      if (thisId !== renderIdRef.current) return;
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === 'dark' ? 'dark' : 'default',
          securityLevel: 'loose',
          flowchart: { curve: 'basis', padding: 20 },
          sequence: { actorMargin: 60, mirrorActors: false },
          fontFamily: 'Inter, system-ui, sans-serif',
        });
        const id = `diagram-${Date.now()}`;
        const { svg } = await mermaid.render(id, diagram);
        if (thisId !== renderIdRef.current) return;
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
          }
        }
        setError(null);
      } catch (e) {
        if (thisId !== renderIdRef.current) return;
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (thisId === renderIdRef.current) setRendering(false);
      }
    });
  }, [ir, diagramType, theme]);

  if (!ir) {
    return (
      <div className="diagram-empty">
        <div className="diagram-empty__icon">🏗️</div>
        <p className="diagram-empty__text">Enter a system description and click <strong>Generate Diagram</strong></p>
      </div>
    );
  }

  return (
    <div className="diagram-view">
      {rendering && (
        <div className="diagram-loading">
          <div className="spinner" />
          <span>Rendering…</span>
        </div>
      )}
      {error && (
        <div className="diagram-error">
          <strong>Parse error:</strong> {error}
        </div>
      )}
      <div
        ref={containerRef}
        className="diagram-container"
        style={{ opacity: rendering ? 0.3 : 1 }}
      />
      <div className="diagram-meta">
        <span>{ir.title}</span>
        <span>{ir.nodes.length} nodes · {ir.edges.length} edges</span>
      </div>
    </div>
  );
}

void mermaidReady;
