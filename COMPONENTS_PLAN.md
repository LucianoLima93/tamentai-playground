# Plano de Implementação — Galeria de Componentes `/components` (Tamentai DS)

## Problem Statement

Adicionar uma nova rota `/components` ao playground que funcione como uma **galeria/documentação viva** de todos os componentes do design system `@poliedro/tamentai/web` (v1.0.2). A rota terá um **menu lateral** listando cada componente. Ao clicar em um item, a página exibe aquele componente em `/components/<slug>` (ex.: `/components/button`), com:

1. Uma **breve explicação** do que é o componente.
2. Logo abaixo, **todas as opções** desenvolvidas para ele (variant, color, size, shape, state, orientation, placement, etc.), renderizadas ao vivo.

O playground de e-commerce (`/shop`) e a Home continuam intactos. Esta é uma adição, não uma substituição.

---

## Requirements

1. Nova rota-pai `/components` com layout de duas colunas: **sidebar (menu lateral)** + **área de conteúdo**.
2. Sidebar lista todos os componentes agrupados por camada atômica (Atoms / Molecules / Organisms), com busca opcional.
3. Rota filha por componente: `/components/$componentId` (ex.: `/components/button`, `/components/badge`).
4. Cada página de componente contém: título, descrição curta, e **showcase de todas as opções** do componente (cada eixo de variação em sua própria seção).
5. Reaproveitar os componentes do próprio Tamentai para construir a galeria (dogfooding): `TitleV2`/`Text` para textos, `Card` para agrupar exemplos, `Badge` para rotular variações, `Tabs` para navegar entre eixos quando fizer sentido.
6. Adicionar link "Components" no `Header`.
7. Build (`pnpm build`) sem erros de tipo.

---

## Background — Arquitetura atual do projeto

- **Roteamento:** TanStack Router file-based (`@tanstack/router-plugin`). Rotas ficam em `src/routes/`, geradas em `src/routeTree.gen.ts`. Padrões observados:
  - `createFileRoute('/rota')({ component })`
  - Layout route com `Outlet` (ex.: `src/routes/shop.tsx`) + rotas filhas em `src/routes/shop/`.
- **Providers:** `src/main.tsx` envolve o app com `ToastProvider > CartProvider > WishlistProvider > RouterProvider`.
- **Layout global:** `src/routes/__root.tsx` renderiza `<Header />` + `<Outlet />`.
- **Estilos:** CSS Modules por componente (`*.module.css`); tokens globais em `src/index.css`.
- **Import da lib:** `import { Button } from '@poliedro/tamentai/web'` (entry `./web` → `components-v2`).

### Gotchas de nomes de export (importante para os imports)

| Componente | Nome exportado real |
|---|---|
| Title (heading) | `TitleV2` |
| TextArea | `Textarea` (a minúsculo) |
| Alert | compound `AlertV2.Root / .Icon / .Title / .Description / .Actions / .Close` … |
| Progress "SyntheticButton" | `SyntheticButtonV2` |
| Progress (barra) | `Progress` (+ `ProgressRoot/Track/Indicator/Value/Label/FloatingBadge`) |
| Toast | `Toast`, `ToastContent`, `ToastProvider`, `ToastViewport`, `useToast` |
| Select | `Select`, `Combobox` |

---

## Proposed Solution

Criar uma **rota-pai** `/components` que renderiza a sidebar + `Outlet`, e **rotas filhas dinâmicas** `/components/$componentId`. Um **registry central** (um único arquivo de dados) mapeia cada `componentId` (slug) para: metadados (nome, camada, descrição) + uma função de render do showcase daquele componente. A sidebar e a página de detalhe consomem esse mesmo registry — assim adicionar/editar um componente é feito em um único lugar.

```mermaid
graph TD
    A[main.tsx providers] --> B[__root.tsx Header + Outlet]
    B --> C[/components - ComponentsLayout: Sidebar + Outlet/]
    C --> D[/components/ - index: intro / redirect p/ primeiro componente]
    C --> E[/components/$componentId - ComponentPage]
    E --> F[componentsRegistry -> metadata + showcase]
    G[Sidebar] --> F
```

### Por que um registry central

- Sidebar e página de detalhe ficam sincronizadas automaticamente.
- Slug ↔ componente resolvido num só lugar (evita links quebrados).
- Cada showcase é uma função isolada, fácil de manter e revisar.

---

## Estrutura de Arquivos Proposta

