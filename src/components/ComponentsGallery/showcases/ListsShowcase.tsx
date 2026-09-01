import { Lists } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const VARIANTS = ['disc', 'decimal', 'inline', 'icon', 'checked'] as const

const items = [
  { id: '1', label: 'Primeiro item', icon: 'Check' as const },
  { id: '2', label: 'Segundo item', icon: 'Star' as const },
  { id: '3', label: 'Terceiro item', icon: 'Heart' as const },
]

export function ListsShowcase() {
  return (
    <ShowcaseSection title="Variants" description="Estilos de marcador da lista." layout="grid">
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ padding: '0.5rem' }}>
          <Lists items={items} variant={variant} />
        </div>
      ))}
    </ShowcaseSection>
  )
}
