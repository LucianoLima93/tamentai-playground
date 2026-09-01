import type { ComponentEntry } from './types'
import { AvatarShowcase } from '../showcases/AvatarShowcase'
import { BadgeShowcase } from '../showcases/BadgeShowcase'
import { ButtonIconShowcase } from '../showcases/ButtonIconShowcase'
import { CheckboxShowcase } from '../showcases/CheckboxShowcase'
import { FeedbackShowcase } from '../showcases/FeedbackShowcase'
import { FieldShowcase } from '../showcases/FieldShowcase'
import { IconShowcase } from '../showcases/IconShowcase'
import { LinksShowcase } from '../showcases/LinksShowcase'
import { ProgressShowcase } from '../showcases/ProgressShowcase'
import { RadioShowcase } from '../showcases/RadioShowcase'
import { SpinnerShowcase } from '../showcases/SpinnerShowcase'
import { StaticIconShowcase } from '../showcases/StaticIconShowcase'
import { SwitchShowcase } from '../showcases/SwitchShowcase'
import { TextShowcase } from '../showcases/TextShowcase'
import { TitleShowcase } from '../showcases/TitleShowcase'

/**
 * Entradas da camada Atoms.
 * Task 1: metadados + Showcase placeholder. Showcases reais virão na Task 5.
 */
export const atoms: ComponentEntry[] = [
  {
    slug: 'avatar',
    name: 'Avatar',
    layer: 'Atoms',
    description:
      'Representa a identidade de um usuário por imagem, iniciais ou placeholder, com suporte a indicador de status e agrupamento (AvatarGroup).',
    Showcase: AvatarShowcase,
  },
  {
    slug: 'badge',
    name: 'Badge',
    layer: 'Atoms',
    description:
      'Rótulo compacto para status, contagens e tags. Suporta ícones nas pontas e um botão de remoção opcional.',
    Showcase: BadgeShowcase,
  },
  {
    slug: 'button-icon',
    name: 'ButtonIcon',
    layer: 'Atoms',
    description:
      'Botão apenas-ícone para ações compactas e controles de paginação, com estados de loading, ativo e desabilitado.',
    Showcase: ButtonIconShowcase,
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    layer: 'Atoms',
    description:
      'Caixa de seleção com label, descrição e feedback, incluindo estados marcado, indeterminado, inválido e sucesso.',
    Showcase: CheckboxShowcase,
  },
  {
    slug: 'feedback',
    name: 'Feedback',
    layer: 'Atoms',
    description:
      'Mensagem inline de feedback (informação, erro ou sucesso) exibida abaixo de campos e controles.',
    Showcase: FeedbackShowcase,
  },
  {
    slug: 'field',
    name: 'Field',
    layer: 'Atoms',
    description:
      'Wrapper de campo que padroniza label, texto secundário, obrigatoriedade e mensagem de feedback. Base de composição para inputs.',
    Showcase: FieldShowcase,
  },
  {
    slug: 'icon',
    name: 'Icon',
    layer: 'Atoms',
    description:
      'Renderiza ícones Lucide e customizados com tamanhos e cores semânticas do design system.',
    Showcase: IconShowcase,
  },
  {
    slug: 'links',
    name: 'Links',
    layer: 'Atoms',
    description:
      'Link estilizado, inline (texto) ou em formato pill, com ícones opcionais nas pontas e integração com roteadores.',
    Showcase: LinksShowcase,
  },
  {
    slug: 'progress',
    name: 'Progress',
    layer: 'Atoms',
    description:
      'Barra de progresso híbrida (linear ou por etapas) com rótulo, valor e badge flutuante. Inclui ActivityIndicator e SignalBars.',
    Showcase: ProgressShowcase,
  },
  {
    slug: 'radio',
    name: 'Radio',
    layer: 'Atoms',
    description:
      'Botão de opção único com label, descrição e feedback, em variações de tamanho e tipo de preenchimento.',
    Showcase: RadioShowcase,
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    layer: 'Atoms',
    description:
      'Indicador de carregamento em variações de estilo, tamanho e cor, com rótulo e modo overlay opcionais.',
    Showcase: SpinnerShowcase,
  },
  {
    slug: 'static-icon',
    name: 'StaticIcon',
    layer: 'Atoms',
    description:
      'Ícone renderizado dentro de um container decorado (tile), com variações de estilo, cor, tamanho e forma.',
    Showcase: StaticIconShowcase,
  },
  {
    slug: 'switch',
    name: 'Switch',
    layer: 'Atoms',
    description:
      'Interruptor liga/desliga com variações de estilo, tamanho e forma, ícones internos e rótulos laterais opcionais.',
    Showcase: SwitchShowcase,
  },
  {
    slug: 'text',
    name: 'Text',
    layer: 'Atoms',
    description:
      'Componente tipográfico para corpo de texto, labels, captions e overlines, alinhado aos tokens de tipografia do Figma.',
    Showcase: TextShowcase,
  },
  {
    slug: 'title',
    name: 'Title',
    layer: 'Atoms',
    description:
      'Heading semântico (h1–h6) com variações de cor e peso. Exportado como TitleV2 no pacote.',
    Showcase: TitleShowcase,
  },
]
