import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/shop')({
  component: ShopLayout,
})

function ShopLayout() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Outlet />
    </div>
  )
}
