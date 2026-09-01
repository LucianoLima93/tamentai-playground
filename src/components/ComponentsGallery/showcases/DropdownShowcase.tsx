import { Dropdown } from '@poliedro/tamentai/web'
import type { DropdownItem } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'

const items: DropdownItem[] = [
  { type: 'heading', id: 'h', label: 'Conta' },
  { id: 'profile', label: 'Perfil', icon: 'User' },
  { id: 'settings', label: 'Configurações', icon: 'Settings', shortcut: 'Mod+,' },
  { type: 'divider', id: 'd1' },
  { type: 'switch', id: 'notify', label: 'Notificações', defaultChecked: true },
  { type: 'divider', id: 'd2' },
  { id: 'logout', label: 'Sair', icon: 'LogOut', variant: 'danger' },
]

export function DropdownShowcase() {
  return (
    <>
      <ShowcaseSection title="Variants do trigger" layout="row">
        <Dropdown items={items} label="Outline" variant="outline" />
        <Dropdown items={items} label="Ghost" variant="ghost" />
      </ShowcaseSection>

      <ShowcaseSection title="Trigger por ícone" layout="row">
        <Dropdown items={items} aria-label="Menu" triggerIcon="EllipsisVertical" />
      </ShowcaseSection>
    </>
  )
}
