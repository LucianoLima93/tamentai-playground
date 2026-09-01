import { Textarea } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['bordered', 'gray', 'underline'] as const
const SIZES = ['sm', 'md', 'lg'] as const

export function TextareaShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="stack">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => <Textarea variant={variant} placeholder={variant} rows={3} />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="stack">
        <PropMatrix
          values={SIZES}
          render={(size) => <Textarea size={size} placeholder={size} rows={3} />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Recursos e estados" layout="stack">
        <Textarea label="Com contador" showCount maxLength={120} rows={3} placeholder="Digite..." />
        <Textarea label="Inválido" invalid feedbackMessage="Campo obrigatório" rows={3} />
        <Textarea label="Sucesso" success feedbackMessage="Ok" rows={3} defaultValue="Tudo certo" />
      </ShowcaseSection>
    </>
  )
}
