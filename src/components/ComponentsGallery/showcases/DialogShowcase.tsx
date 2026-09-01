import { useState } from 'react'
import { Dialog, Button, Text } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const SIZES = ['sm', 'md', 'lg', 'full'] as const

export function DialogShowcase() {
  const [openSize, setOpenSize] = useState<(typeof SIZES)[number] | null>(null)

  return (
    <ShowcaseSection
      title="Sizes"
      description="Clique para abrir o modal em cada preset de largura."
      layout="row"
    >
      {SIZES.map((size) => (
        <Button key={size} variant="outline" onClick={() => setOpenSize(size)}>
          {size}
        </Button>
      ))}

      {SIZES.map((size) => (
        <Dialog
          key={size}
          open={openSize === size}
          onClose={() => setOpenSize(null)}
          size={size}
          title={`Modal ${size}`}
          description="Exemplo de diálogo do design system."
          onConfirm={() => setOpenSize(null)}
        >
          <Text as="p" variant="body">
            Conteúdo rolável do corpo do diálogo. O header e o footer permanecem fixos.
          </Text>
        </Dialog>
      ))}
    </ShowcaseSection>
  )
}
