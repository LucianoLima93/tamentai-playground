import { ButtonIcon, Icon } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['solid', 'soft', 'outline', 'ghost', 'link', 'pagination'] as const
const COLORS = ['primary', 'secondary', 'destructive'] as const
const SIZES = ['xs', 'sm', 'md', 'lg'] as const
const SHAPES = ['subtle', 'rounded', 'circled', 'square'] as const

export function ButtonIconShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="row">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => (
            <ButtonIcon aria-label="Curtir" variant={variant}>
              <Icon name="Heart" size={20} aria-hidden="true" />
            </ButtonIcon>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => (
            <ButtonIcon aria-label="Curtir" color={color}>
              <Icon name="Heart" size={20} aria-hidden="true" />
            </ButtonIcon>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix
          values={SIZES}
          render={(size) => (
            <ButtonIcon aria-label="Curtir" size={size}>
              <Icon name="Heart" size={16} aria-hidden="true" />
            </ButtonIcon>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Shapes" layout="row">
        <PropMatrix
          values={SHAPES}
          render={(shape) => (
            <ButtonIcon aria-label="Curtir" shape={shape}>
              <Icon name="Heart" size={20} aria-hidden="true" />
            </ButtonIcon>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="States" layout="row">
        <ButtonIcon aria-label="Carregando" loading>
          <Icon name="Heart" size={20} aria-hidden="true" />
        </ButtonIcon>
        <ButtonIcon aria-label="Ativo" active>
          <Icon name="Heart" size={20} aria-hidden="true" />
        </ButtonIcon>
        <ButtonIcon aria-label="Desabilitado" disabled>
          <Icon name="Heart" size={20} aria-hidden="true" />
        </ButtonIcon>
      </ShowcaseSection>
    </>
  )
}
