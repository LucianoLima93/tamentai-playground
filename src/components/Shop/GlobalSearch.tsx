import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Select } from '@poliedro/tamentai/web'
import { searchProducts } from '../../hooks/useDummyJson'

export function GlobalSearch() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!search.trim()) {
      setOptions([])
      return
    }

    setLoading(true)
    const timer = setTimeout(() => {
      searchProducts(search, 6)
        .then(data => {
          const opts = data.products.map(p => ({
            value: String(p.id),
            label: p.title,
          }))
          setOptions(opts)
          setLoading(false)
        })
        .catch(() => {
          setOptions([])
          setLoading(false)
        })
    }, 400)

    return () => clearTimeout(timer)
  }, [search])

  const handleSelect = (value: string | string[] | null) => {
    const id = Array.isArray(value) ? value[0] : value
    if (id) {
      navigate({ to: '/shop/product/$productId', params: { productId: id } })
      setSearch('')
      setOptions([])
    }
  }

  return (
    <div style={{ width: '260px' }}>
      <Select
        label=""
        placeholder="Buscar produtos..."
        options={options}
        searchable
        searchValue={search}
        onSearchChange={setSearch}
        disableInternalSearch
        loading={loading}
        onValueChange={handleSelect}
        searchPlaceholder="Ex: phone, laptop..."
        emptyMessage={search ? 'Nenhum resultado.' : 'Digite para buscar...'}
        size="sm"
      />
    </div>
  )
}
