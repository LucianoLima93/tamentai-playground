import { Switch } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['solid', 'soft'] as const
const SIZES = ['sm', 'md', 'lg'] as const
const SHAPES = ['pill', 'square'] as const

export function SwitchShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="row">
        <PropMatrix values={VARIANTS} render={(variant) => <Switch variant={variant} defaultChecked />} />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix values={SIZES} render={(size) => <Switch size={size} defaultChecked />} />
      </ShowcaseSection>

      <ShowcaseSection title="Shapes" layout="row">
        <PropMatrix values={SHAPES} render={(shape) => <Switch shape={shape} defaultChecked />} />
      </ShowcaseSection>

      <ShowcaseSection title="States e opções" layout="row">
        <Switch defaultChecked showIcons />
        <Switch defaultChecked showSideLabels offLabel="Off" onLabel="On" />
        <Switch disabled />
        <Switch invalid />
        <Switch success defaultChecked />
      </ShowcaseSection>
    </>
  )
}
