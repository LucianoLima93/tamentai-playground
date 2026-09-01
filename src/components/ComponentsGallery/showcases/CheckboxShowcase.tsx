import { Checkbox } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const TYPES = ['solid', 'soft'] as const

export function CheckboxShowcase() {
  return (
    <>
      <ShowcaseSection title="Types" description="Preenchimento quando marcado." layout="row">
        <PropMatrix
          values={TYPES}
          render={(type) => <Checkbox type={type} label="Aceito os termos" defaultChecked />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="States" layout="stack">
        <Checkbox label="Padrão" />
        <Checkbox label="Marcado" defaultChecked />
        <Checkbox label="Indeterminado" indeterminate />
        <Checkbox label="Desabilitado" disabled />
        <Checkbox label="Inválido" invalid feedbackMessage="Campo obrigatório" />
        <Checkbox label="Sucesso" success defaultChecked feedbackMessage="Tudo certo" />
      </ShowcaseSection>

      <ShowcaseSection title="Layout" description="Com descrição, boxed e invertido." layout="stack">
        <Checkbox label="Com descrição" description="Texto secundário abaixo do label" />
        <Checkbox label="Boxed" description="Envolvido em um card" boxed />
        <Checkbox label="Invertido (reversed)" reversed />
      </ShowcaseSection>
    </>
  )
}
