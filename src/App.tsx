import React from 'react';

import { Accordion } from '@poliedro/tamentai/web';
import { ExampleH1, ExampleH2, ExampleH3 } from './__HorizontalExample';
import { ExampleV1, ExampleV2, ExampleV3 } from './__VerticalExample';
import { LegacyAppPlayground } from './LegacyAppPlayground';
import { FunnyPlayground } from './FunnyPlayground';
import PokemonPlayground from './PokemonPlayground';

const InputGroupExamples = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <Accordion
        multiple
        items={[
          { title: 'Horizontal', children: <ExampleH1 /> },
          { title: 'Horizontal Feedback', children: <ExampleH2 /> },
          { title: 'Horizontal Button', children: <ExampleH3 /> },
          { title: 'Vertical', children: <ExampleV1 /> },
          { title: 'Vertical Feedback', children: <ExampleV2 /> },
          { title: 'Vertical Button', children: <ExampleV3 /> },
        ]}
      />
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'pokemon' | 'legacy' | 'funny' | 'novos'>('pokemon')

  const tabStyle = (isActive: boolean) => ({
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
    <div style={{ paddingBottom: '4rem', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar / Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '2rem', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
        <button style={tabStyle(activeTab === 'pokemon')} onClick={() => setActiveTab('pokemon')}>
          Pokémon Playground
        </button>
        <button style={tabStyle(activeTab === 'funny')} onClick={() => setActiveTab('funny')}>
          Funny Playground (Combobox)
        </button>
        <button style={tabStyle(activeTab === 'legacy')} onClick={() => setActiveTab('legacy')}>
          Legacy Playground
        </button>
        <button style={tabStyle(activeTab === 'novos')} onClick={() => setActiveTab('novos')}>
          Novos Exemplos (Inputs/Tables)
        </button>
      </div>

      {/* Conteúdo */}
      <div style={{ flex: 1 }}>
        {activeTab === 'pokemon' && <PokemonPlayground />}

        {activeTab === 'funny' && <FunnyPlayground />}
        
        {activeTab === 'legacy' && <LegacyAppPlayground />}
        
        {activeTab === 'novos' && (
          <div data-theme="light" style={{ padding: '0 2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'Inter' }}>Exemplos de Input Group</h2>
            <InputGroupExamples />

            <hr style={{ border: 'none', borderTop: '2px dashed #e2e8f0', margin: '3rem 0' }} />
          </div>
        )}
      </div>
    </div>
  )
}
