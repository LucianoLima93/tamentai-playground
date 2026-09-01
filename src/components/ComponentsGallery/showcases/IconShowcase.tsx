import { Icon } from '@poliedro/tamentai/web'
import type { IconName, IconSize, IconColor } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const SIZES: IconSize[] = [12, 16, 20, 24, 32]
const COLORS: IconColor[] = [
  'primary',
  'secondary',
  'destructive',
  'success',
  'warning',
  'info',
  'muted',
]
const SAMPLE_ICONS: IconName[] = ['Search', 'Heart', 'Star', 'Settings', 'Bell', 'User', 'Check', 'Download']

export function IconShowcase() {
  return (
    <>
      <ShowcaseSection title="Sizes" description="Em pixels: 12, 16, 20, 24, 32." layout="row">
        <PropMatrix values={SIZES} render={(size) => <Icon name="Star" size={size} />} />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" description="Cores semânticas do tema." layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => <Icon name="Star" size={24} color={color} />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Amostra de ícones" description="Nomes Lucide via prop name." layout="row">
        <PropMatrix values={SAMPLE_ICONS} render={(name) => <Icon name={name} size={24} />} />
      </ShowcaseSection>
    </>
  )
}
