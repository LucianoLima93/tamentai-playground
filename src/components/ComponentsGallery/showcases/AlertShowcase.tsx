import { AlertV2, Icon, Button } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const COLORS = ['gray', 'green', 'blue', 'red', 'yellow'] as const

export function AlertShowcase() {
  return (
    <>
      <ShowcaseSection title="Colors (type soft)" description="API composta AlertV2.*." layout="stack">
        {COLORS.map((color) => (
          <AlertV2.Root key={color} type="soft" color={color}>
            <AlertV2.Icon>
              <Icon name="Info" size={20} />
            </AlertV2.Icon>
            <AlertV2.Content>
              <AlertV2.Title>Alerta {color}</AlertV2.Title>
              <AlertV2.Description>
                Mensagem de alerta usando a cor {color}.
              </AlertV2.Description>
            </AlertV2.Content>
          </AlertV2.Root>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Types" description="solid, soft e white." layout="stack">
        {(['solid', 'soft', 'white'] as const).map((type) => (
          <AlertV2.Root key={type} type={type} color="blue">
            <AlertV2.Icon>
              <Icon name="Info" size={20} />
            </AlertV2.Icon>
            <AlertV2.Content>
              <AlertV2.Title>Tipo {type}</AlertV2.Title>
              <AlertV2.Description>Exemplo de tratamento visual {type}.</AlertV2.Description>
            </AlertV2.Content>
          </AlertV2.Root>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Com ações e fechamento" layout="stack">
        <AlertV2.Root type="soft" color="green">
          <AlertV2.Icon>
            <Icon name="CircleCheck" size={20} />
          </AlertV2.Icon>
          <AlertV2.Content>
            <AlertV2.Title>Salvo com sucesso</AlertV2.Title>
            <AlertV2.Description>Suas alterações foram salvas.</AlertV2.Description>
            <AlertV2.Actions>
              <Button size="sm" variant="soft" color="primary">
                Ver detalhes
              </Button>
            </AlertV2.Actions>
          </AlertV2.Content>
          <AlertV2.Close aria-label="Fechar alerta" />
        </AlertV2.Root>
      </ShowcaseSection>
    </>
  )
}
