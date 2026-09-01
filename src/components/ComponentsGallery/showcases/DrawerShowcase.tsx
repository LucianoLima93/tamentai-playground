import { useState } from 'react'
import { Drawer, Button, Text } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const POSITIONS = ['left', 'right', 'top', 'bottom'] as const

export function DrawerShowcase() {
  const [openPos, setOpenPos] = useState<(typeof POSITIONS)[number] | null>(null)

  return (
    <ShowcaseSection
      title="Positions"
      description="O painel desliza a partir da borda escolhida."
      layout="row"
    >
      {POSITIONS.map((position) => (
        <Button key={position} variant="outline" onClick={() => setOpenPos(position)}>
          {position}
        </Button>
      ))}

      {POSITIONS.map((position) => (
        <Drawer
          key={position}
          open={openPos === position}
          onClose={() => setOpenPos(null)}
          position={position}
          title={`Drawer ${position}`}
          footer={<Button onClick={() => setOpenPos(null)}>Fechar</Button>}
        >
          <Text as="p" variant="body">
            Conteúdo do drawer deslizando a partir da borda "{position}".
          </Text>
        </Drawer>
      ))}
    </ShowcaseSection>
  )
}
