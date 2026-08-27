import React from 'react';

import { LegacyAppPlayground } from '../../LegacyAppPlayground';
import { FunnyPlayground } from '../../FunnyPlayground';
import PokemonPlayground from '../../PokemonPlayground';
import TablePlayground from '../../TablePlayground';

export function PlaygroundTabs() {
  const [activeTab, setActiveTab] = React.useState<'pokemon' | 'legacy' | 'funny' | 'table'>('pokemon')

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '1rem 2rem',
    cursor: 'pointer',
    borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
    fontWeight: isActive ? 600 : 400,
    color: isActive ? '#2563eb' : '#475569',
    fontFamily: 'Inter, sans-serif',
    background: 'none',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    fontSize: '1rem',
    transition: 'all 0.2s'
  })

  return (
    <div style={{ paddingBottom: '4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem', background: '#fff', position: 'sticky', top: '60px', zIndex: 90 }}>
        <button style={tabStyle(activeTab === 'pokemon')} onClick={() => setActiveTab('pokemon')}>
          Pokemon Playground
        </button>
        <button style={tabStyle(activeTab === 'funny')} onClick={() => setActiveTab('funny')}>
          Funny Playground (Combobox)
        </button>
        <button style={tabStyle(activeTab === 'table')} onClick={() => setActiveTab('table')}>
          Table (Pokedex)
        </button>
        <button style={tabStyle(activeTab === 'legacy')} onClick={() => setActiveTab('legacy')}>
          Legacy Playground
        </button>
      </div>

      {/* Conteudo */}
      <div style={{ flex: 1 }}>
        {activeTab === 'pokemon' && <PokemonPlayground />}

        {activeTab === 'funny' && <FunnyPlayground />}

        {activeTab === 'table' && <TablePlayground />}

        {activeTab === 'legacy' && <LegacyAppPlayground />}
      </div>
    </div>
  )
}
