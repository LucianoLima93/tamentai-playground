import { TitleV2, Text, Badge } from '@poliedro/tamentai/web'
import type { ComponentEntry } from './registry'
import styles from './ComponentPage.module.css'

interface ComponentPageProps {
  entry: ComponentEntry
}

export function ComponentPage({ entry }: ComponentPageProps) {
  const { name, layer, description, Showcase } = entry

  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <TitleV2 variant="h1">{name}</TitleV2>
          <Badge variant="soft" color="gray" size="sm">
            {layer}
          </Badge>
        </div>
        <Text as="p" variant="body-lg" color="muted">
          {description}
        </Text>
      </header>

      <section className={styles.showcase}>
        <Showcase />
      </section>
    </article>
  )
}
