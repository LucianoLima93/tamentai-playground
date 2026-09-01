import { SelectGroup, Select } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const dias = Array.from({ length: 5 }, (_, i) => ({ value: `${i + 1}`, label: `${i + 1}` }))
const meses = [
  { value: 'jan', label: 'Jan' },
  { value: 'fev', label: 'Fev' },
  { value: 'mar', label: 'Mar' },
]
const anos = [
  { value: '2024', label: '2024' },
  { value: '2025', label: '2025' },
]

export function SelectGroupShowcase() {
  return (
    <ShowcaseSection
      title="Selects agrupados"
      description="Compartilham layout e espaçamento, como o InputGroup."
      layout="stack"
    >
      <SelectGroup width="100%" layout="horizontal" gap="none">
        <Select options={dias} placeholder="Dia" rounded="start" />
        <Select options={meses} placeholder="Mês" rounded="none" />
        <Select options={anos} placeholder="Ano" rounded="end" />
      </SelectGroup>
    </ShowcaseSection>
  )
}
