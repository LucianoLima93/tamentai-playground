import type { ComponentEntry, ComponentGroup, ComponentLayer } from './types'
import { atoms } from './atoms'
import { molecules } from './molecules'
import { organisms } from './organisms'

export type { ComponentEntry, ComponentGroup, ComponentLayer }

/** Lista completa de componentes documentados, na ordem de camada. */
export const COMPONENTS: ComponentEntry[] = [...atoms, ...molecules, ...organisms]

/** Ordem de exibição das camadas na Sidebar. */
const LAYER_ORDER: ComponentLayer[] = ['Atoms', 'Molecules', 'Organisms']

/** Retorna a entrada de um componente pelo slug, ou undefined se não existir. */
export function getBySlug(slug: string): ComponentEntry | undefined {
  return COMPONENTS.find((entry) => entry.slug === slug)
}

/** Slug do primeiro componente (usado como destino padrão da landing). */
export function getFirstSlug(): string {
  return COMPONENTS[0].slug
}

/** Agrupa os componentes por camada, preservando a ordem de LAYER_ORDER. */
export function getGroups(): ComponentGroup[] {
  return LAYER_ORDER.map((layer) => ({
    layer,
    components: COMPONENTS.filter((entry) => entry.layer === layer),
  })).filter((group) => group.components.length > 0)
}

/**
 * Valida as invariantes do registry em tempo de desenvolvimento.
 * Falha cedo (via console.error) se houver slug duplicado, campo obrigatório
 * ausente ou camada inválida. Removido em builds de produção pelo bundler.
 */
if (import.meta.env?.DEV) {
  const seen = new Set<string>()
  for (const entry of COMPONENTS) {
    if (!entry.slug || !entry.name || !entry.description) {
      console.error('[componentsRegistry] Entrada com campo obrigatório vazio:', entry)
    }
    if (!LAYER_ORDER.includes(entry.layer)) {
      console.error(`[componentsRegistry] Camada inválida "${entry.layer}" em "${entry.slug}"`)
    }
    if (typeof entry.Showcase !== 'function') {
      console.error(`[componentsRegistry] Showcase ausente/ inválido em "${entry.slug}"`)
    }
    if (seen.has(entry.slug)) {
      console.error(`[componentsRegistry] Slug duplicado: "${entry.slug}"`)
    }
    seen.add(entry.slug)
  }
}
