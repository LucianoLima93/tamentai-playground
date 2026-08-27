import { Link } from '@tanstack/react-router'
import { Badge, Button, ButtonIcon, Tooltip } from '@poliedro/tamentai/web'
import { Heart, Star } from 'lucide-react'
import type { Product } from '../../types/product'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { useGlobalToast } from '../../contexts/ToastContext'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: Readonly<ProductCardProps>) {
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { showToast } = useGlobalToast()
  const wishlisted = isWishlisted(product.id)

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const hasDiscount = product.discountPercentage > 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const wasWishlisted = wishlisted
    toggleWishlist(product)
    showToast({
      title: wasWishlisted ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      description: product.title,
      type: wasWishlisted ? 'info' : 'success',
    })
  }

  return (
    <Link to="/shop/product/$productId" params={{ productId: String(product.id) }} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.wishlistButton}>
          <ButtonIcon
            aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            variant="ghost"
            size="sm"
            onClick={handleToggleWishlist}
          >
            <Heart size={16} fill={wishlisted ? '#ef4444' : 'transparent'} color={wishlisted ? '#ef4444' : 'currentColor'} aria-hidden="true" />
          </ButtonIcon>
        </div>
        <div className={styles.addOverlay}>
          <Button variant="solid" size="sm" roundness="round" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.brand}>{product.brand}</p>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{product.title}</h3>
          {product.tags[0] && (
            <Badge color="gray" size="sm" shape="pilled">{product.category}</Badge>
          )}
        </div>

        <div className={styles.priceRow}>
          {hasDiscount ? (
            <Tooltip content={`${Math.round(product.discountPercentage)}% off`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={styles.price}>${discountedPrice.toFixed(2)}</span>
                <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
              </span>
            </Tooltip>
          ) : (
            <span className={styles.price}>${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className={styles.ratingRow}>
          <Star size={12} fill="#f59e0b" className={styles.ratingIcon} />
          <span className={styles.ratingText}>{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}
