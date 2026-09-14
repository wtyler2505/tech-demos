import { useState } from 'react';
import { EXAMPLES } from '../fixtures/examples';
import type { Example } from '../types';

interface Props {
  onGenerate: (text: string) => void;
}

export function InputPanel({ onGenerate }: Props) {
  const [text, setText] = useState(EXAMPLES[0].description);
  const [selected, setSelected] = useState<string>(EXAMPLES[0].id);

  function handleExampleSelect(example: Example) {
    setSelected(example.id);
    setText(example.description);
    onGenerate(example.description);
  }

  function handleGenerate() {
    onGenerate(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleGenerate();
    }
  }

  return (
    <div className="input-panel">
      <div className="input-panel__header">
        <h2 className="input-panel__title">System Description</h2>
        <span className="input-panel__hint">Describe flows using <code>→</code> or <code>-&gt;</code> arrows</span>
      </div>

      <div className="example-chips">
        {EXAMPLES.map(ex => (
          <button
            key={ex.id}
            className={`chip ${selected === ex.id ? 'chip--active' : ''}`}
            onClick={() => handleExampleSelect(ex)}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <textarea
        className="input-panel__textarea"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        rows={12}
        placeholder={`Describe your system, e.g.:\n\nMy App\nUser → API Gateway : HTTP\nAPI Gateway → Service : route\nService → Database : query`}
      />

      <div className="input-panel__footer">
        <span className="input-panel__kbd-hint">⌘↵ to generate</span>
        <button className="generate-btn" onClick={handleGenerate}>
          ⚡ Generate Diagram
        </button>
      </div>
    </div>
  );
}
