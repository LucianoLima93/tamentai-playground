import { Breadcrumb } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const items = [
  { label: 'Início', href: '#', startIcon: 'House' },
  { label: 'Componentes', href: '#' },
  { label: 'Breadcrumb', active: true },
]

export function BreadcrumbShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants" layout="stack">
        <Breadcrumb items={items} variant="base" />
        <Breadcrumb items={items} variant="bordered" />
      </ShowcaseSection>

      <ShowcaseSection title="Sizes" layout="stack">
        <Breadcrumb items={items} size="sm" />
        <Breadcrumb items={items} size="md" />
        <Breadcrumb items={items} size="lg" />
      </ShowcaseSection>
    </>
  )
}
