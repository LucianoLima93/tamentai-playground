import type { FC } from 'react'

/** Camada atômica do design system. */
export type ComponentLayer = 'Atoms' | 'Molecules' | 'Organisms'

/**
 * Uma entrada do registry da galeria de componentes.
 * Fonte única de verdade: consumida pela Sidebar e pela página de detalhe.
 */
export interface ComponentEntry {
  /** Identificador da URL, ex.: 'button', 'badge', 'card'. */
  slug: string
  /** Nome de exibição do componente, ex.: 'Button'. */
  name: string
  /** Camada atômica a que o componente pertence. */
  layer: ComponentLayer
  /** Explicação curta (1–3 frases) do que é o componente. */
  description: string
  /**
   * Render do showcase com todas as opções do componente.
   * Nesta Task 1 é um placeholder; será preenchido na Task 5.
   */
  Showcase: FC
}

/** Um grupo de componentes de uma mesma camada, para renderizar na Sidebar. */
export interface ComponentGroup {
  layer: ComponentLayer
  components: ComponentEntry[]
}
