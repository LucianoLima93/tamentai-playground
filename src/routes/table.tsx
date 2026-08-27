import { createFileRoute } from '@tanstack/react-router'
import TablePlayground from '../TablePlayground'

export const Route = createFileRoute('/table')({
  component: TablePlaygroundPage,
})

function TablePlaygroundPage() {
  return <TablePlayground />
}