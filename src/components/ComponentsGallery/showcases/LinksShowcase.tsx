import { Links } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const TYPES = ['text', 'pill'] as const
const COLORS = ['dark', 'gray', 'green', 'blue', 'red', 'yellow', 'light'] as const
const SIZES = ['sm', 'md', 'lg'] as const

export function LinksShowcase() {
  return (
    <>
      <ShowcaseSection title="Types" description="Link inline ou em formato pill." layout="row">
        <PropMatrix
          values={TYPES}
          render={(type) => (
            <Links type={type} href="#">
              Saiba mais
            </Links>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => (
            <Links color={color} href="#">
              Saiba mais
            </Links>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix
          values={SIZES}
          render={(size) => (
            <Links size={size} href="#">
              Saiba mais
            </Links>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Com ícones e desabilitado" layout="row">
        <Links href="#" startIcon="ArrowLeft">
          Voltar
        </Links>
        <Links href="#" endIcon="ArrowRight">
          Avançar
        </Links>
        <Links href="#" disabled>
          Desabilitado
        </Links>
      </ShowcaseSection>
    </>
  )
}
