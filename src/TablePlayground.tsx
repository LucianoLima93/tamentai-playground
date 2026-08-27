import { Badge, Button, Dialog, Progress, Table, useServerTable, type ActionEditingHelpers, type HeaderActionProps, type HeaderProps, type RowActionsProps, type ServerTableResponse } from '@poliedro/tamentai/web'
import { useEffect, useState, useCallback } from 'react'
// import {
//   Table,
//   useServerTable,
//   Badge,
//   Progress,
//   Dialog,
//   Button,
// } from './web'
// import type {
//   HeaderProps,
//   HeaderActionProps,
//   RowActionsProps,
//   ServerTableResponse,
//   ActionEditingHelpers,
// } from './web'

/* ─────────────────── Types ─────────────────── */

interface ProductRaw {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
  tags: string[]
  availabilityStatus: string
}

interface ProductRow {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
  tags: string[]
  availabilityStatus: string
}

interface DummyJsonResponse {
  products: ProductRaw[]
  total: number
  skip: number
  limit: number
}

interface CategoryItem {
  slug: string
  name: string
}

/* ─────────────────── Helpers ─────────────────── */

const AVAILABILITY_COLORS: Record<string, string> = {
  'In Stock': 'green',
  'Low Stock': 'yellow',
  'Out of Stock': 'red',
}

function transformProduct(raw: ProductRaw): ProductRow {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    category: raw.category,
    price: raw.price,
    discountPercentage: raw.discountPercentage,
    rating: raw.rating,
    stock: raw.stock,
    brand: raw.brand ?? 'N/A',
    thumbnail: raw.thumbnail,
    tags: raw.tags ?? [],
    availabilityStatus: raw.availabilityStatus ?? 'In Stock',
  }
}

/* ─────────────────── Columns ─────────────────── */

