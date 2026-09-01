import { useState } from 'react'
import { DatePicker } from '@poliedro/tamentai/web'
import type { DatePickerRange } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

export function DatePickerShowcase() {
  const [single, setSingle] = useState<DatePickerRange | undefined>()
  const [range, setRange] = useState<DatePickerRange | undefined>()

  return (
    <>
      <ShowcaseSection title="Single" description="Seleção de uma única data." layout="stack">
        <div style={{ maxWidth: 320 }}>
          <DatePicker mode="single" value={single} onChange={setSingle} placeholder="Selecione uma data" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Range" description="Intervalo com presets no painel." layout="stack">
        <div style={{ maxWidth: 320 }}>
          <DatePicker mode="range" value={range} onChange={setRange} placeholder="Selecione um intervalo" />
        </div>
      </ShowcaseSection>
    </>
  )
}
