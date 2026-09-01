import { createFileRoute } from '@tanstack/react-router'
import { Spinner, Text } from '@poliedro/tamentai/web'
import { useProduct } from '../../hooks/useDummyJson'
import { ProductDetail } from '../../components/Shop/ProductDetail'
import { ReviewSection } from '../../components/Shop/ReviewSection'
import styles from './ProductPage.module.css'

export const Route = createFileRoute('/shop/product/$productId')({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const { data: product, loading, error } = useProduct(Number(productId))

  if (loading) {
    return (
      <div className={styles.centerState}>
        <Spinner />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className={styles.centerState}>
        <Text color="muted">Produto não encontrado.</Text>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <ProductDetail product={product} />
      {product.reviews.length > 0 && (
        <ReviewSection reviews={product.reviews} averageRating={product.rating} />
      )}
    </div>
  )
}