const COLUMNS: HeaderProps<ProductRow>[] = [
  {
    accessorKey: 'id',
    header: '#',
    enableEditing: false,
    enableSorting: true,
  },
  {
    accessorKey: 'thumbnail',
    header: 'Imagem',
    enableEditing: false,
    enableSorting: false,
    enableSearching: false,
    cell: ({ row }) => (
      <img src={row.original.thumbnail} alt={row.original.title} width={32} height={32} style={{ borderRadius: 4, objectFit: 'cover' }} />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Produto',
    enableEditing: true,
    enableSorting: true,
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    enableEditing: false,
    enableSorting: true,
    cell: ({ row }) => (
      <Badge color="blue" shape="pilled" size="md">
        {row.original.category}
      </Badge>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Preco',
    enableEditing: false,
    enableSorting: true,
    cell: ({ row }) => (
      <span style={{ fontWeight: 600 }}>
        ${row.original.price.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: 'discountPercentage',
    header: 'Desconto',
    enableEditing: false,
    enableSorting: true,
    canHide: true,
    cell: ({ row }) => (
      <Badge
        color={row.original.discountPercentage > 10 ? 'green' : 'gray'}
        shape="pilled"
        size="md"
      >
        {row.original.discountPercentage.toFixed(1)}%
      </Badge>
    ),
  },
  {
    accessorKey: 'rating',
    header: 'Avaliacao',
    enableEditing: false,
    enableSorting: true,
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '100px' }}>
        <Progress value={(row.original.rating / 5) * 100} variant="linear" size="sm" />
        <span style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>
          {row.original.rating.toFixed(1)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
    enableEditing: false,
    enableSorting: true,
  },
  {
    accessorKey: 'availabilityStatus',
    header: 'Status',
    enableEditing: false,
    enableSorting: true,
    cell: ({ row }) => (
      <Badge
        color={(AVAILABILITY_COLORS[row.original.availabilityStatus] ?? 'gray') as any}
        shape="pilled"
        size="md"
      >
        {row.original.availabilityStatus}
      </Badge>
    ),
  },
  {
    accessorKey: 'brand',
    header: 'Marca',
    enableEditing: false,
    enableSorting: true,
    canHide: true,
  },
]

/* ─────────────────── Component ─────────────────── */

const PAGE_SIZE = 10

export default function TablePlayground() {
  const [tableData, setTableData] = useState<ServerTableResponse<ProductRow> | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  // ─── Delete confirmation state ───
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pendingDelete, setPendingDelete] = useState<{
    row: ProductRow
    helpers: ActionEditingHelpers
  } | null>(null)

  const handleDeleteRequest = (row: ProductRow, helpers: ActionEditingHelpers) => {
    setPendingDelete({ row, helpers })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (pendingDelete) {
      pendingDelete.helpers.deleteRow()
    }
    setDeleteDialogOpen(false)
    setPendingDelete(null)
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setPendingDelete(null)
  }

  const { config, queryParams, selectedRows } = useServerTable<ProductRow>({
    tableData,
    isLoading,
    initialState: {
      pagination: { pageSize: PAGE_SIZE, pageIndex: 0 },
    },
  })

  // ─── Fetch categories on mount ───
  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data: CategoryItem[]) => setCategories(data))
      .catch(console.error)
  }, [])

  // ─── Fetch products with server-side pagination, sorting, search, and category filter ───
  const fetchData = useCallback(async (params: string, category: string) => {
    setIsLoading(true)

    const searchParams = new URLSearchParams(params)
    const page = Number.parseInt(searchParams.get('page') ?? '1', 10)
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? String(PAGE_SIZE), 10)
    const search = searchParams.get('search') ?? ''
    const sortBy = searchParams.get('sortBy') ?? ''
    const sortOrder = searchParams.get('sortOrder') ?? ''

    const skip = (page - 1) * pageSize

    // Build the appropriate URL based on search/category
    let baseUrl: string

    if (search) {
      // Global search endpoint
      baseUrl = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
    } else if (category) {
      // Category filter endpoint
      baseUrl = `https://dummyjson.com/products/category/${encodeURIComponent(category)}?`
    } else {
      // Default products endpoint
      baseUrl = 'https://dummyjson.com/products?'
    }

    // Add pagination params
    const separator = baseUrl.includes('?') ? '&' : '?'
    let url = `${baseUrl}${separator}limit=${pageSize}&skip=${skip}`

    // Add sorting params (DummyJSON uses `sortBy` and `order`)
    if (sortBy) {
      url += `&sortBy=${sortBy}&order=${sortOrder || 'asc'}`
    }

    try {
      const res = await fetch(url)
      const data: DummyJsonResponse = await res.json()

      const rows = data.products.map(transformProduct)

      setTableData({
        data: rows,
        total: data.total,
      })
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setTableData({ data: [], total: 0 })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Re-fetch when queryParams or selectedCategory change
  useEffect(() => {
    fetchData(queryParams, selectedCategory)
  }, [queryParams, selectedCategory, fetchData])

  // ─── Category change resets pagination ───
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    config.setTableState((prev) => ({
      ...prev,
      pagination: { pageIndex: 0, pageSize: prev.pagination?.pageSize ?? PAGE_SIZE },
    }))
  }

  // ─── Header Actions (batch actions) ───
  const headerActions: HeaderActionProps<ProductRow>[] = [
    {
      id: 'addToCart',
      label: 'Adicionar ao Carrinho',
      icon: 'ShoppingCart',
      fnAction: (rows) => {
        const names = rows.map((r) => r.title).join(', ')
        alert(`${rows.length} produto(s) adicionados ao carrinho: ${names}`)
      },
    },
    {
      id: 'export',
      label: 'Exportar Selecionados',
      icon: 'Download',
      fnAction: (rows) => {
        const json = JSON.stringify(rows, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'products-selection.json'
        a.click()
        URL.revokeObjectURL(url)
      },
    },
  ]

  // ─── Row Actions (per-row actions) ───
  const rowActions: RowActionsProps<ProductRow> = {
    hasEdit: true,
    hasSave: true,
    hasCancel: true,
    hasDelete: true,
    fnDelete: (row, helpers) => handleDeleteRequest(row, helpers),
    customActions: [
      {
        id: 'view',
        label: 'Ver Detalhes',
        icon: 'Eye',
        fnAction: (row) => {
          alert(
            `${row.title}\n\n` +
            `Categoria: ${row.category}\n` +
            `Preco: $${row.price.toFixed(2)}\n` +
            `Rating: ${row.rating}/5\n` +
            `Estoque: ${row.stock}\n` +
            `Marca: ${row.brand}\n` +
            `Desconto: ${row.discountPercentage}%`
          )
        },
      },
      {
        id: 'buy',
        label: 'Comprar',
        icon: 'ShoppingCart',
        fnAction: (row) => {
          alert(`Compra simulada: ${row.title} por $${row.price.toFixed(2)}`)
        },
      },
    ],
  }

  // ─── Render ───
  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
          Product Catalog
        </h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '1rem' }}>
          Tabela com dados da DummyJSON — paginacao server-side, sorting, busca global, filtro por categoria, selecao, edicao inline e acoes.
        </p>

        {/* Category Filter */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label
            htmlFor="category-filter"
            style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}
          >
            Filtrar por categoria:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid #d1d5db',
              fontSize: '0.875rem',
              color: '#374151',
              background: '#fff',
              minWidth: '200px',
            }}
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
          {selectedCategory && (
            <button
              onClick={() => handleCategoryChange('')}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #d1d5db',
                background: '#f9fafb',
                fontSize: '0.75rem',
                cursor: 'pointer',
                color: '#6b7280',
              }}
            >
              Limpar filtro
            </button>
          )}
        </div>

        {selectedRows.length > 0 && (
          <p style={{ color: '#2563eb', marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            {selectedRows.length} produto(s) selecionado(s)
          </p>
        )}
      </div>

      <Table
        config={config}
        header={COLUMNS}
        headerActions={headerActions}
        rowActions={rowActions}
        options={{
          hasPagination: true,
          paginationVariant: 'bordered-navigation',
          paginationLayout: 'compact',
          paginationShape: 'rounded',
          hasRowSelect: true,
          hasFilter: true,
          searchMode: 'global',
          hasSorting: true,
          hasColumnVisibility: true,
          hasDownload: true,
          fnDownload: (rows) => {
            const json = JSON.stringify(rows, null, 2)
            const blob = new Blob([json], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'products-data.json'
            a.click()
            URL.revokeObjectURL(url)
          },
          hasStripedRows: true,
          hasEditableRows: true,
          autoControl: false,
          loadingVariant: 'skeleton',
          emptyMessage: 'Nenhum produto encontrado.',
        }}
      />

      {/* ─── Delete Confirmation Dialog ─── */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        title="Deseja excluir este item?"
        size="sm"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', width: '100%' }}>
            <Button
              variant="outline"
              color="secondary"
              size="sm"
              onClick={handleDeleteCancel}
            >
              Cancelar
            </Button>
            <Button
              color="destructive"
              size="sm"
              onClick={handleDeleteConfirm}
            >
              Excluir
            </Button>
          </div>
        }
      >
        {pendingDelete && (
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
            Você está prestes a excluir &quot;{pendingDelete.row.title}&quot; (ID: {pendingDelete.row.id}). Esta ação é irreversível e o item será removido permanentemente.
          </p>
        )}
      </Dialog>
    </div>
  )
}
