import { ButtonIcon, Icon, Text, Tooltip } from '@poliedro/tamentai/web'
import type { CartItem as CartItemType } from '../../types/product'
import { useCart } from '../../contexts/CartContext'
import styles from './CartItem.module.css'

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: Readonly<CartItemProps>) {
  const { updateQuantity, removeFromCart } = useCart()
  const { product, quantity } = item
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const subtotal = discountedPrice * quantity

  return (
    <div className={styles.item}>
      {/* Thumbnail */}
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.thumbnail}
      />

      {/* Info */}
      <div className={styles.info}>
        <Text weight="semibold" as="p">{product.title}</Text>
        <Text variant="caption" color="muted" as="p">
          {product.brand} · ${discountedPrice.toFixed(2)} un.
        </Text>
      </div>

      {/* Quantity controls */}
      <div className={styles.controls}>
        <ButtonIcon
          aria-label="Diminuir quantidade"
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(product.id, quantity - 1)}
        >
          <Icon name='Minus' size={12} aria-hidden/>
        </ButtonIcon>
        <Text weight="semibold">{quantity}</Text>
        <ButtonIcon
          aria-label="Aumentar quantidade"
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(product.id, quantity + 1)}
        >
          <Icon name='Plus' size={12} aria-hidden/>
        </ButtonIcon>
      </div>

      {/* Subtotal */}
      <div className={styles.subtotal}>
        <Text weight="bold" as="span">${subtotal.toFixed(2)}</Text>
      </div>

      {/* Remove */}
      <Tooltip content="Remover do carrinho">
        <span className={styles.removeWrapper}>
          <ButtonIcon
            aria-label="Remover item"
            variant="ghost"
            color="destructive"
            size="sm"
            onClick={() => removeFromCart(product.id)}
          >
            <Icon name='Trash2' size={12} aria-hidden/>
          </ButtonIcon>
        </span>
      </Tooltip>
    </div>
  )
}
