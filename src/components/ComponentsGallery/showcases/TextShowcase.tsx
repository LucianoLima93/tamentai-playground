import { Text } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = [
  'display-lg',
  'display',
  'display-sm',
  'title-lg',
  'title-md',
  'title-sm',
  'button-lg',
  'button',
  'button-sm',
  'body-lg',
  'body',
  'body-sm',
  'label-lg',
  'label',
  'label-sm',
  'caption',
  'caption-sm',
  'overline',
] as const
const WEIGHTS = ['regular', 'medium', 'semibold', 'bold'] as const
const COLORS = ['default', 'muted'] as const

export function TextShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="Escala tipográfica completa." layout="stack">
        {VARIANTS.map((variant) => (
          <Text key={variant} as="p" variant={variant}>
            {variant} — The quick brown fox
          </Text>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Weights" layout="row">
        <PropMatrix
          values={WEIGHTS}
          render={(weight) => (
            <Text as="span" variant="body-lg" weight={weight}>
              {weight}
            </Text>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => (
            <Text as="span" variant="body-lg" color={color}>
              {color}
            </Text>
          )}
        />
      </ShowcaseSection>
    </>
  )
}
