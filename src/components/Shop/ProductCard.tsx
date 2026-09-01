import { Link } from '@tanstack/react-router'
import { Badge, Button, ButtonIcon, Icon, Text, TitleV2, Tooltip } from '@poliedro/tamentai/web'
import type { Product } from '../../types/product'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { useGlobalToast } from '../../contexts/ToastContext'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: Readonly<ProductCardProps>) {
  const { items, addToCart, updateQuantity } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { showToast } = useGlobalToast()
  const wishlisted = isWishlisted(product.id)

  const cartItem = items.find(i => i.product.id === product.id)
  const cartQuantity = cartItem?.quantity ?? 0
  const inCart = cartQuantity > 0

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const hasDiscount = product.discountPercentage > 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    showToast({
      title: 'Produto adicionado ao carrinho',
      description: product.title,
      type: 'success',
    })
  }

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newQty = cartQuantity - 1
    updateQuantity(product.id, newQty)
    if (newQty === 0) {
      showToast({
        title: 'Produto removido do carrinho',
        description: product.title,
        type: 'info',
      })
    } else {
      showToast({
        title: 'Quantidade atualizada',
        description: `${product.title} (${newQty})`,
        type: 'info',
      })
    }
  }

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newQty = cartQuantity + 1
    updateQuantity(product.id, newQty)
    showToast({
      title: 'Quantidade atualizada',
      description: `${product.title} (${newQty})`,
      type: 'success',
    })
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

        {inCart && (
          <div className={styles.inCartBadge}>
            <Badge color="green" size="sm" shape="pilled">No carrinho</Badge>
          </div>
        )}

        <div className={styles.wishlistButton}>
          <ButtonIcon
            aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            variant="ghost"
            size="xs"
            onClick={handleToggleWishlist}
          >
            <Icon name='Heart' size={20} fill={wishlisted ? '#ef4444' : 'transparent'} color={wishlisted ? 'destructive' : 'currentColor'} aria-hidden="true" />
          </ButtonIcon>
        </div>

        {!inCart && (
          <div className={styles.addOverlay}>
            <Button variant="solid" size="sm" roundness="round" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <Text variant="caption" color="muted" as="p">{product.brand}</Text>
        <div className={styles.titleRow}>
          <TitleV2 variant="h6" weight="semibold">{product.title}</TitleV2>
          {product.tags[0] && (
            <Badge color="gray" size="sm" shape="pilled">{product.category}</Badge>
          )}
        </div>

        <div className={styles.priceRow}>
          {hasDiscount ? (
            <Tooltip content={`${Math.round(product.discountPercentage)}% off`}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <Text weight="bold" as="span">${discountedPrice.toFixed(2)}</Text>
                <Text variant="caption" color="muted" as="span"><s>${product.price.toFixed(2)}</s></Text>
              </span>
            </Tooltip>
          ) : (
            <Text weight="bold" as="span">${product.price.toFixed(2)}</Text>
          )}
        </div>
        <div className={styles.ratingRow}>
          <Icon name='Star' fill="#f59e0b" stroke='#f59e0b' className={styles.ratingIcon} color='currentColor'/>
          <Text variant="caption" color="muted" as="span">{product.rating.toFixed(1)}</Text>
        </div>

        {/* In Cart quantity controls (Desktop & Mobile) or Add to Cart button (Mobile) */}
        {inCart ? (
          <div className={styles.quantityWrapper} onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
            <div className={styles.quantityRow}>
              <ButtonIcon
                aria-label="Diminuir quantidade"
                variant="outline"
                size="xs"
                onClick={handleDecreaseQuantity}
              >
                <Icon name='Minus' size={12} aria-hidden/>
              </ButtonIcon>
              <Text weight="bold" as="span">{cartQuantity}</Text>
              <ButtonIcon
                aria-label="Aumentar quantidade"
                variant="outline"
                size="xs"
                onClick={handleIncreaseQuantity}
              >
                <Icon name='Plus' size={12} aria-hidden/>
              </ButtonIcon>
            </div>
          </div>
        ) : (
          <div className={styles.mobileAction}>
            <Button
              variant="solid"
              size="sm"
              roundness="round"
              fullWidth
              onClick={handleAddToCart}
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        )}
      </div>
    </Link>
  )
}
