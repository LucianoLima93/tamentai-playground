import { StaticIcon } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['base', 'solid', 'soft', 'soft-outlined', 'outlined', 'white'] as const
const COLORS = ['dark', 'gray', 'green', 'blue', 'red', 'yellow', 'light'] as const
const SIZES = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
const SHAPES = ['rounded', 'circular'] as const

export function StaticIconShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="row">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => <StaticIcon name="Bell" variant={variant} color="blue" />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => <StaticIcon name="Bell" variant="soft" color={color} />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix values={SIZES} render={(size) => <StaticIcon name="Bell" size={size} />} />
      </ShowcaseSection>

      <ShowcaseSection title="Shapes" layout="row">
        <PropMatrix
          values={SHAPES}
          render={(shape) => <StaticIcon name="Bell" variant="soft" color="blue" shape={shape} />}
        />
      </ShowcaseSection>
    </>
  )
}
