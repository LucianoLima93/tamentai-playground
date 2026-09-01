import { Spinner } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['line', 'progress', 'dots'] as const
const SIZES = ['sm', 'md', 'lg'] as const
const COLORS = ['primary', 'secondary', 'destructive', 'dark'] as const

export function SpinnerShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="row">
        <PropMatrix values={VARIANTS} render={(variant) => <Spinner variant={variant} />} />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix values={SIZES} render={(size) => <Spinner size={size} />} />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" layout="row">
        <PropMatrix values={COLORS} render={(color) => <Spinner color={color} />} />
      </ShowcaseSection>

      <ShowcaseSection title="Com rótulo" layout="row">
        <Spinner showLabel label="Carregando..." />
      </ShowcaseSection>
    </>
  )
}
