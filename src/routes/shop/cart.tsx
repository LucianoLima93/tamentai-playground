import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Text, TitleV2 } from '@poliedro/tamentai/web'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { useGlobalToast } from '../../contexts/ToastContext'
import { CartItem } from '../../components/Shop/CartItem'
import { CartSummary } from '../../components/Shop/CartSummary'
import styles from './cart.module.css'

export const Route = createFileRoute('/shop/cart')({
  component: CartPage,
})

function CartPage() {
  const { items, clearCart } = useCart()
  const { showToast } = useGlobalToast()

  const handleCheckout = () => {
    clearCart()
    showToast({ title: 'Pedido realizado com sucesso!', description: 'Obrigado pela sua compra. (Simulação)', type: 'success' })
  }

  if (items.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: '1rem',
        padding: '2rem',
      }}>
        <ShoppingBag size={48} color="var(--color-muted, #999)" />
        <TitleV2 variant="h4" weight="semibold">
          Seu carrinho está vazio
        </TitleV2>
        <Text color="muted">
          Explore nossos produtos e adicione algo ao carrinho.
        </Text>
        <Link to="/shop">
          <Button variant="solid" size="md" roundness="round">
            Continuar Comprando
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <TitleV2 variant="h3" weight="bold">Carrinho</TitleV2>

      <div className={styles.layout}>
        <div className={styles.itemsList}>
          {items.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <CartSummary onCheckout={handleCheckout} />
      </div>
    </div>
  )
}
