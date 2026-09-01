import { Input } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

/**
 * FieldBase é a base de composição de campos (label, feedback, required).
 * Como não é usado diretamente no dia a dia, demonstramos seus recursos
 * através do Input, que consome o Field internamente.
 */
export function FieldShowcase() {
  return (
    <>
      <ShowcaseSection
        title="Label e obrigatoriedade"
        description="Field padroniza label, label secundário e indicador de obrigatório."
        layout="stack"
      >
        <Input label="Nome" placeholder="Seu nome" />
        <Input label="E-mail" secondaryLabel="Opcional" placeholder="voce@exemplo.com" />
        <Input label="Senha" required placeholder="••••••••" type="password" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Feedback e estados"
        description="O tipo do feedback é derivado de invalid/success."
        layout="stack"
      >
        <Input label="Inválido" invalid feedbackMessage="Este campo é obrigatório" />
        <Input label="Sucesso" success feedbackMessage="Disponível" defaultValue="ok" />
        <Input label="Desabilitado" disabled placeholder="Indisponível" />
      </ShowcaseSection>
    </>
  )
}
