import { Table, useServerTable } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

interface Person {
  id: number
  name: string
  role: string
  status: string
}

const data: Person[] = [
  { id: 1, name: 'Ana Souza', role: 'Designer', status: 'Ativo' },
  { id: 2, name: 'Bruno Lima', role: 'Engenheiro', status: 'Ativo' },
  { id: 3, name: 'Carla Dias', role: 'Produto', status: 'Inativo' },
  { id: 4, name: 'Diego Alves', role: 'Engenheiro', status: 'Ativo' },
  { id: 5, name: 'Elisa Rocha', role: 'Designer', status: 'Inativo' },
]

const columns = [
  { header: 'Nome', accessorKey: 'name', enableSorting: true },
  { header: 'Cargo', accessorKey: 'role' },
  { header: 'Status', accessorKey: 'status' },
]

export function TableShowcase() {
  const { config } = useServerTable<Person>({ tableData: data, isLoading: false })

  return (
    <ShowcaseSection
      title="Tabela de dados"
      description="Colunas, ordenação e paginação client-side via useServerTable."
      layout="stack"
    >
      <div style={{ width: '100%' }}>
        <Table
          config={config}
          header={columns}
          options={{ autoControl: true, hasPagination: true, hasSorting: true }}
        />
      </div>
    </ShowcaseSection>
  )
}
