import { Button } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['solid', 'soft', 'outline', 'ghost', 'link'] as const
const COLORS = ['primary', 'secondary', 'destructive'] as const
const SIZES = ['sm', 'md', 'lg'] as const

/**
 * Showcase de referência do Button — serve de template para os demais
 * showcases da Task 5. Cobre variant, color, size, estados e ícones.
 */
export function ButtonShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="Estilos de preenchimento visual." layout="row">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => <Button variant={variant}>Button</Button>}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" description="Intenção semântica da cor." layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => <Button color={color}>Button</Button>}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" description="Escala de altura, padding e tipografia." layout="row">
        <PropMatrix
          values={SIZES}
          render={(size) => (
            <Button size={size}>Button</Button>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="States" description="Estados de interação." layout="row">
        <PropMatrix
          values={['loading', 'disabled'] as const}
          render={(state) => (
            <Button loading={state === 'loading'} disabled={state === 'disabled'}>
              Button
            </Button>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Roundness" description="Arredondamento da borda." layout="row">
        <PropMatrix
          values={['default', 'round'] as const}
          render={(roundness) => <Button roundness={roundness}>Button</Button>}
        />
      </ShowcaseSection>
    </>
  )
}
