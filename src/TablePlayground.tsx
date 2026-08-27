import { useEffect, useState, useCallback, useLayoutEffect } from 'react'
import {
  Table,
  useServerTable,
  Avatar,
  Badge,
  Progress,
} from '@poliedro/tamentai/web'
import type { HeaderProps, HeaderActionProps, RowActionsProps, ServerTableResponse } from '@poliedro/tamentai/web'
import { useGlobalToast } from './contexts/ToastContext'

/* ─────────────────── Types ─────────────────── */

interface PokemonStat {
  base_stat: number
  stat: { name: string }
}

interface PokemonType {
  type: { name: string }
}

interface PokemonAbility {
  ability: { name: string }
  is_hidden: boolean
}

interface PokemonRaw {
  id: number
  name: string
  sprites: { front_default: string }
  types: PokemonType[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  base_experience: number
  height: number
  weight: number
}

interface PokemonRow {
  id: number
  name: string
  sprite: string
  types: { value: string; color: string }[]
  hp: number
  attack: number
  defense: number
  spAtk: number
  spDef: number
  speed: number
  baseXP: number
  height: string
  weight: string
  abilities: string
}

/* ─────────────────── Helpers ─────────────────── */

const TYPE_COLORS: Record<string, string> = {
  grass: 'green',
  fire: 'red',
  water: 'blue',
  electric: 'yellow',
  poison: 'dark',
  ghost: 'dark',
  dark: 'dark',
  bug: 'green',
  ice: 'blue',
  dragon: 'red',
  fighting: 'red',
  normal: 'gray',
  fairy: 'red',
  psychic: 'red',
  rock: 'gray',
  ground: 'yellow',
  steel: 'gray',
  flying: 'blue',
}

function getStatValue(stats: PokemonStat[], statName: string): number {
  return stats.find((s) => s.stat.name === statName)?.base_stat ?? 0
}

function transformPokemon(raw: PokemonRaw): PokemonRow {
  return {
    id: raw.id,
    name: raw.name.charAt(0).toUpperCase() + raw.name.slice(1),
    sprite: raw.sprites.front_default,
    types: raw.types.map((t) => ({
      value: t.type.name,
      color: TYPE_COLORS[t.type.name] ?? 'gray',
    })),
    hp: getStatValue(raw.stats, 'hp'),
    attack: getStatValue(raw.stats, 'attack'),
    defense: getStatValue(raw.stats, 'defense'),
    spAtk: getStatValue(raw.stats, 'special-attack'),
    spDef: getStatValue(raw.stats, 'special-defense'),
    speed: getStatValue(raw.stats, 'speed'),
    baseXP: raw.base_experience,
    height: `${(raw.height / 10).toFixed(1)}m`,
    weight: `${(raw.weight / 10).toFixed(1)}kg`,
    abilities: raw.abilities
      .map((a) => (a.is_hidden ? `${a.ability.name} (hidden)` : a.ability.name))
      .join(', '),
  }
}

/* ─────────────────── Columns ─────────────────── */

const COLUMNS: HeaderProps<PokemonRow>[] = [
  {
    accessorKey: 'id',
    header: '#',
    enableEditing: false,
    enableSorting: true,
  },
  {
    accessorKey: 'sprite',
    header: 'Sprite',
    enableEditing: false,
    enableSorting: false,
    enableSearching: false,
    cell: ({ row }) => (
      <Avatar
        src={row.original.sprite}
        alt={row.original.name}
        size="sm"
        shape="circular"
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    enableEditing: true,
    enableSorting: true,
  },
  {
    accessorKey: 'types',
    header: 'Tipos',
    enableEditing: false,
    enableSorting: false,
    cell: ({ row }) => (
      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
        {row.original.types.map((t) => (
          <Badge
            key={t.value}
            color={t.color as any}
            shape="pilled"
            size="sm"
          >
            {t.value}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'hp',
    header: 'HP',
    enableEditing: false,
    enableSorting: true,
    cell: ({ row }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '80px' }}>
        <Progress value={(row.original.hp / 255) * 100} variant="linear" size="sm" />
        <span style={{ fontSize: '0.75rem', color: '#64748b', whiteSpace: 'nowrap' }}>{row.original.hp}</span>
      </div>
    ),
  },
  {
    accessorKey: 'attack',
    header: 'Atk',
    enableEditing: false,
    enableSorting: true,
  },
  {
    accessorKey: 'defense',
    header: 'Def',
    enableEditing: false,
    enableSorting: true,
  },
  {
    accessorKey: 'spAtk',
    header: 'Sp.Atk',
    enableEditing: false,
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: 'spDef',
    header: 'Sp.Def',
    enableEditing: false,
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: 'speed',
    header: 'Speed',
    enableEditing: false,
    enableSorting: true,
  },
  {
    accessorKey: 'baseXP',
    header: 'Base XP',
    enableEditing: false,
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: 'weight',
    header: 'Peso',
    enableEditing: false,
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: 'height',
    header: 'Altura',
    enableEditing: false,
    enableSorting: true,
    canHide: true,
  },
  {
    accessorKey: 'abilities',
    header: 'Habilidades',
    enableEditing: false,
    enableSorting: false,
    canHide: true,
  },
]

/* ─────────────────── Component ─────────────────── */

const TOTAL_POKEMON = 151
const PAGE_SIZE = 10

export function TablePlayground() {
  const { showToast } = useGlobalToast()
  const [tableData, setTableData] = useState<ServerTableResponse<PokemonRow> | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const { config, queryParams, selectedRows } = useServerTable<PokemonRow>({
    tableData,
    isLoading,
  })

  // Parse queryParams to extract pagination info
  const fetchData = useCallback(async (params: string) => {
    setIsLoading(true)

    // Parse the queryParams string from useServerTable
    // Format: page=1&pageSize=10 (page is 1-based)
    const searchParams = new URLSearchParams(params)
    const page = Number.parseInt(searchParams.get('page') ?? '1', 10)
    const pageSize = Number.parseInt(searchParams.get('pageSize') ?? String(PAGE_SIZE), 10)

    const offset = (page - 1) * pageSize
    const limit = pageSize

    try {
      // Fetch the list with pagination
      const listRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      )
      const listData = await listRes.json()

      // Fetch details for each Pokémon on this page
      const details: PokemonRaw[] = await Promise.all(
        listData.results.map(async (p: { url: string }) => {
          const res = await fetch(p.url)
          return res.json()
        })
      )

      const rows = details.map(transformPokemon)

      setTableData({
        data: rows,
        meta: {
          total: TOTAL_POKEMON,
          page: page,
          pageSize: pageSize,
        },
      })
    } catch (err) {
      console.error('Failed to fetch Pokémon data:', err)
      setTableData({ data: [], meta: { total: 0 } })
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Re-fetch when queryParams change (pagination, sorting, filtering)
  useEffect(() => {
    fetchData(queryParams)
  }, [queryParams, fetchData])

  // Set initial page size to PAGE_SIZE
  useLayoutEffect(() => {
    config.setTableState((prev) => ({
      ...prev,
      pagination: {
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      },
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ─── Actions ─── */

  const headerActions: HeaderActionProps<PokemonRow>[] = [
    {
      id: 'team',
      label: 'Adicionar ao Time',
      icon: 'Star',
      fnAction: (rows) => {
        const names = rows.map((r) => r.name).join(', ')
        showToast({
          title: 'Time Atualizado!',
          description: `${rows.length} Pokémon adicionados: ${names}`,
          type: 'success',
          duration: 4000,
        })
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
        a.download = 'pokemon-selection.json'
        a.click()
        URL.revokeObjectURL(url)

        showToast({
          title: 'Download Iniciado',
          description: `${rows.length} Pokémon exportados como JSON.`,
          type: 'info',
          duration: 3000,
        })
      },
    },
  ]

  const rowActions: RowActionsProps<PokemonRow> = {
    hasEdit: true,
    hasSave: true,
    hasCancel: true,
    hasDelete: true,
    customActions: [
      {
        id: 'capture',
        label: 'Capturar',
        icon: 'Target',
        fnAction: (row) => {
          const success = Math.random() > 0.3
          if (success) {
            showToast({
              title: 'Capturado!',
              description: `${row.name} foi adicionado à sua coleção!`,
              type: 'success',
              duration: 3000,
            })
          } else {
            showToast({
              title: 'Escapou!',
              description: `${row.name} se libertou da Pokébola!`,
              type: 'error',
              duration: 3000,
            })
          }
        },
      },
      {
        id: 'details',
        label: 'Ver Detalhes',
        icon: 'Eye',
        fnAction: (row) => {
          showToast({
            title: row.name,
            description: `HP: ${row.hp} | Atk: ${row.attack} | Def: ${row.defense} | Speed: ${row.speed} | Habilidades: ${row.abilities}`,
            type: 'info',
            duration: 5000,
          })
        },
      },
    ],
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
          Pokédex Table
        </h1>
        <p style={{ color: '#64748b', margin: 0, fontSize: '1rem' }}>
          Tabela com dados de 151 Pokémon — paginação server-side, sorting, filtering, seleção, visibilidade de colunas, ações em lote e por linha, edição inline e download.
        </p>
        {selectedRows.length > 0 && (
          <p style={{ color: '#2563eb', marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
            {selectedRows.length} Pokémon selecionado(s)
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
          hasSorting: true,
          hasColumnVisibility: true,
          hasDownload: true,
          fnDownload: (rows) => {
            const json = JSON.stringify(rows, null, 2)
            const blob = new Blob([json], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'pokedex-data.json'
            a.click()
            URL.revokeObjectURL(url)
          },
          hasStripedRows: true,
          hasEditableRows: true,
          autoControl: false,
          emptyMessage: 'Nenhum Pokémon encontrado.',
        }}
      />
    </div>
  )
}
