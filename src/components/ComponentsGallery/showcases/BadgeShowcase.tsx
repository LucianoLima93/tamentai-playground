import { Badge } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['white', 'outlined', 'soft', 'solid'] as const
const COLORS = ['dark', 'gray', 'green', 'blue', 'red', 'yellow'] as const
const SIZES = ['sm', 'md', 'lg'] as const
const SHAPES = ['rounded', 'pilled', 'circular'] as const

export function BadgeShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="row">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => (
            <Badge variant={variant} color="blue">
              Badge
            </Badge>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" description="Ignorado quando variant='white'." layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => (
            <Badge variant="soft" color={color}>
              Badge
            </Badge>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix
          values={SIZES}
          render={(size) => (
            <Badge size={size} color="blue">
              Badge
            </Badge>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Shapes" layout="row">
        <PropMatrix
          values={SHAPES}
          render={(shape) => (
            <Badge shape={shape} color="blue">
              {shape === 'circular' ? '9' : 'Badge'}
            </Badge>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Com ícones e remoção" layout="row">
        <Badge color="green" startIcon="Check">
          Concluído
        </Badge>
        <Badge color="blue" endIcon="ArrowRight">
          Detalhes
        </Badge>
        <Badge color="gray" onClose={() => {}}>
          Removível
        </Badge>
      </ShowcaseSection>
    </>
  )
}
