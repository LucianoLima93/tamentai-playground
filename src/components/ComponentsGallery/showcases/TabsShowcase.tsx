import { Tabs } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const VARIANTS = ['base', 'bordered', 'segment', 'pills', 'pillsGray'] as const

const tabs = [
  { value: 'conta', label: 'Conta', active: true },
  { value: 'perfil', label: 'Perfil' },
  { value: 'notificacoes', label: 'Notificações' },
]

export function TabsShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="Estilos do tablist." layout="stack">
        {VARIANTS.map((variant) => (
          <div key={variant} style={{ width: '100%' }}>
            <Tabs tabs={tabs} variant={variant} aria-label={`Exemplo ${variant}`} />
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Sizes e fullWidth" layout="stack">
        <Tabs tabs={tabs} size="sm" aria-label="Pequeno" />
        <Tabs tabs={tabs} size="md" fullWidth aria-label="Largura total" />
      </ShowcaseSection>

      <ShowcaseSection title="Vertical" layout="stack">
        <Tabs tabs={tabs} orientation="vertical" variant="pills" aria-label="Vertical" />
      </ShowcaseSection>
    </>
  )
}