```
src/
├── routes/
│   ├── components.tsx                 # NOVO — layout route (Sidebar + Outlet)
│   └── components/
│       ├── index.tsx                  # NOVO — landing (redirect p/ 1º componente OU intro)
│       └── $componentId.tsx           # NOVO — resolve slug -> registry -> ComponentPage
├── components/
│   └── ComponentsGallery/             # NOVO
│       ├── Sidebar.tsx                # menu lateral (grupos Atoms/Molecules/Organisms + busca)
│       ├── Sidebar.module.css
│       ├── ComponentPage.tsx          # header (título + descrição) + render do showcase
│       ├── ComponentPage.module.css
│       ├── ShowcaseSection.tsx        # bloco reutilizável: título do eixo + grid de exemplos
│       ├── ShowcaseSection.module.css
│       ├── PropMatrix.tsx             # helper: renderiza um componente p/ cada valor de um eixo
│       └── registry/
│           ├── index.ts               # agrega e exporta COMPONENTS[] + helpers (getBySlug, groups)
│           ├── types.ts               # ComponentEntry, ComponentLayer, ShowcaseAxis...
│           ├── atoms.tsx              # entries dos Atoms (showcases)
│           ├── molecules.tsx          # entries dos Molecules (showcases)
│           └── organisms.tsx          # entries dos Organisms (showcases)
└── components/Header/Header.tsx       # ATUALIZADO — adicionar link "Components"
```

### Modelo de dados do registry (`registry/types.ts`)

```ts
type ComponentLayer = 'Atoms' | 'Molecules' | 'Organisms';

interface ComponentEntry {
  slug: string;            // 'button', 'badge', 'card'...
  name: string;            // 'Button'
  layer: ComponentLayer;
  description: string;     // 1–3 frases em pt-BR
  // Render do showcase (todas as opções). Recebe nada; usa estado local se precisar.
  Showcase: React.FC;
}
```

---

## Catálogo completo dos componentes a documentar

> Fonte: type definitions de `@poliedro/tamentai/web` (`dist/components-v2`), v1.0.2. Cada linha vira uma entrada no registry e um item na sidebar. As "opções" listadas são os eixos que o showcase deve cobrir.

### Atoms (15 pastas)

| Slug | Export | Descrição curta | Opções a mostrar |
|---|---|---|---|
| `avatar` | `Avatar`, `AvatarGroup` | Imagem/identidade do usuário com status e agrupamento. | `variant`: image, placeholder, white, solid, soft, outlined · `size`: xs–xl · `shape`: rounded, circular · `color`: dark, gray, green, blue, red, yellow, light · `status`: Offline, Online, Away, Do Not Disturb, Icon · AvatarGroup `group`: Default, Bordered, Grid + `max` |
| `badge` | `Badge` | Rótulo/etiqueta compacta para status, contagem e tags. | `variant`: white, outlined, soft, solid · `color`: dark, gray, green, blue, red, yellow, white · `size`: sm, md, lg · `shape`: rounded, pilled, circular · com `startIcon`/`endIcon` · com `onClose` (removível) |
| `button-icon` | `ButtonIcon` | Botão apenas-ícone (ações compactas, paginação). | `variant`: solid, soft, outline, ghost, link, pagination · `color`: primary, secondary, destructive · `size`: xs, sm, md, lg · `shape`: subtle, rounded, circled, square · estados: `loading`, `active`, `disabled` · com `badge` |
| `checkbox` | `Checkbox` | Caixa de seleção com label, descrição e feedback. | `type`: solid, soft · estados: `checked`, `indeterminate`, `disabled`, `invalid`/`error`, `success` · flags: `boxed`, `reversed`, com `feedbackMessage`, `endIcon` |
| `feedback` | `Feedback` | Mensagem inline de feedback (info/erro/sucesso). | `feedbackType`: default, info, error, success · `feedbackShow` · `disabled` |
| `field` | `FieldBase` | Wrapper de campo (label, feedback, required). Base de composição. | Sem eixos de variante; demonstrar `label`, `secondaryLabel`, `required`, `invalid`, `success`, `feedbackMessage`, `disabled` |
| `icon` | `Icon` | Ícone (Lucide + custom) com tamanho/cor semântica. | `size`: 12, 16, 20, 24, 32 · `color`: primary, secondary, destructive, success, warning, info, muted, white, currentColor · amostra de nomes de `IconName` |
| `links` | `Links` | Link estilizado (inline ou pill) com ícones. | `type`: text, pill · `color`: dark, gray, green, blue, red, yellow, light · `size`: sm, md, lg · com `startIcon`/`endIcon` · `disabled` |
| `progress` | `Progress` (+ `ProgressRoot/Track/Indicator/Value/Label/FloatingBadge`) | Barra de progresso híbrida (linear/steps). | `size`: sm, md, lg · `color`: primary, destructive · `variant`: linear, steps (+ `steps`) · `showValue`: false/true/'trailing'/'inside' · `floatingBadge`: top, bottom · `disabled` |
| `radio` | `Radio` | Botão de opção único com label/feedback. | `size`: sm, md · `type`: solid, soft · estados: `checked`, `disabled`, `invalid`, `success` · `reversed` · `feedbackMessage` |
| `spinner` | `Spinner` | Indicador de carregamento. | `variant`: line, progress, dots · `size`: sm, md, lg · `color`: primary, secondary, destructive, white, dark, current · flags: `showLabel`, `overlay` |
| `static-icon` | `StaticIcon` | Ícone dentro de um container decorado (tile). | `variant`: base, solid, soft, soft-outlined, outlined, white · `color`: dark, gray, green, blue, red, yellow, light, white · `size`: xxs–xxl · `shape`: rounded, circular |
| `switch` | `Switch` | Interruptor liga/desliga. | `variant`: solid, soft · `size`: sm, md, lg · `shape`: pill, square · flags: `showIcons`, `showSideLabels` (+ off/onLabel) · estados: `checked`, `disabled`, `invalid`, `success` |
| `text` | `Text` | Texto tipográfico (parágrafos, labels, captions). | `variant`: display-lg/display/display-sm/title-lg/title-md/title-sm/button-lg/button/button-sm/body-lg/body/body-sm/label-lg/label/label-sm/caption/caption-sm/overline · `color`: default, muted · `weight`: regular, medium, semibold, bold · `as`: div/p/span/label/small |
| `title` | `TitleV2` | Heading (h1–h6). | `variant`: h1–h6 · `color`: default, muted · `weight`: medium, semibold, bold |

