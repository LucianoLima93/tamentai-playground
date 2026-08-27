import { ButtonIcon, Icon, Text, Tooltip } from '@poliedro/tamentai/web'
import type { CartItem as CartItemType } from '../../types/product'
import { useCart } from '../../contexts/CartContext'

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: Readonly<CartItemProps>) {
  const { updateQuantity, removeFromCart } = useCart()
  const { product, quantity } = item
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const subtotal = discountedPrice * quantity

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      borderBottom: '1px solid var(--color-border, #e5e5e5)',
    }}>
      {/* Thumbnail */}
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: '64px',
          height: '64px',
          objectFit: 'cover',
          borderRadius: '6px',
          flexShrink: 0,
          background: 'var(--color-muted-bg, #f5f5f5)',
        }}
      />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <Text weight="semibold" as="p">{product.title}</Text>
        <Text variant="caption" color="muted" as="p">
          {product.brand} · ${discountedPrice.toFixed(2)} un.
        </Text>
      </div>

      {/* Quantity controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
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
      <Text weight="bold" as="span">${subtotal.toFixed(2)}</Text>

      {/* Remove */}
      <Tooltip content="Remover do carrinho">
        <span style={{ display: 'inline-flex' }}>
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
