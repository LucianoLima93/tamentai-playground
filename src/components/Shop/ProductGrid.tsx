import { Spinner, Button } from '@poliedro/tamentai/web'
import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'
import styles from './ProductGrid.module.css'

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  loadingMore: boolean;
  emptyMessage?: string;
  emptyIcon?: string;
}

export function ProductGrid({ products, loading, hasMore, onLoadMore, loadingMore, emptyMessage, emptyIcon }: Readonly<ProductGridProps>) {
  if (loading && products.length === 0) {
    return (
      <div className={styles.loadingWrapper}>
        <Spinner />
      </div>
    )
  }

  if (!loading && products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>{emptyIcon ?? '🔍'}</span>
        <span className={styles.emptyText}>{emptyMessage ?? 'Nenhum produto encontrado'}</span>
      </div>
    )
  }

  return (
    <>
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <Button
            variant="outline"
            size="md"
            roundness="round"
            onClick={onLoadMore}
            loading={loadingMore}
          >
            Carregar mais
          </Button>
        </div>
      )}
    </>
  )
}
