import type { DiagramType } from '../types';

interface Props {
  active: DiagramType;
  onChange: (type: DiagramType) => void;
}

const TABS: { type: DiagramType; label: string; icon: string }[] = [
  { type: 'architecture', label: 'Architecture', icon: '🏗️' },
  { type: 'sequence', label: 'Sequence', icon: '🔄' },
  { type: 'dataflow', label: 'Data Flow', icon: '🌊' },
];

export function TabBar({ active, onChange }: Props) {
  return (
    <div className="tab-bar" role="tablist">
      {TABS.map(tab => (
        <button
          key={tab.type}
          role="tab"
          aria-selected={active === tab.type}
          className={`tab ${active === tab.type ? 'tab--active' : ''}`}
          onClick={() => onChange(tab.type)}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}
