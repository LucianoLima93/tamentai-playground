import { useState, useEffect, useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Select, Switch, TitleV2 } from '@poliedro/tamentai/web'
import { fetchProducts } from '../../hooks/useDummyJson'
import { ProductGrid } from '../../components/Shop/ProductGrid'
import { CategoryFilter } from '../../components/Shop/CategoryFilter'
import { SearchBar } from '../../components/Shop/SearchBar'
import { useWishlist } from '../../contexts/WishlistContext'
import type { Product } from '../../types/product'
import styles from './Shop.module.css'

interface ShopSearch {
  favorites?: boolean;
  category?: string;
}

export const Route = createFileRoute('/shop/')({
  component: ShopIndexPage,
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    favorites: search.favorites === 'true' || search.favorites === true || undefined,
    category: typeof search.category === 'string' ? search.category : undefined,
  }),
})

const LIMIT = 12

const sortOptions = [
  { value: 'default', label: 'Padrão' },
  { value: 'price-asc', label: 'Preço: menor → maior' },
  { value: 'price-desc', label: 'Preço: maior → menor' },
  { value: 'rating-desc', label: 'Melhor avaliados' },
  { value: 'title-asc', label: 'A → Z' },
]

function ShopIndexPage() {
  const search = Route.useSearch()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [category, setCategory] = useState<string | null>(search.category ?? null)
  const [sort, setSort] = useState('default')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(search.favorites ?? false)
  const { items: wishlistItems } = useWishlist()

  // Sync local state when URL search params change (e.g. clicking header favorites or breadcrumb category)
  useEffect(() => {
    setShowFavoritesOnly(search.favorites ?? false)
  }, [search.favorites])

  useEffect(() => {
    setCategory(search.category ?? null)
  }, [search.category])

  const parseSortValue = (value: string) => {
    if (value === 'default') return { sortBy: undefined, order: undefined }
    const [sortBy, order] = value.split('-')
    return { sortBy, order: order as 'asc' | 'desc' }
  }

  const loadProducts = useCallback(async (reset: boolean) => {
    const currentSkip = reset ? 0 : skip
    if (reset) setLoading(true)
    else setLoadingMore(true)

    try {
      const { sortBy, order } = parseSortValue(sort)
      const data = await fetchProducts({
        limit: LIMIT,
        skip: currentSkip,
        category: category ?? undefined,
        sortBy,
        order,
      })

      if (reset) {
        setProducts(data.products)
        setSkip(LIMIT)
      } else {
        setProducts(prev => [...prev, ...data.products])
        setSkip(currentSkip + LIMIT)
      }
      setTotal(data.total)
    } catch {
      // silently handle
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [skip, category, sort])

  useEffect(() => {
    loadProducts(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sort])

  const handleLoadMore = () => {
    loadProducts(false)
  }

  const handleCategoryChange = (cat: string | null) => {
    setCategory(cat)
    setSkip(0)
  }

  const handleSortChange = (value: string | string[] | null) => {
    const v = Array.isArray(value) ? value[0] : value
    if (v) setSort(v)
  }

  const hasMore = products.length < total

  // When showing favorites, use the full wishlist (independent of pagination/category fetch),
  // optionally narrowed by the active category filter.
  let displayedProducts: Product[]
  if (showFavoritesOnly) {
    displayedProducts = category
      ? wishlistItems.filter(p => p.category === category)
      : wishlistItems
  } else {
    displayedProducts = products
  }

  let emptyMessage: string | undefined
  let emptyIcon: string | undefined
  if (showFavoritesOnly) {
    emptyIcon = '💔'
    if (category) {
      const categoryLabel = category.replaceAll('-', ' ')
      emptyMessage = `Nenhum produto favorito na categoria "${categoryLabel}"`
    } else {
      emptyMessage = 'Nenhum produto favorito encontrado'
    }
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerRow}>
        <TitleV2 variant="h2" weight="bold">Shop</TitleV2>
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </div>

      {/* Filters row */}
      <div className={styles.filtersRow}>
        <div className={styles.categoryWrapper}>
          <CategoryFilter selected={category} onSelect={handleCategoryChange} />
        </div>
        <div className={styles.controlsRow}>
          <label className={styles.favoritesLabel}>
            <Switch checked={showFavoritesOnly} onCheckedChange={setShowFavoritesOnly} />
            Favoritos
          </label>
          <div className={styles.sortWrapper}>
            <Select
              label=""
              placeholder="Ordenar por"
              options={sortOptions}
              value={sort}
              onValueChange={handleSortChange}
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid
        products={displayedProducts}
        loading={loading && !showFavoritesOnly}
        hasMore={hasMore && !showFavoritesOnly}
        onLoadMore={handleLoadMore}
        loadingMore={loadingMore}
        emptyMessage={emptyMessage}
        emptyIcon={emptyIcon}
      />
    </div>
  )
}
