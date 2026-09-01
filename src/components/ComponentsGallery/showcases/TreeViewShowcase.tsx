import { TreeView } from '@poliedro/tamentai/web'
import type { TreeViewItem } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const folderItems: TreeViewItem[] = [
  {
    value: 'src',
    opened: true,
    children: [
      { value: 'components', children: [{ value: 'Button.tsx' }, { value: 'Card.tsx' }] },
      { value: 'index.ts' },
    ],
  },
  { value: 'package.json' },
]

const checkboxItems: TreeViewItem[] = [
  {
    value: 'Permissões',
    icon: 'checkbox',
    opened: true,
    children: [
      { value: 'Ler', icon: 'checkbox', checked: true },
      { value: 'Escrever', icon: 'checkbox' },
      { value: 'Excluir', icon: 'checkbox' },
    ],
  },
]

export function TreeViewShowcase() {
  return (
    <>
      <ShowcaseSection title="Pastas" description="Nós de pasta com expansão." layout="stack">
        <div style={{ maxWidth: 360 }}>
          <TreeView items={folderItems} aria-label="Árvore de arquivos" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Checkboxes" description="Nós selecionáveis." layout="stack">
        <div style={{ maxWidth: 360 }}>
          <TreeView items={checkboxItems} aria-label="Árvore de permissões" />
        </div>
      </ShowcaseSection>
    </>
  )
}
