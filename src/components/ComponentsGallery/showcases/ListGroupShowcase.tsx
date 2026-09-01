import { ListGroup } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const VARIANTS = ['basic', 'flush', 'bordered', 'striped', 'striped-bordered'] as const

const items = [
  { id: '1', label: 'Dashboard', icon: 'LayoutDashboard' as const, active: true },
  { id: '2', label: 'Mensagens', icon: 'Mail' as const, badge: { value: 4, color: 'red' as const } },
  { id: '3', label: 'Configurações', icon: 'Settings' as const },
  { id: '4', label: 'Desabilitado', icon: 'Lock' as const, disabled: true },
]

export function ListGroupShowcase() {
  return (
    <ShowcaseSection title="Variants" description="Estilos do container da lista." layout="stack">
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ width: '100%', maxWidth: 360 }}>
          <ListGroup items={items} variant={variant} aria-label={variant} />
        </div>
      ))}
    </ShowcaseSection>
  )
}