> Extras do módulo Progress a demonstrar na mesma página `progress` (ou entradas próprias): `ActivityIndicator` (indicador circular com tendência) e `SignalBars` (barras de sinal). Decisão: documentar como seções extras dentro de `progress`.

### Molecules (18 pastas)

| Slug | Export | Descrição curta | Opções a mostrar |
|---|---|---|---|
| `accordion` | `Accordion` | Painéis colapsáveis. | `variant`: plain, bordered, divider, active-bordered · `icon`: plus-minus, chevron, none · `iconPosition`: start, end · flags: `multiple`, `disabled` |
| `breadcrumb` | `Breadcrumb` | Trilha de navegação. | `variant`: base, bordered · `size`: sm, md, lg · itens com `active`, `startIcon`/`endIcon`, `dropdownItems`, layout colapsado (dots/dropdown) |
| `button` | `Button` | Botão de ação primário. | `variant`: solid, soft, outline, ghost, link · `color`: primary, secondary, destructive · `size`: sm, md, lg · `roundness`: default, round · flags: `loading`, `fullWidth`, `disabled` · com `leadingIcon`/`trailingIcon` |
| `button-group` | `ButtonGroup` | Agrupa botões (joined/spaced). | `orientation`: horizontal, vertical · `variant`: joined, spaced |
| `dropdown` | `Dropdown` | Menu suspenso rico (itens, switch, select, headings). | `size`: xs, sm, md, lg · `variant`: outline, ghost · `side`: top/right/bottom/left · `align`: start/center/end · tipos de item: item, action, switch, select, divider, heading, footer · `openOnHover`, `header` |
| `input` | `Input` | Campo de texto. | `variant`: bordered, gray, underline · `size`: sm, md, lg · `shape`: rounded, none, pilled · estados: `invalid`, `success`, `disabled`, `readOnly` · com `startIcon`/`endIcon`, dividers, `feedbackMessage` |
| `input-group` | `InputGroup` | Agrupa inputs num layout compartilhado. | `layout` (INPUT_GROUP_LAYOUTS) · `gap` (INPUT_GROUP_GAPS) · `width` · `feedbackType`/`feedbackMessage` |
| `list-group` | `ListGroup` | Lista de itens (nav/estatísticas). | `variant`: basic, flush, bordered, striped, striped-bordered · `layout`: vertical, horizontal · `gutters` · itens com `icon`, `badge`, `active`, `disabled`, `href` |
| `lists` | `Lists` | Listas estilizadas (disc/decimal/inline/icon/checked). | `variant`: disc, decimal, inline, icon, checked · `separator`: dot, slash · `markerVariant`: simple, white, soft, soft-outlined, solid, outlined · `shape`: circle, rounded · `color`: dark, gray, green, blue, red, yellow, light |
| `popover` | `Popover` | Painel flutuante ancorado a um trigger. | `side`: top/right/bottom/left · `align`: start/center/end · `padding`: default, none · flags: `showArrow`, `openOnHover`(via Dropdown n/a), `sideOffset` |
| `radio-group` | `RadioGroup` | Grupo de radios com layout/feedback. | `orientation`: vertical, horizontal · `variant`: plain, boxed, list · `size`: sm, md · `type`: solid, soft · estados: `invalid`, `success`, `disabled` |
| `select` | `Select`, `Combobox` | Seleção (listbox) e combobox com filtro. | `type`: bordered, gray, underline, ghost · `size`: sm, md, lg · `shape`: rounded, none · flags: `multiple` (+ `multiSelectVariant`: badge/text), `searchable`, `loading`, `disabled`, `invalid`, `success` · Combobox: `clearable`, `limit`, `emptyMessage` |
| `select-group` | `SelectGroup` | Agrupa selects (mesmo padrão do InputGroup). | `layout` (SELECT_GROUP_LAYOUTS) · `gap` (SELECT_GROUP_GAPS) · `width` · feedback compartilhado |
| `switch-group` | `SwitchGroup` | Agrupa switches com label/feedback compartilhados. | Props do grupo + herda eixos do `Switch` |
| `tabs` | `Tabs` | Navegação por abas com painéis. | `variant`: base, bordered, segment, pills, pillsGray · `orientation`: horizontal, vertical · `size`: sm, md · `fullWidth` · itens com `icon`, `badge`, `disabled` |
| `textarea` | `Textarea` | Campo de texto multilinha. | `variant`: bordered, gray, underline · `size`: sm, md, lg · `shape`: rounded, none · estados: `invalid`, `success` · `showCount` · `feedbackMessage` |
| `toast` | `Toast`, `ToastProvider`, `useToast` | Notificação temporária. | `variant`: success, warning, info, error, neutral · `appearance`: solid, soft, white · `size`: default, compact · `position` (TOAST_POSITIONS) · demo interativa via `useToast` |
| `tooltip` | `Tooltip` | Dica flutuante em hover/focus. | `placement`: 13 valores (top/right/bottom/left + start/end + none) · `variant`: default, light · `delay`, `disabled` |

