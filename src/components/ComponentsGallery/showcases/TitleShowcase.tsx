import { TitleV2 } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const WEIGHTS = ['medium', 'semibold', 'bold'] as const
const COLORS = ['default', 'muted'] as const

export function TitleShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="Headings de h1 a h6." layout="stack">
        {VARIANTS.map((variant) => (
          <TitleV2 key={variant} variant={variant}>
            {variant.toUpperCase()} — Título de exemplo
          </TitleV2>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Weights" layout="row">
        <PropMatrix
          values={WEIGHTS}
          render={(weight) => (
            <TitleV2 variant="h4" weight={weight}>
              {weight}
            </TitleV2>
          )}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Colors" layout="row">
        <PropMatrix
          values={COLORS}
          render={(color) => (
            <TitleV2 variant="h4" color={color}>
              {color}
            </TitleV2>
          )}
        />
      </ShowcaseSection>
    </>
  )
}
