import { Select, Combobox } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
]

const TYPES = ['bordered', 'gray', 'underline', 'ghost'] as const
const SIZES = ['sm', 'md', 'lg'] as const

export function SelectShowcase() {
  return (
    <>
      <ShowcaseSection title="Types" description="Tratamento da superfície." layout="stack">
        {TYPES.map((type) => (
          <div key={type} style={{ maxWidth: 320 }}>
            <Select options={options} type={type} placeholder={type} />
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="stack">
        {SIZES.map((size) => (
          <div key={size} style={{ maxWidth: 320 }}>
            <Select options={options} size={size} placeholder={size} />
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Recursos" layout="stack">
        <div style={{ maxWidth: 320 }}>
          <Select options={options} searchable placeholder="Com busca" />
        </div>
        <div style={{ maxWidth: 320 }}>
          <Select options={options} multiple placeholder="Múltipla escolha" />
        </div>
        <div style={{ maxWidth: 320 }}>
          <Select options={options} invalid feedbackMessage="Selecione uma opção" placeholder="Inválido" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Combobox"
        description="Padrão combobox com filtro de digitação."
        layout="stack"
      >
        <div style={{ maxWidth: 320 }}>
          <Combobox options={options} placeholder="Digite para filtrar..." clearable />
        </div>
      </ShowcaseSection>
    </>
  )
}
