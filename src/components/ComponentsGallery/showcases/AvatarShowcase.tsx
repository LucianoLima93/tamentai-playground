import { Avatar, AvatarGroup } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['image', 'placeholder', 'white', 'solid', 'soft', 'outlined'] as const
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const SHAPES = ['rounded', 'circular'] as const
const COLORS = ['dark', 'gray', 'green', 'blue', 'red', 'yellow', 'light'] as const
const STATUSES = ['Offline', 'Online', 'Away', 'Do Not Disturb', 'Icon'] as const
const GROUPS = ['Default', 'Bordered', 'Grid'] as const

const SAMPLE_IMG = 'https://i.pravatar.cc/100?img=12'

export function AvatarShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="Tratamento visual do avatar." layout="row">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => (
            <Avatar
              variant={variant}
              initials="AB"
              src={variant === 'image' ? SAMPLE_IMG : undefined}
              alt="Avatar"
            />
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix values={SIZES} render={(size) => <Avatar size={size} initials="AB" />} />
      </ShowcaseSection>

      <ShowcaseSection title="Shapes" layout="row">
        <PropMatrix values={SHAPES} render={(shape) => <Avatar shape={shape} initials="AB" />} />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" description="Aplicado a variantes não-imagem." layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => <Avatar variant="solid" color={color} initials="AB" />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Status" description="Indicador de presença." layout="row">
        <PropMatrix
          values={STATUSES}
          render={(status) => <Avatar initials="AB" status={status} />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="AvatarGroup" description="Agrupamento com limite (max)." layout="row">
        <PropMatrix
          values={GROUPS}
          render={(group) => (
            <AvatarGroup group={group} max={3}>
              <Avatar initials="AB" />
              <Avatar initials="CD" />
              <Avatar initials="EF" />
              <Avatar initials="GH" />
              <Avatar initials="IJ" />
            </AvatarGroup>
          )}
        />
      </ShowcaseSection>
    </>
  )
}
