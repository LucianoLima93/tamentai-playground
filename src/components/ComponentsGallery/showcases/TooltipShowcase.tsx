import { Tooltip, Button } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const PLACEMENTS = ['top', 'right', 'bottom', 'left'] as const
const VARIANTS = ['default', 'light'] as const

export function TooltipShowcase() {
  return (
    <>
      <ShowcaseSection
        title="Placements"
        description="Posições principais (também há variações -start/-end)."
        layout="row"
      >
        <PropMatrix
          values={PLACEMENTS}
          render={(placement) => (
            <Tooltip content={`Tooltip ${placement}`} placement={placement}>
              <Button variant="outline">{placement}</Button>
            </Tooltip>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Variants" layout="row">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => (
            <Tooltip content="Conteúdo do tooltip" variant={variant} defaultOpen>
              <Button variant="outline">{variant}</Button>
            </Tooltip>
          )}
        />
      </ShowcaseSection>
    </>
  )
}
