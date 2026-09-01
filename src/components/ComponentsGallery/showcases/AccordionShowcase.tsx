import { Accordion } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const VARIANTS = ['plain', 'bordered', 'divider', 'active-bordered'] as const

const items = [
  { value: 'a', title: 'O que é o Tamentai?', children: 'Um design system para produtos Poliedro.' },
  { value: 'b', title: 'Como instalar?', children: 'Via pnpm add @poliedro/tamentai.' },
  { value: 'c', title: 'Tem tema escuro?', children: 'Sim, via data-theme="dark".' },
]

export function AccordionShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="stack">
        {VARIANTS.map((variant) => (
          <div key={variant} style={{ width: '100%' }}>
            <Accordion items={items} variant={variant} defaultValue={['a']} />
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Ícone e múltiplos" description="chevron e abertura múltipla." layout="stack">
        <Accordion items={items} icon="chevron" multiple defaultValue={['a', 'b']} />
      </ShowcaseSection>
    </>
  )
}
