import type { ReactNode } from 'react'
import { TitleV2, Text } from '@poliedro/tamentai/web'
import styles from './ShowcaseSection.module.css'

interface ShowcaseSectionProps {
  /** Título do eixo demonstrado (ex.: "Variants", "Sizes", "States"). */
  title: string
  /** Explicação opcional do que esta seção demonstra. */
  description?: ReactNode
  /**
   * Direção do layout dos exemplos.
   * - `grid` (padrão): grade responsiva de exemplos.
   * - `row`: alinha exemplos numa linha que quebra conforme necessário.
   * - `stack`: empilha os exemplos verticalmente.
   */
  layout?: 'grid' | 'row' | 'stack'
  children: ReactNode
}

const layoutClass = {
  grid: 'examplesGrid',
  row: 'examplesRow',
  stack: 'examplesStack',
} as const

/**
 * Bloco de demonstração de um eixo de variação de um componente.
 * Renderiza um cabeçalho (título + descrição) e uma área de exemplos.
 */
export function ShowcaseSection({
  title,
  description,
  layout = 'grid',
  children,
}: ShowcaseSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <TitleV2 variant="h3">{title}</TitleV2>
        {description && (
          <Text as="p" variant="body-sm" color="muted">
            {description}
          </Text>
        )}
      </div>
      <div className={styles[layoutClass[layout]]}>{children}</div>
    </section>
  )
}
