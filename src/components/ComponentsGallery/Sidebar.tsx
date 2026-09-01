import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Badge, ButtonIcon, Icon, Input, Text } from '@poliedro/tamentai/web'
import { getGroups } from './registry'
import styles from './Sidebar.module.css'

export function Sidebar() {
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const groups = useMemo(() => getGroups(), [])
  const { pathname } = useLocation()

  // Fecha o menu mobile sempre que a rota muda (navegação por um item).
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const normalizedQuery = query.trim().toLowerCase()

  const filteredGroups = useMemo(() => {
    if (!normalizedQuery) return groups
    return groups
      .map((group) => ({
        ...group,
        components: group.components.filter(
          (entry) =>
            entry.name.toLowerCase().includes(normalizedQuery) ||
            entry.slug.toLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((group) => group.components.length > 0)
  }, [groups, normalizedQuery])

  return (
    <>
      <div className={styles.mobileBar}>
        <ButtonIcon
          aria-label={mobileOpen ? 'Fechar menu de componentes' : 'Abrir menu de componentes'}
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <Icon name={mobileOpen ? 'X' : 'Menu'} size={20} aria-hidden="true" />
        </ButtonIcon>
        <Text as="span" variant="label">
          Componentes
        </Text>
      </div>

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.search}>
          <Input
            aria-label="Buscar componentes"
            placeholder="Buscar componentes..."
            size="sm"
            value={query}
            onChangeValue={setQuery}
            startIcon={<Icon name="Search" size={16} aria-hidden="true" />}
          />
        </div>

        <nav className={styles.nav}>
          {filteredGroups.map((group) => (
            <div key={group.layer} className={styles.group}>
              <div className={styles.groupHeader}>
                <Text as="span" variant="overline" color="muted">
                  {group.layer}
                </Text>
                <Badge variant="soft" color="gray" size="sm" shape="pilled">
                  {group.components.length}
                </Badge>
              </div>
              <ul className={styles.list}>
                {group.components.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      to="/components/$componentId"
                      params={{ componentId: entry.slug }}
                      className={styles.link}
                      activeProps={{ className: `${styles.link} ${styles.linkActive}` }}
                    >
                      {entry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {filteredGroups.length === 0 && (
            <Text as="p" variant="body-sm" color="muted">
              Nenhum componente encontrado.
            </Text>
          )}
        </nav>
      </aside>
    </>
  )
}
