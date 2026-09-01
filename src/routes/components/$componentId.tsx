import { createFileRoute, Link } from '@tanstack/react-router'
import { AlertV2, Icon, Button } from '@poliedro/tamentai/web'
import { ComponentPage } from '../../components/ComponentsGallery/ComponentPage'
import { getBySlug, getFirstSlug } from '../../components/ComponentsGallery/registry'
import styles from './componentId.module.css'

export const Route = createFileRoute('/components/$componentId')({
  component: ComponentDetailPage,
})

function ComponentDetailPage() {
  const { componentId } = Route.useParams()
  const entry = getBySlug(componentId)

  if (!entry) {
    return (
      <div className={styles.notFound}>
        <AlertV2.Root type="soft" color="yellow">
          <AlertV2.Icon>
            <Icon name="TriangleAlert" size={20} />
          </AlertV2.Icon>
          <AlertV2.Content>
            <AlertV2.Title>Componente não encontrado</AlertV2.Title>
            <AlertV2.Description>
              Não existe um componente com o identificador "{componentId}". Use o menu
              lateral para escolher um componente disponível.
            </AlertV2.Description>
            <AlertV2.Actions>
              <Link to="/components/$componentId" params={{ componentId: getFirstSlug() }}>
                <Button size="sm" variant="soft" color="primary">
                  Ir para o primeiro componente
                </Button>
              </Link>
            </AlertV2.Actions>
          </AlertV2.Content>
        </AlertV2.Root>
      </div>
    )
  }

  return <ComponentPage entry={entry} />
}
