import { Button, useToast } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const VARIANTS = ['success', 'warning', 'info', 'error', 'neutral'] as const
const APPEARANCES = ['solid', 'soft', 'white'] as const

export function ToastShowcase() {
  const { addToast } = useToast()

  return (
    <>
      <ShowcaseSection
        title="Variants"
        description="Clique para disparar um toast de cada status."
        layout="row"
      >
        {VARIANTS.map((variant) => (
          <Button
            key={variant}
            variant="outline"
            onClick={() =>
              addToast({
                variant,
                appearance: 'soft',
                title: `Toast ${variant}`,
                description: 'Notificação de exemplo disparada via useToast.',
              })
            }
          >
            {variant}
          </Button>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Appearances" layout="row">
        {APPEARANCES.map((appearance) => (
          <Button
            key={appearance}
            variant="outline"
            onClick={() =>
              addToast({
                variant: 'info',
                appearance,
                title: `Appearance ${appearance}`,
                description: 'Exemplo de aparência do toast.',
              })
            }
          >
            {appearance}
          </Button>
        ))}
      </ShowcaseSection>
    </>
  )
}
