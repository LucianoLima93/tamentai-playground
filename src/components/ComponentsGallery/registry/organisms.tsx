import type { ComponentEntry } from './types'
import { AlertShowcase } from '../showcases/AlertShowcase'
import { CardShowcase } from '../showcases/CardShowcase'
import { DatePickerShowcase } from '../showcases/DatePickerShowcase'
import { DialogShowcase } from '../showcases/DialogShowcase'
import { DrawerShowcase } from '../showcases/DrawerShowcase'
import { FileInputShowcase } from '../showcases/FileInputShowcase'
import { FileUploadProgressShowcase } from '../showcases/FileUploadProgressShowcase'
import { StepperShowcase } from '../showcases/StepperShowcase'
import { TableShowcase } from '../showcases/TableShowcase'
import { TimelineShowcase } from '../showcases/TimelineShowcase'
import { TreeViewShowcase } from '../showcases/TreeViewShowcase'

/**
 * Entradas da camada Organisms.
 * Task 1: metadados + Showcase placeholder. Showcases reais virão na Task 5.
 */
export const organisms: ComponentEntry[] = [
  {
    slug: 'alert',
    name: 'Alert',
    layer: 'Organisms',
    description:
      'Bloco de alerta composto (compound API AlertV2.*) com ícone, avatar, título, descrição, ações e fechamento, em várias cores.',
    Showcase: AlertShowcase,
  },
  {
    slug: 'card',
    name: 'Card',
    layer: 'Organisms',
    description:
      'Cartão híbrido que aceita uso por props (title, subtitle, footer) ou por composição de subcomponentes, com mídia, ações e menu.',
    Showcase: CardShowcase,
  },
  {
    slug: 'date-picker',
    name: 'DatePicker',
    layer: 'Organisms',
    description:
      'Seletor de data nos modos único e intervalo, com presets, limites de data mínima/máxima e painel em popover.',
    Showcase: DatePickerShowcase,
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    layer: 'Organisms',
    description:
      'Modal com header e footer fixos e corpo rolável, em presets de largura e ações de confirmação/cancelamento configuráveis.',
    Showcase: DialogShowcase,
  },
  {
    slug: 'drawer',
    name: 'Drawer',
    layer: 'Organisms',
    description:
      'Painel lateral deslizante a partir de qualquer borda, em presets de tamanho, com header, footer e comportamentos de fechamento.',
    Showcase: DrawerShowcase,
  },
  {
    slug: 'file-input',
    name: 'FileInput',
    layer: 'Organisms',
    description:
      'Campo de upload de arquivo com variações de superfície, tamanho e forma, seleção múltipla e estados de validação/loading.',
    Showcase: FileInputShowcase,
  },
  {
    slug: 'file-upload-progress',
    name: 'FileUploadProgress',
    layer: 'Organisms',
    description:
      'Linha e card de progresso de upload com estados uploading, paused, success e error, e ações de pausar, retomar e remover.',
    Showcase: FileUploadProgressShowcase,
  },
  {
    slug: 'stepper',
    name: 'Stepper',
    layer: 'Organisms',
    description:
      'Indicador de etapas com variações de alinhamento e status por passo (pending, active, completed, error, success).',
    Showcase: StepperShowcase,
  },
  {
    slug: 'table',
    name: 'Table',
    layer: 'Organisms',
    description:
      'Tabela de dados baseada em TanStack Table, com colunas configuráveis, ações de cabeçalho e linha, paginação e suporte a dados remotos.',
    Showcase: TableShowcase,
  },
  {
    slug: 'timeline',
    name: 'Timeline',
    layer: 'Organisms',
    description:
      'Linha do tempo de eventos, vertical ou horizontal, com marcadores por status e conteúdo de data, título e descrição.',
    Showcase: TimelineShowcase,
  },
  {
    slug: 'tree-view',
    name: 'TreeView',
    layer: 'Organisms',
    description:
      'Árvore hierárquica com nós de pasta e checkbox, expansão, seleção e marcação controláveis.',
    Showcase: TreeViewShowcase,
  },
]
