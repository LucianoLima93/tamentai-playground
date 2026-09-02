import { createFileRoute } from '@tanstack/react-router'
import { FunnyPlayground } from '../FunnyPlayground'

export const Route = createFileRoute('/select-combobox')({
  component: SelectComboboxPage,
})

function SelectComboboxPage() {
  return <FunnyPlayground />
}
