import { InputGroup, Input, Icon, Button } from '@poliedro/tamentai/web'

const HorizontalItens = ({error = false}: {error?: boolean}) => (
  <>
    <Input
      rounded='start'
      variant="bordered"
      placeholder='Name'
      startIcon={<Icon name='User' />}
      startDivider
      startBackgroundColor
    />
    <Input
      rounded='none'
      variant="bordered"
      placeholder='Last Name'
      invalid={error}
    />
    <Input
      rounded='end'
      variant="bordered"
      placeholder='Mail'
      startIcon={<Icon name='Mail' />}
      startDivider
      startBackgroundColor
    />
  </>
)

export const ExampleH1 = () => {
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputGroup width="100%" layout="horizontal" gap="none">
        <HorizontalItens />
      </InputGroup>
      <InputGroup width="100%" layout="horizontal" gap="sm">
        <HorizontalItens />
      </InputGroup>
      <InputGroup width="100%" layout="horizontal" gap="md">
        <HorizontalItens />
      </InputGroup>
      <InputGroup width="100%" layout="horizontal" gap="lg">
        <HorizontalItens />
      </InputGroup>
    </div>
  )
}

export const ExampleH2 = () => {
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputGroup
        width="100%"
        layout="horizontal"
        gap="sm"
        feedbackType="error"
        feedbackMessage="This is an error message with a long text to test the feedback message"
      >
        <HorizontalItens error />
      </InputGroup>
    </div>
  )
}

export const ExampleH3 = () => {
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputGroup
        width="100%"
        layout="horizontal"
        gap="none"
      >
        <div style={{ width: '150px' }}>
          <Button
            rounded='start'
            leftIcon={<Icon name='Search' />}
            variant='solid'
            size='md'
            fullWidth
          >
            Search
          </Button>
        </div>
        <Input
          rounded='none'
          variant="bordered"
          placeholder='Full Name'

        />
        <div style={{ width: '150px' }}>
          <Button
            rounded='none'
            leftIcon={<Icon name='Trash' />}
            variant='solid'
            color='destructive'
            size='md'
            fullWidth
          >
            Delete
          </Button>
        </div>
        <div style={{ width: '150px' }}>
          <Button
            rounded='end'
            leftIcon={<Icon name='Check' />}
            variant='solid'
            color='primary'
            size='md'
            fullWidth
          >
            Confirm
          </Button>
        </div>
      </InputGroup>
    </div>
  )
}
