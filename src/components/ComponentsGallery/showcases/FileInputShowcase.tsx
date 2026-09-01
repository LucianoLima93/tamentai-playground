import { FileInput } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['bordered', 'gray', 'underline'] as const

export function FileInputShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="stack">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => <FileInput variant={variant} placeholder="Selecionar arquivo" />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Estados e opções" layout="stack">
        <FileInput label="Múltiplos arquivos" multiple placeholder="Selecionar arquivos" />
        <FileInput label="Inválido" invalid feedbackMessage="Arquivo obrigatório" />
        <FileInput label="Sucesso" success feedbackMessage="Enviado" />
        <FileInput label="Desabilitado" disabled />
      </ShowcaseSection>
    </>
  )
}