### Organisms (11 pastas)

| Slug | Export | Descrição curta | Opções a mostrar |
|---|---|---|---|
| `alert` | `AlertV2.*` | Bloco de alerta composto (compound API). | `type`: solid, soft, white · `color`: dark, gray, green, blue, red, yellow, light · `bordered`: none, top, left · slots: Icon, Avatar, FeaturedIcon, Header, Title, Subtitle, Description, Actions, Close |
| `card` | `Card` (+ 15 subcomponentes) | Cartão híbrido (por props ou composição). | `size`: default, compact · flags: `row`, `topBorder`, `overlay`, `centered`, `scrollable` · props: `title`, `subtitle`, `image`, `actions`, `menu`, `footer` · composição: `CardRoot/Header/Image/Body/Title/Subtitle/Description/Actions/Content/Footer/Menu` |
| `date-picker` | `DatePicker` | Seletor de data (single/range) com presets. | `mode`: single, range · `presets`: today, yesterday, last7, last30, thisMonth, lastMonth, custom · `minDate`/`maxDate` · `disabled` |
| `dialog` | `Dialog` | Modal com header/footer fixos. | `size`: sm, md, lg, full · flags: `showCancel`, `showCloseButton`, `closeOnEsc`, `closeOnOverlayClick` · `confirmColor`/`confirmVariant`/`confirmLoading` (demo controlada por estado) |
| `drawer` | `Drawer` | Painel lateral deslizante. | `position`: left, right, top, bottom · `size`: sm, md, lg · flags: `closeOnEsc`, `closeOnOverlayClick`, `showCloseButton` (demo controlada) |
| `file-input` | `FileInput` | Campo de upload de arquivo. | `variant`: bordered, gray, underline · `size`: sm, md · `shape`: rounded, none, pilled · estados: `invalid`, `success`, `loading`, `disabled` · `multiple`, `accept` |
| `file-upload-progress` | `FileUploadProgress`, `FileUploadProgressCard` | Linha/card de progresso de upload. | `status`: uploading, paused, success, error · `progress` · ações: pause/resume/cancel/retry/remove · Card com `expanded` e ações em lote |
| `stepper` | `Stepper` | Indicador de etapas. | `variant`: linear, left, center · status do item: pending, active, completed, error, success · `activeIndex`, `error`, `success` |
| `table` | `Table`, `useServerTable` | Tabela de dados (TanStack Table). | Demonstrar `config` (colunas), `header`, `headerActions`, `rowActions`, `onRowClick`, paginação; menção a `useServerTable` para dados remotos |
| `timeline` | `Timeline`, `TimelineItem` | Linha do tempo de eventos. | `orientation`: vertical, horizontal · status do item: default, active, completed, error · `marker`, `date`, `description` |
| `tree-view` | `TreeView` | Árvore hierárquica (folders/checkbox). | item `icon`: folder, checkbox · flags por nó: `opened`, `checked`, `disabled` · controlado via `openedValues`/`checkedValues`/`selectedValue` |

