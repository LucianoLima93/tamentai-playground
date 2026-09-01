import { Stepper } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const VARIANTS = ['linear', 'left', 'center'] as const

const items = [
  { id: '1', label: 'Carrinho', description: 'Revise os itens' },
  { id: '2', label: 'Entrega', description: 'Endereço e frete' },
  { id: '3', label: 'Pagamento', description: 'Forma de pagamento' },
  { id: '4', label: 'Confirmação', description: 'Pedido finalizado' },
]

export function StepperShowcase() {
  return (
    <ShowcaseSection
      title="Variants"
      description="Alinhamento do indicador; activeIndex=1."
      layout="stack"
    >
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ width: '100%' }}>
          <Stepper items={items} variant={variant} activeIndex={1} aria-label={`Etapas ${variant}`} />
        </div>
      ))}
    </ShowcaseSection>
  )
}
