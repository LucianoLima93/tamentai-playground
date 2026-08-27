import { Link, useNavigate } from '@tanstack/react-router'
import { Badge, ButtonIcon, Icon } from '@poliedro/tamentai/web'
import { useCart } from '../../contexts/CartContext'
import { useWishlist } from '../../contexts/WishlistContext'
import styles from './Header.module.css'

export function Header() {
  const { totalItems } = useCart()
  const { totalItems: wishlistCount } = useWishlist()
  const navigate = useNavigate()

  const handleFavoritesClick = () => {
    navigate({ to: '/shop', search: { favorites: true } as any })
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        tamentai
      </Link>

      <nav className={styles.nav}>
        <Link
          to="/"
          className={styles.navLink}
          activeProps={{ className: `${styles.navLink} ${styles.navLinkActive}` }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className={styles.navLink}
          activeProps={{ className: `${styles.navLink} ${styles.navLinkActive}` }}
        >
          Shop
        </Link>
        <Link
          to="/table"
          style={{ display: 'none' }}
          className={styles.navLink}
          activeProps={{ className: `${styles.navLink} ${styles.navLinkActive}` }}
        >
          Table Playground
        </Link>
        <div className={styles.cartLink} style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
          <ButtonIcon aria-label="Favoritos" variant="ghost" size="sm" onClick={handleFavoritesClick}>
            <Icon name='Heart' size={24} aria-hidden="true" />
          </ButtonIcon>
          {wishlistCount > 0 && (
            <Badge color="red" size="sm" shape="pilled" className={styles.cartBadge}>
              {wishlistCount}
            </Badge>
          )}
        </div>
        <Link to="/shop/cart" className={styles.cartLink}>
          <ButtonIcon aria-label="Carrinho" variant="ghost" size="sm">
            <Icon name='ShoppingBag' size={24} aria-hidden="true" />
          </ButtonIcon>
          {totalItems > 0 && (
            <Badge color="red" size="sm" shape="pilled" className={styles.cartBadge}>
              {totalItems}
            </Badge>
          )}
        </Link>
      </nav>
    </header>
  )
}