**Total: 44 entradas** (15 Atoms + 18 Molecules + 11 Organisms).

---

## Task Breakdown

### Task 1 — Scaffolding de rotas e layout `/components`

**Objetivo:** Criar a estrutura de rotas e o layout de duas colunas.

**Implementação:**
1. Criar `src/routes/components.tsx` — layout route `createFileRoute('/components')` que renderiza `<Sidebar />` + `<Outlet />` num container flex (sidebar fixa/sticky à esquerda, conteúdo rolável à direita).
2. Criar `src/routes/components/index.tsx` — landing: uma intro curta do design system + (opcional) redirect para o primeiro componente (`/components/avatar`) via `beforeLoad`/`redirect` do TanStack, ou uma tela de boas-vindas.
3. Criar `src/routes/components/$componentId.tsx` — lê `useParams`, resolve via `getBySlug(componentId)` do registry; se não existir, renderiza estado "componente não encontrado".
4. Deixar `routeTree.gen.ts` ser regenerado pelo plugin (rodar `pnpm dev`/`pnpm build` regenera). Não editar à mão.

**Verificação:** `/components`, `/components/button` e um slug inválido resolvem corretamente. Build passa.

> **Nota (observada na implementação):** com todos os componentes importados estaticamente, o bundle passa de 500 kB e o Vite emite aviso de chunk grande. Não é bloqueante, mas nas Tasks 5/6 vale considerar **code-splitting por componente** (ex.: `React.lazy` + `import()` nos showcases do registry, ou `build.rolldownOptions.output.codeSplitting`) para reduzir o bundle inicial da galeria.
>
> **Decisão (Task 6):** o peso do bundle vem majoritariamente da própria lib `@poliedro/tamentai` e suas dependências (`@base-ui/react`, `lucide-react`, `date-fns`), que a galeria carrega de qualquer forma ao importar os componentes. Fazer `React.lazy` apenas dos 44 showcases traria ganho marginal no carregamento inicial e adicionaria complexidade de `Suspense`. Optou-se por **não** fazer o split por showcase agora; se o carregamento inicial virar problema, o caminho mais efetivo é dividir por rota (`/components` separada das demais) via `build.rolldownOptions.output.codeSplitting`.

---

### Task 2 — Registry central de componentes

**Objetivo:** Fonte única de verdade para metadados + showcases.

**Implementação:**
1. Criar `registry/types.ts` (`ComponentEntry`, `ComponentLayer`).
2. Criar `registry/index.ts` que concatena `atoms`, `molecules`, `organisms` em `COMPONENTS: ComponentEntry[]` e expõe `getBySlug(slug)` e `getGroups()` (agrupado por `layer`, preservando ordem).
3. Criar os três arquivos de entries (`atoms.tsx`, `molecules.tsx`, `organisms.tsx`) com o esqueleto de cada entrada (slug, name, layer, description, `Showcase` inicialmente placeholder). Descrições em pt-BR conforme a tabela do catálogo.

**Verificação:** `COMPONENTS.length === 44`; slugs únicos; todos com `Showcase` definido.

---

### Task 3 — Sidebar (menu lateral)

**Objetivo:** Menu navegável agrupado por camada, com item ativo destacado.

