import { useState, useEffect } from 'react';
import { InputPanel } from './components/InputPanel';
import { DiagramView } from './components/DiagramView';
import { TabBar } from './components/TabBar';
import { ThemeToggle } from './components/ThemeToggle';
import { parse } from './lib/parser';
import { EXAMPLES } from './fixtures/examples';
import type { IR, DiagramType } from './types';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [diagramType, setDiagramType] = useState<DiagramType>('architecture');
  const [ir, setIr] = useState<IR | null>(EXAMPLES[0].ir);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function handleGenerate(text: string) {
    const parsed = parse(text);
    if (parsed.nodes.length > 0) {
      setIr(parsed);
    }
  }

  function toggleTheme() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__icon">🏗️</span>
          <div>
            <h1 className="app-header__title">Archify Playground</h1>
            <p className="app-header__sub">Plain text → interactive system diagrams</p>
          </div>
        </div>
        <div className="app-header__controls">
          <TabBar active={diagramType} onChange={setDiagramType} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="app-main">
        <aside className="app-sidebar">
          <InputPanel onGenerate={handleGenerate} />
        </aside>
        <section className="app-diagram">
          <DiagramView ir={ir} diagramType={diagramType} theme={theme} />
        </section>
      </main>
    </div>
  );
}
