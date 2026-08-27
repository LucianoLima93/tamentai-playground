import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Badge, Breadcrumb, Button, ButtonIcon, Text, TitleV2, Tooltip } from '@poliedro/tamentai/web'
import { Star, Minus, Plus, Heart } from 'lucide-react'
import type { Product } from '../../types/product'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import { useGlobalToast } from '../../contexts/ToastContext'
import styles from './ProductDetail.module.css'

interface ProductDetailProps {
  product: Product;
}

function getStockColor(status: string): 'green' | 'yellow' | 'red' {
  if (status === 'In Stock') return 'green'
  if (status === 'Low Stock') return 'yellow'
  return 'red'
}

export function ProductDetail({ product }: Readonly<ProductDetailProps>) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const { showToast } = useGlobalToast()
  const navigate = useNavigate()
  const wishlisted = isWishlisted(product.id)

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const hasDiscount = product.discountPercentage > 0

  const handleAddToCart = () => {
    addToCart(product, quantity)
    showToast({ title: 'Produto adicionado ao carrinho', description: `${product.title} (x${quantity})`, type: 'success' })
  }

  const handleToggleWishlist = () => {
    const wasWishlisted = wishlisted
    toggleWishlist(product)
    showToast({
      title: wasWishlisted ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      description: product.title,
      type: wasWishlisted ? 'info' : 'success',
    })
  }

  const images = product.images.length > 0 ? product.images : [product.thumbnail]

  const breadcrumbItems = [
    { label: 'Home', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); navigate({ to: '/' }) } },
    { label: 'Shop', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); navigate({ to: '/shop', search: {} }) } },
    { label: product.category, onClick: (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); navigate({ to: '/shop', search: { category: product.category } }) } },
    { label: product.title, active: true },
  ]

  return (
    <div className={styles.container}>
      {/* Gallery */}
      <div className={styles.gallery}>
        <img
          src={images[selectedImage]}
          alt={product.title}
          className={styles.mainImage}
        />
        {images.length > 1 && (
          <div className={styles.thumbnails}>
            {images.map((img, i) => (
              <ButtonIcon
                key={img}
                aria-label={`Ver imagem ${i + 1}`}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImage(i)}
                className={`${styles.thumb} ${i === selectedImage ? styles.thumbActive : ''}`}
              >
                <img
                  src={img}
                  alt={`${product.title} - imagem ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                />
              </ButtonIcon>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <Breadcrumb items={breadcrumbItems} size="sm" />

        <TitleV2 variant="h2" weight="bold">{product.title}</TitleV2>

        <div className={styles.brandRow}>
          {product.brand && <Badge color="gray" shape="pilled">{product.brand}</Badge>}
          <Badge color={getStockColor(product.availabilityStatus)} size="sm" shape="pilled">
            {product.availabilityStatus}
          </Badge>
        </div>

        <div className={styles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.round(product.rating) ? '#f59e0b' : 'transparent'}
              className={styles.starIcon}
            />
          ))}
          <Text variant="body-sm" color="muted">
            {product.rating.toFixed(1)} ({product.reviews.length} reviews)
          </Text>
        </div>

        <div className={styles.priceBlock}>
          <TitleV2 variant="h3" weight="bold">${discountedPrice.toFixed(2)}</TitleV2>
          {hasDiscount && (
            <>
              <Text variant="body-sm" color="muted" as="span"><s>${product.price.toFixed(2)}</s></Text>
              <Badge color="red" size="sm" shape="pilled">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            </>
          )}
        </div>

        <Text color="muted">{product.description}</Text>

        <div className={styles.metaRow}>
          <Tooltip content={product.shippingInformation}>
            <span style={{ display: 'inline-flex' }}>
              <Badge color="blue" size="sm">Frete</Badge>
            </span>
          </Tooltip>
          <Tooltip content={product.warrantyInformation}>
            <span style={{ display: 'inline-flex' }}>
              <Badge color="blue" size="sm">Garantia</Badge>
            </span>
          </Tooltip>
          <Tooltip content={product.returnPolicy}>
            <span style={{ display: 'inline-flex' }}>
              <Badge color="blue" size="sm">Devolução</Badge>
            </span>
          </Tooltip>
        </div>

        <div className={styles.actions}>
          <div className={styles.quantityRow}>
            <ButtonIcon
              aria-label="Diminuir quantidade"
              variant="outline"
              size="sm"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >
              <Minus size={14} aria-hidden="true" />
            </ButtonIcon>
            <Text weight="semibold">{quantity}</Text>
            <ButtonIcon
              aria-label="Aumentar quantidade"
              variant="outline"
              size="sm"
              onClick={() => setQuantity(q => q + 1)}
            >
              <Plus size={14} aria-hidden="true" />
            </ButtonIcon>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="solid" size="lg" roundness="round" fullWidth onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
            <ButtonIcon
              aria-label={wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              variant="outline"
              size="lg"
              onClick={handleToggleWishlist}
            >
              <Heart size={20} fill={wishlisted ? '#ef4444' : 'transparent'} color={wishlisted ? '#ef4444' : 'currentColor'} aria-hidden="true" />
            </ButtonIcon>
          </div>
        </div>
      </div>
    </div>
  )
}
