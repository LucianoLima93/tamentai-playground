import { Timeline, TimelineItem } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

export function TimelineShowcase() {
  return (
    <>
      <ShowcaseSection title="Vertical" description="Marcadores por status." layout="stack">
        <Timeline aria-label="Histórico do pedido">
          <TimelineItem status="completed" date="09:00" title="Pedido criado" description="Recebemos seu pedido." />
          <TimelineItem status="completed" date="10:30" title="Pagamento aprovado" />
          <TimelineItem status="active" date="14:00" title="Em separação" description="Preparando os itens." />
          <TimelineItem status="default" date="—" title="Enviado" />
          <TimelineItem status="error" date="—" title="Falha na entrega" description="Endereço não encontrado." />
        </Timeline>
      </ShowcaseSection>

      <ShowcaseSection title="Horizontal" layout="stack">
        <Timeline orientation="horizontal" aria-label="Etapas">
          <TimelineItem status="completed" title="Etapa 1" />
          <TimelineItem status="active" title="Etapa 2" />
          <TimelineItem status="default" title="Etapa 3" />
        </Timeline>
      </ShowcaseSection>
    </>
  )
}
