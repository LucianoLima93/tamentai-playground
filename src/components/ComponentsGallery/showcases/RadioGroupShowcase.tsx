import { RadioGroup, Radio } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const VARIANTS = ['plain', 'boxed', 'list'] as const

export function RadioGroupShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="Tratamento visual de cada item." layout="stack">
        {VARIANTS.map((variant) => (
          <div key={variant} style={{ width: '100%', maxWidth: 360 }}>
            <RadioGroup label={variant} variant={variant} name={`variant-${variant}`} defaultValue="1">
              <Radio value="1" label="Opção 1" />
              <Radio value="2" label="Opção 2" />
              <Radio value="3" label="Opção 3" />
            </RadioGroup>
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Horizontal" layout="stack">
        <RadioGroup label="Orientação horizontal" orientation="horizontal" name="orient" defaultValue="1">
          <Radio value="1" label="A" />
          <Radio value="2" label="B" />
          <Radio value="3" label="C" />
        </RadioGroup>
      </ShowcaseSection>
    </>
  )
}
