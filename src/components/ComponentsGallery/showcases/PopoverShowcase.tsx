import { Popover, Button, Text, TitleV2 } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const content = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: 220 }}>
    <TitleV2 variant="h5">Título do popover</TitleV2>
    <Text as="p" variant="body-sm" color="muted">
      Conteúdo flutuante ancorado ao trigger.
    </Text>
  </div>
)

const SIDES = ['top', 'right', 'bottom', 'left'] as const

export function PopoverShowcase() {
  return (
    <>
      <ShowcaseSection title="Posições (side)" layout="row">
        {SIDES.map((side) => (
          <Popover key={side} trigger={<Button variant="outline">{side}</Button>} side={side} showArrow>
            {content}
          </Popover>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Sem padding" layout="row">
        <Popover trigger={<Button variant="outline">padding none</Button>} padding="none">
          {content}
        </Popover>
      </ShowcaseSection>
    </>
  )
}
