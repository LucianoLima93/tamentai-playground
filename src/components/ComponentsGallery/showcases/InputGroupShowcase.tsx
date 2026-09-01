import { InputGroup, Input, Icon } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

export function InputGroupShowcase() {
  return (
    <>
      <ShowcaseSection title="Horizontal" description="Inputs unidos numa linha." layout="stack">
        <InputGroup width="100%" layout="horizontal" gap="none">
          <Input rounded="start" variant="bordered" placeholder="Nome" startIcon={<Icon name="User" size={16} />} startDivider />
          <Input rounded="none" variant="bordered" placeholder="Sobrenome" />
          <Input rounded="end" variant="bordered" placeholder="E-mail" startIcon={<Icon name="Mail" size={16} />} startDivider />
        </InputGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Vertical" layout="stack">
        <InputGroup width="100%" layout="vertical" gap="none">
          <Input rounded="top" variant="bordered" placeholder="Usuário" />
          <Input rounded="bottom" variant="bordered" placeholder="Senha" type="password" />
        </InputGroup>
      </ShowcaseSection>

      <ShowcaseSection title="Com feedback" layout="stack">
        <InputGroup width="100%" layout="horizontal" gap="sm" feedbackType="error" feedbackMessage="Verifique os campos">
          <Input variant="bordered" placeholder="Campo A" invalid />
          <Input variant="bordered" placeholder="Campo B" />
        </InputGroup>
      </ShowcaseSection>
    </>
  )
}
