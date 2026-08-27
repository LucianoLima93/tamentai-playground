import { useRef, useEffect } from 'react'
import { Badge, Spinner } from '@poliedro/tamentai/web'
import { useCategories } from '../../hooks/useDummyJson'

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({ selected, onSelect }: Readonly<CategoryFilterProps>) {
  const { data: categories, loading } = useCategories()
  const activeRef = useRef<HTMLButtonElement>(null)

  // Scroll the selected category into view when the selection changes
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }
  }, [selected, categories])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
        <Spinner />
      </div>
    )
  }

  if (!categories) return null

  return (
    <fieldset
      style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        padding: '0.5rem 0',
        scrollbarWidth: 'thin',
        border: 'none',
        margin: 0,
      }}
      aria-label="Filtrar por categoria"
    >
      {/* Custom: Tamentai Badge is non-interactive; unstyled button provides a11y click target */}
      <button
        type="button"
        ref={selected === null ? activeRef : undefined}
        onClick={() => onSelect(null)}
        style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex' }}
      >
        <Badge
          variant={selected === null ? 'solid' : 'soft'}
          color={selected === null ? 'blue' : 'gray'}
          shape="pilled"
        >
          Todos
        </Badge>
      </button>

      {categories.map(cat => (
        <button
          type="button"
          key={cat.slug}
          ref={selected === cat.slug ? activeRef : undefined}
          onClick={() => onSelect(cat.slug)}
          style={{ all: 'unset', cursor: 'pointer', display: 'inline-flex', whiteSpace: 'nowrap' }}
        >
          <Badge
            variant={selected === cat.slug ? 'solid' : 'soft'}
            color={selected === cat.slug ? 'blue' : 'gray'}
            shape="pilled"
          >
            {cat.name}
          </Badge>
        </button>
      ))}
    </fieldset>
  )
}
