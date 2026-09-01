import type { ComponentEntry } from './types'
import { AccordionShowcase } from '../showcases/AccordionShowcase'
import { BreadcrumbShowcase } from '../showcases/BreadcrumbShowcase'
import { ButtonShowcase } from '../showcases/ButtonShowcase'
import { ButtonGroupShowcase } from '../showcases/ButtonGroupShowcase'
import { DropdownShowcase } from '../showcases/DropdownShowcase'
import { InputShowcase } from '../showcases/InputShowcase'
import { InputGroupShowcase } from '../showcases/InputGroupShowcase'
import { ListGroupShowcase } from '../showcases/ListGroupShowcase'
import { ListsShowcase } from '../showcases/ListsShowcase'
import { PopoverShowcase } from '../showcases/PopoverShowcase'
import { RadioGroupShowcase } from '../showcases/RadioGroupShowcase'
import { SelectShowcase } from '../showcases/SelectShowcase'
import { SelectGroupShowcase } from '../showcases/SelectGroupShowcase'
import { SwitchGroupShowcase } from '../showcases/SwitchGroupShowcase'
import { TabsShowcase } from '../showcases/TabsShowcase'
import { TextareaShowcase } from '../showcases/TextareaShowcase'
import { ToastShowcase } from '../showcases/ToastShowcase'
import { TooltipShowcase } from '../showcases/TooltipShowcase'

/**
 * Entradas da camada Molecules.
 * Task 1: metadados + Showcase placeholder. Showcases reais virão na Task 5.
 */
export const molecules: ComponentEntry[] = [
  {
    slug: 'accordion',
    name: 'Accordion',
    layer: 'Molecules',
    description:
      'Painéis colapsáveis com variações de borda e ícone de alternância, permitindo abertura simples ou múltipla.',
    Showcase: AccordionShowcase,
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    layer: 'Molecules',
    description:
      'Trilha de navegação hierárquica com ícones, item ativo e colapso de níveis intermediários em dropdown.',
    Showcase: BreadcrumbShowcase,
  },
  {
    slug: 'button',
    name: 'Button',
    layer: 'Molecules',
    description:
      'Botão de ação com variações de estilo, cor e tamanho, ícones nas pontas e estados de loading e largura total.',
    Showcase: ButtonShowcase,
  },
  {
    slug: 'button-group',
    name: 'ButtonGroup',
    layer: 'Molecules',
    description:
      'Agrupa botões em layout unido (joined) ou espaçado (spaced), na horizontal ou vertical.',
    Showcase: ButtonGroupShowcase,
  },
  {
    slug: 'dropdown',
    name: 'Dropdown',
    layer: 'Molecules',
    description:
      'Menu suspenso rico com itens de ação, switch, seleção, cabeçalhos e divisores, e posicionamento configurável.',
    Showcase: DropdownShowcase,
  },
  {
    slug: 'input',
    name: 'Input',
    layer: 'Molecules',
    description:
      'Campo de texto com variações de superfície, tamanho e forma, ícones/afixos, divisores e feedback de validação.',
    Showcase: InputShowcase,
  },
  {
    slug: 'input-group',
    name: 'InputGroup',
    layer: 'Molecules',
    description:
      'Agrupa múltiplos inputs em um layout compartilhado, com espaçamento e feedback comuns.',
    Showcase: InputGroupShowcase,
  },
  {
    slug: 'list-group',
    name: 'ListGroup',
    layer: 'Molecules',
    description:
      'Lista de itens orientada a dados (navegação/estatísticas), com ícones, badges, item ativo e variações striped/flush.',
    Showcase: ListGroupShowcase,
  },
  {
    slug: 'lists',
    name: 'Lists',
    layer: 'Molecules',
    description:
      'Listas estilizadas com marcadores disc, decimal, inline, ícone ou check, com opções de separador, forma e cor.',
    Showcase: ListsShowcase,
  },
  {
    slug: 'popover',
    name: 'Popover',
    layer: 'Molecules',
    description:
      'Painel flutuante ancorado a um trigger, com lado/alinhamento configuráveis, seta e controle de padding.',
    Showcase: PopoverShowcase,
  },
  {
    slug: 'radio-group',
    name: 'RadioGroup',
    layer: 'Molecules',
    description:
      'Grupo de radios com layout vertical/horizontal e variações plain, boxed e list, além de feedback compartilhado.',
    Showcase: RadioGroupShowcase,
  },
  {
    slug: 'select',
    name: 'Select',
    layer: 'Molecules',
    description:
      'Seleção no padrão listbox (Select) e combobox com filtro (Combobox), com múltipla escolha, busca e estados de validação.',
    Showcase: SelectShowcase,
  },
  {
    slug: 'select-group',
    name: 'SelectGroup',
    layer: 'Molecules',
    description:
      'Agrupa múltiplos selects em um layout compartilhado, no mesmo padrão do InputGroup.',
    Showcase: SelectGroupShowcase,
  },
  {
    slug: 'switch-group',
    name: 'SwitchGroup',
    layer: 'Molecules',
    description:
      'Agrupa switches com label e feedback compartilhados, herdando as variações do Switch.',
    Showcase: SwitchGroupShowcase,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    layer: 'Molecules',
    description:
      'Navegação por abas com variações base, bordered, segment e pills, orientação horizontal/vertical e painéis de conteúdo.',
    Showcase: TabsShowcase,
  },
  {
    slug: 'textarea',
    name: 'Textarea',
    layer: 'Molecules',
    description:
      'Campo de texto multilinha com variações de superfície, tamanho e forma, contador de caracteres e feedback.',
    Showcase: TextareaShowcase,
  },
  {
    slug: 'toast',
    name: 'Toast',
    layer: 'Molecules',
    description:
      'Notificação temporária com variações de status e aparência, posicionamento configurável e disparo via useToast.',
    Showcase: ToastShowcase,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    layer: 'Molecules',
    description:
      'Dica flutuante exibida em hover/focus, com 13 posicionamentos e variações de aparência.',
    Showcase: TooltipShowcase,
  },
]
