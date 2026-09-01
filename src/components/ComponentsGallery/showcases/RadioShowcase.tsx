import { Radio } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const SIZES = ['sm', 'md'] as const
const TYPES = ['solid', 'soft'] as const

export function RadioShowcase() {
  return (
    <>
      <ShowcaseSection title="Types" layout="row">
        <PropMatrix
          values={TYPES}
          render={(type) => <Radio name={`type-${type}`} type={type} label="Opção" defaultChecked />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="row">
        <PropMatrix
          values={SIZES}
          render={(size) => <Radio name={`size-${size}`} size={size} label="Opção" defaultChecked />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="States" layout="stack">
        <Radio name="states" label="Padrão" />
        <Radio name="states-checked" label="Selecionado" checked readOnly />
        <Radio name="states-disabled" label="Desabilitado" disabled />
        <Radio name="states-invalid" label="Inválido" invalid feedbackMessage="Selecione uma opção" />
        <Radio name="states-success" label="Sucesso" success checked readOnly feedbackMessage="Ok" />
      </ShowcaseSection>
    </>
  )
}