**Implementação:**
1. `Sidebar.tsx`: consome `getGroups()`, renderiza seções "Atoms / Molecules / Organisms" com `Link to="/components/$componentId"`.
2. Destacar item ativo via `activeProps` do TanStack `Link`.
3. Campo de busca (filtra por `name`/`slug`) usando `Input` do Tamentai (`startIcon` de lupa).
4. `Sidebar.module.css`: coluna sticky, scroll independente, responsiva (colapsa em `Drawer`/menu no mobile — pode ficar como refinamento na Task 6).

**Verificação:** Clicar num item navega e destaca; busca filtra a lista.

---

### Task 4 — `ComponentPage` + primitivas de showcase

**Objetivo:** Renderizar a explicação + os showcases de forma consistente.

**Implementação:**
1. `ComponentPage.tsx`: recebe `ComponentEntry`; renderiza `TitleV2` (nome) + `Text` (descrição) no topo, depois `<entry.Showcase />`.
2. `ShowcaseSection.tsx`: bloco com título do eixo (ex.: "Variants", "Sizes", "States") + área de exemplos (grid com gap). Cada exemplo pode ter um `Badge`/`Text` legenda com o valor da prop.
3. `PropMatrix.tsx` (helper): dado um array de valores e uma render-fn, mapeia cada valor para um exemplo rotulado — reduz boilerplate nos showcases.

**Verificação:** Uma página exemplo (ex.: Button) renderiza título, descrição e uma seção por eixo.

---

### Task 5 — Preencher os showcases (por camada)

**Objetivo:** Implementar o `Showcase` de cada um dos 44 componentes cobrindo todos os eixos da tabela do catálogo.

**Implementação (subdividir por PRs/commits):**
- 5a. Atoms (15) — usar `PropMatrix` para variant/color/size/shape/state.
- 5b. Molecules (18) — incluir demos interativas onde necessário (`Toast` via `useToast`, `Tabs`, `Dropdown`, `Select`/`Combobox`).
- 5c. Organisms (11) — demos controladas por estado local (`Dialog`, `Drawer`, `DatePicker`, `TreeView`, `Table`, `Stepper`, `Timeline`, `FileUploadProgress`, `Alert` compound, `Card` props + composição, `FileInput`).

**Regras:**
- Todo exemplo usa o componente real do Tamentai, sem recriar UI na mão.
- Mostrar cada valor de cada union type (variant/color/size/shape/state/orientation/placement).
- Estados booleanos relevantes (`loading`, `disabled`, `invalid`, `success`, `checked`, `active`) ganham exemplos próprios.
- Atenção aos exports renomeados: `TitleV2`, `Textarea`, `AlertV2.*`, `SyntheticButtonV2`.

**Verificação:** Navegar por todos os slugs; cada página exibe descrição + todos os eixos sem erro de runtime; `pnpm build` sem erros de tipo.

---

### Task 6 — Integração, Header e polish

**Objetivo:** Ligar a galeria ao app e refinar UX.

**Implementação:**
1. Adicionar link "Components" (`Link to="/components"`) no `src/components/Header/Header.tsx`, com `activeProps`.
2. Responsividade da sidebar (colapsar em `Drawer` no mobile; toggle via `ButtonIcon`).
3. Estados vazios/erro (slug inválido) elegantes usando `AlertV2` ou `Card`.
4. Consistência tipográfica (`TitleV2`/`Text`) e espaçamento entre seções.
5. Limpeza: sem `console.log`; imports corretos; sem CSS competindo com o DS (CSS Modules só para layout).

**Verificação final:**
- `/components` acessível pelo Header.
- Todos os 44 slugs funcionam.
- `pnpm build` sem erros.
- Sidebar responsiva.

---

## Verificação global (Definition of Done)

- [ ] Rota `/components` com sidebar + conteúdo em duas colunas.
- [ ] Sidebar lista os 44 componentes agrupados por camada, com item ativo destacado e busca.
- [ ] `/components/<slug>` exibe descrição + todos os eixos de opções do componente.
- [ ] Link "Components" no Header.
- [ ] `pnpm build` sem erros de tipo/lint.
- [ ] Nenhuma UI recriada manualmente onde há componente Tamentai equivalente.

---

## Referências

- `@poliedro/tamentai` v1.0.2 — entry `@poliedro/tamentai/web` (`dist/components-v2`, camadas Atoms/Molecules/Organisms).
- [TanStack Router](https://tanstack.com/router/latest) — file-based routing (`createFileRoute`, layout route com `Outlet`, `$param`).
- Padrões existentes no projeto: `src/routes/shop.tsx` (+ `src/routes/shop/`), `src/routes/__root.tsx`, `src/main.tsx`.
