import { SwitchGroup } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

export function SwitchGroupShowcase() {
  return (
    <ShowcaseSection
      title="Switch com label e descrição"
      description="Agrupa o Switch com label/descrição e feedback compartilhados."
      layout="stack"
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <SwitchGroup
          label="Notificações por e-mail"
          description="Receba um resumo diário das atividades."
          defaultChecked
        />
      </div>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <SwitchGroup
          label="Modo escuro"
          description="Ativa o tema escuro da interface."
          reversed
        />
      </div>
    </ShowcaseSection>
  )
}
