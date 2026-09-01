import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Sidebar } from '../components/ComponentsGallery/Sidebar'
import styles from './components.module.css'

export const Route = createFileRoute('/components')({
  component: ComponentsLayout,
})

function ComponentsLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
