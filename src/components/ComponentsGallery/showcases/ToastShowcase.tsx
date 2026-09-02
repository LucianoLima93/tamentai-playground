import { Button, Text } from '@poliedro/tamentai/web'
import { useGlobalToast } from '../../../contexts/ToastContext'
import type { ToastType } from '../../../contexts/ToastContext'
import { ShowcaseSection } from '../ShowcaseSection'

const TYPES: ToastType[] = ['info', 'success', 'warning', 'error']

export function ToastShowcase() {
  const { showToast } = useGlobalToast()

  return (
    <>
      <ShowcaseSection
        title="Types"
        description="Clique para disparar um toast de cada status. Usa o ToastProvider da aplicação (useGlobalToast)."
        layout="row"
      >
        {TYPES.map((type) => (
          <Button
            key={type}
            variant="outline"
            onClick={() =>
              showToast({
                type,
                title: `Toast ${type}`,
                description: 'Notificação de exemplo disparada pela galeria.',
              })
            }
          >
            {type}
          </Button>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Com ação" layout="row">
        <Button
          variant="outline"
          onClick={() =>
            showToast({
              type: 'info',
              title: 'Item arquivado',
              description: 'Você pode desfazer esta ação.',
              action: 'Desfazer',
              onAction: () => showToast({ type: 'success', description: 'Ação desfeita.' }),
            })
          }
        >
          Toast com ação
        </Button>
      </ShowcaseSection>

      <Text as="p" variant="body-sm" color="muted">
        Observação: este playground usa o ToastProvider próprio da aplicação
        (src/contexts/ToastContext). O hook useToast do Tamentai exige o
        Toast.Provider do Base UI, que não está montado aqui.
      </Text>
    </>
  )
}
