import { InputGroup, Input, Icon, Button } from '@poliedro/tamentai/web'

const VerticalItens = ({error = false}: {error?: boolean}) => (
  <>
    <Input
      rounded='top'
      variant="bordered"
      placeholder='Website'
      startIcon="http://"
      startDivider
      startBackgroundColor
    />
    <Input
      rounded='none'
      variant="bordered"
      placeholder='Mail'
      startIcon={<Icon name='Mail' />}
      startDivider
      startBackgroundColor
      invalid={error}
    />
    <Input
      rounded='bottom'
      variant="bordered"
      placeholder='Search'
      endIcon={<Icon name='Search' />}
      endDivider
      endBackgroundColor
      />
  </>
)

export const ExampleV1 = () => {
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <InputGroup width="100%" layout="vertical" gap="none">
        <VerticalItens />
      </InputGroup>
      <InputGroup width="100%" layout="vertical" gap="sm">
        <VerticalItens />
      </InputGroup>
      <InputGroup width="100%" layout="vertical" gap="md">
        <VerticalItens />
      </InputGroup>
      <InputGroup width="100%" layout="vertical" gap="lg">
        <VerticalItens />
      </InputGroup>
    </div>
  )
}

export const ExampleV2 = () => {
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'row', gap: '1rem' }}>
      <InputGroup width="100%" layout="vertical" gap="sm">
        <VerticalItens />
      </InputGroup>
      <InputGroup
        width="100%"
        layout="vertical"
        gap="md"
        feedbackType="error"
        feedbackMessage="This is an error message with a long text to test the feedback message"
      >
        <VerticalItens error />
      </InputGroup>
      <InputGroup width="100%" layout="vertical" gap="lg">
        <VerticalItens />
      </InputGroup>
    </div>
  )
}

export const ExampleV3 = () => {
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputGroup
        width="250px"
        layout="vertical"
        gap="none"
      >
        <Button
          rounded='top'
          leftIcon={<Icon name='Search' />}
          variant='solid'
          size='md'
          fullWidth
        >
          Search
        </Button>
        <Input
          rounded='none'
          variant="bordered"
          placeholder='Full Name'

        />
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
          <Button
            rounded='bottom'
            leftIcon={<Icon name='Check' />}
            variant='solid'
            color='primary'
            size='md'
            fullWidth
          >
            Confirm
          </Button>
      </InputGroup>
    </div>
  )
}
