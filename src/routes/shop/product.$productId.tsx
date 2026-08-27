import { createFileRoute } from '@tanstack/react-router'
import { Spinner } from '@poliedro/tamentai/web'
import { useProduct } from '../../hooks/useDummyJson'
import { ProductDetail } from '../../components/Shop/ProductDetail'
import { ReviewSection } from '../../components/Shop/ReviewSection'

export const Route = createFileRoute('/shop/product/$productId')({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const { data: product, loading, error } = useProduct(Number(productId))

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spinner />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Produto não encontrado.</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1120px', margin: '0 auto', width: '100%' }}>
      <ProductDetail product={product} />
      {product.reviews.length > 0 && (
        <ReviewSection reviews={product.reviews} averageRating={product.rating} />
      )}
    </div>
  )
}
