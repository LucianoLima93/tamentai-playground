import {
  Card,
  CardRoot,
  CardBody,
  CardTitle,
  CardDescription,
  CardActions,
  Button,
  Badge,
} from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

export function CardShowcase() {
  return (
    <>
      <ShowcaseSection
        title="Por props"
        description="Uso rápido via title, subtitle, footer e actions."
        layout="grid"
      >
        <Card
          title="Plano Pro"
          subtitle="Cobrança mensal"
          actions={<Badge color="green">Ativo</Badge>}
          footer={<Button size="sm">Gerenciar</Button>}
        >
          Acesso completo aos recursos do produto.
        </Card>

        <Card title="Compacto" size="compact">
          Uma variação com menos espaçamento interno.
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Por composição"
        description="Composição de subcomponentes para layout total."
        layout="grid"
      >
        <CardRoot>
          <CardBody>
            <CardTitle>Título via composição</CardTitle>
            <CardDescription>
              Montado com CardRoot, CardBody, CardTitle e CardActions.
            </CardDescription>
            <CardActions>
              <Button size="sm" variant="outline">
                Cancelar
              </Button>
              <Button size="sm">Confirmar</Button>
            </CardActions>
          </CardBody>
        </CardRoot>
      </ShowcaseSection>
    </>
  )
}
