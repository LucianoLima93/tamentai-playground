import { Badge, Button, Card, Progress, Text, TitleV2 } from '@poliedro/tamentai/web'
import { useCart } from '../../contexts/CartContext'

const FREE_SHIPPING_THRESHOLD = 150

interface CartSummaryProps {
  onCheckout: () => void;
}

export function CartSummary({ onCheckout }: Readonly<CartSummaryProps>) {
  const { items, totalItems, totalPrice, clearCart } = useCart()

  const subtotalRaw = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = subtotalRaw - totalPrice
  const shippingProgress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - totalPrice, 0)

  return (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TitleV2 variant="h5" weight="bold">Resumo do Pedido</TitleV2>
          <Badge color="dark" shape="pilled">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</Badge>
        </div>

        {/* Free shipping progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {remainingForFreeShipping > 0 ? (
            <Text variant="caption" color="muted">
              Faltam <strong>${remainingForFreeShipping.toFixed(2)}</strong> para frete grátis!
            </Text>
          ) : (
            <Text variant="caption" weight="semibold">
              🎉 Frete grátis desbloqueado!
            </Text>
          )}
          <Progress value={shippingProgress} variant="linear" size="sm" />
        </div>

        {/* Totals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--color-border, #e5e5e5)', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text variant="body-sm">Subtotal</Text>
            <Text variant="body-sm">${subtotalRaw.toFixed(2)}</Text>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="body-sm">Descontos</Text>
              <Text variant="body-sm">-${discount.toFixed(2)}</Text>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border, #e5e5e5)', paddingTop: '0.75rem' }}>
            <TitleV2 variant="h5" weight="bold">Total</TitleV2>
            <TitleV2 variant="h5" weight="bold">${totalPrice.toFixed(2)}</TitleV2>
          </div>
        </div>

        {/* Actions */}
        <Button variant="solid" size="lg" roundness="round" fullWidth onClick={onCheckout}>
          Finalizar Compra
        </Button>
        <Button variant="ghost" size="sm" roundness="round" fullWidth onClick={clearCart}>
          Limpar Carrinho
        </Button>
      </div>
    </Card>
  )
}
