import { Input, Icon } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const VARIANTS = ['bordered', 'gray', 'underline'] as const
const SIZES = ['sm', 'md', 'lg'] as const
const SHAPES = ['rounded', 'none', 'pilled'] as const

export function InputShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" description="Tratamento da superfície do campo." layout="stack">
        <PropMatrix
          values={VARIANTS}
          render={(variant) => <Input variant={variant} placeholder={variant} />}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="stack">
        <PropMatrix values={SIZES} render={(size) => <Input size={size} placeholder={size} />} />
      </ShowcaseSection>

      <ShowcaseSection title="Shapes" layout="stack">
        <PropMatrix values={SHAPES} render={(shape) => <Input shape={shape} placeholder={shape} />} />
      </ShowcaseSection>

      <ShowcaseSection title="Com ícones / afixos" layout="stack">
        <Input placeholder="Buscar" startIcon={<Icon name="Search" size={16} />} />
        <Input placeholder="Valor" startIcon="R$" startDivider startBackgroundColor />
        <Input placeholder="Site" endIcon={<Icon name="ExternalLink" size={16} />} endDivider />
      </ShowcaseSection>

      <ShowcaseSection title="States" layout="stack">
        <Input label="Inválido" invalid feedbackMessage="Valor inválido" />
        <Input label="Sucesso" success feedbackMessage="Disponível" defaultValue="ok" />
        <Input label="Desabilitado" disabled placeholder="Indisponível" />
        <Input label="Somente leitura" readOnly defaultValue="Somente leitura" />
      </ShowcaseSection>
    </>
  )
}
