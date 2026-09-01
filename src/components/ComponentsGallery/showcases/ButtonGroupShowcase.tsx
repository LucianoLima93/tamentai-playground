import { ButtonGroup, Button, ButtonIcon, Icon } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

export function ButtonGroupShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="joined (unido) e spaced (espaçado)." layout="stack">
        <ButtonGroup aria-label="Ações unidas" variant="joined">
          <Button variant="outline">Um</Button>
          <Button variant="outline">Dois</Button>
          <Button variant="outline">Três</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Ações espaçadas" variant="spaced">
          <Button variant="outline">Um</Button>
          <Button variant="outline">Dois</Button>
          <Button variant="outline">Três</Button>
        </ButtonGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Vertical / ícones" layout="row">
        <ButtonGroup aria-label="Formatação" orientation="vertical" variant="joined">
          <ButtonIcon aria-label="Negrito" variant="outline">
            <Icon name="Bold" size={20} />
          </ButtonIcon>
          <ButtonIcon aria-label="Itálico" variant="outline">
            <Icon name="Italic" size={20} />
          </ButtonIcon>
          <ButtonIcon aria-label="Sublinhado" variant="outline">
            <Icon name="Underline" size={20} />
          </ButtonIcon>
        </ButtonGroup>
      </ShowcaseSection>
    </>
  )
}
