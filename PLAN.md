# Plano de Implementação — DummyJson E-commerce Playground (Tamentai DS)

## Problem Statement

Transformar o playground atual para demonstrar o design system Tamentai v1.0.0-beta.11 através de uma experiência de e-commerce real, consumindo a API do DummyJson. A Home continua existindo, mas os links de playground apontam exclusivamente para a nova experiência. O estilo visual é inspirado na Lululemon (grid de produtos com filtros, visual premium/minimalista). Um carrinho virtual com React Context + localStorage demonstra state management.

---

## Requirements

1. Manter a Home page existente (HeroSection + BentoGrid), atualizando apenas o PlaygroundLinks para referenciar a nova experiência DummyJson
2. Ocultar as rotas do playground antigo (não remover código, apenas tirar do router)
3. Criar uma página de produtos estilo Lululemon: grid de cards, filtro por categoria, ordenação
4. Carrinho virtual usando React Context + localStorage
5. Usar todos os componentes Tamentai disponíveis na beta.11 em composições harmônicas
6. Até 2 features extras para demonstrar capacidades do DS
7. Atualizar versão referenciada no hero badge para beta.11

---

## Background

- O projeto já tem TanStack Router configurado com file-based routing
- Componentes disponíveis no Tamentai: Avatar, AvatarGroup, Badge, Button, ButtonIcon, Card, CardHeader/Title/Description/Content, Checkbox, Combobox, Icon, Input, InputGroup, Progress, Select, SignalBars, Spinner, Switch, Table, Toast, Tooltip, ActivityIndicator
- API DummyJson: `/products` (paginação via limit/skip), `/products/search?q=`, `/products/categories`, `/products/category/{slug}`, `/products/{id}` (inclui reviews com rating)
- Cada produto tem: id, title, description, price, discountPercentage, rating, stock, thumbnail, images[], category, brand, tags[], reviews[]

---

## Proposed Solution

Criar 3 novas rotas (`/shop`, `/shop/product/$productId`, `/shop/cart`) com layout premium minimalista inspirado na Lululemon. A Home terá os PlaygroundLinks atualizados apontando para `/shop`. O carrinho será gerenciado por um `CartContext` com persistência em localStorage.

Features extras escolhidas:
1. **Busca global com Combobox** — demonstra Combobox com busca via API, autocomplete e navegação por resultado
2. **Wishlist com Switch e persistência** — demonstra Switch, Badge de contagem, ButtonIcon e Toast

---

## Arquitetura

```mermaid
graph TD
    A[main.tsx - RouterProvider + ToastProvider + CartProvider] --> B[__root.tsx - Header Global + Outlet]
    B --> C[/ - Home Page existente com links atualizados]
    B --> D[/shop - Página de Produtos]
    B --> E[/shop/product/$productId - Detalhes do Produto]
    B --> F[/shop/cart - Carrinho]
    
    D --> D1[Barra de Busca - Combobox]
    D --> D2[Filtros por Categoria - Select/Badge]
    D --> D3[Grid de Product Cards]
    D --> D4[Paginação]
    
    E --> E1[Galeria de Imagens]
    E --> E2[Info + Add to Cart]
    E --> E3[Reviews com Rating Bars]
    
    F --> F1[Lista de Items]
    F --> F2[Resumo do Pedido]
    F --> F3[Ações - Quantidade/Remover]
```

---

## Estrutura de Arquivos Proposta

```
src/
├── routes/
│   ├── __root.tsx              # Atualizado - Header com link Shop + Cart badge
│   ├── index.tsx               # Mantido - PlaygroundLinks atualizado
│   ├── shop.tsx                # Nova rota - Layout do shop (outlet para sub-rotas)
│   ├── shop/
│   │   ├── index.tsx           # Listagem de produtos
│   │   ├── product.$productId.tsx  # Detalhes do produto
│   │   └── cart.tsx            # Carrinho
│   └── _playground.tsx         # Oculto do router (prefixo _ = ignorado pelo TanStack)
├── contexts/
│   ├── ToastContext.tsx        # Mantido
│   ├── CartContext.tsx         # Novo - Cart state + localStorage
│   └── WishlistContext.tsx     # Novo - Wishlist state + localStorage
├── components/
│   ├── Header/                 # Atualizado - novo nav
│   ├── Home/                   # Mantido (PlaygroundLinks atualizado)
│   ├── Shop/
│   │   ├── ProductCard.tsx     # Card de produto (thumbnail, preço, rating)
│   │   ├── ProductCard.module.css
│   │   ├── ProductGrid.tsx     # Grid responsivo com skeleton loading
│   │   ├── ProductGrid.module.css
│   │   ├── CategoryFilter.tsx  # Filtro por categoria com Badges
│   │   ├── SearchBar.tsx       # Combobox de busca global
│   │   ├── ProductDetail.tsx   # Layout de detalhes
│   │   ├── ProductDetail.module.css
│   │   ├── ReviewSection.tsx   # Reviews com rating bars
│   │   ├── CartItem.tsx        # Item do carrinho
│   │   ├── CartSummary.tsx     # Resumo/totais
│   │   ├── CartBadge.tsx       # Badge no header com quantidade
│   │   └── GlobalSearch.tsx    # Combobox de busca global no header
│   └── Playground/             # Mantido (não deletado)
├── hooks/
│   └── useDummyJson.ts        # Hook para fetch da API DummyJson
└── types/
    └── product.ts             # Tipos TypeScript para produtos/carrinho
```

---

## Task Breakdown

### Task 1: Criar tipos TypeScript e hook de API do DummyJson

**Objetivo:** Estabelecer a camada de dados tipada e hook de fetching para a API DummyJson.

**Implementação:**
1. Criar `src/types/product.ts` com interfaces: `Product`, `ProductReview`, `ProductsResponse`, `Category`, `CartItem`
2. Criar `src/hooks/useDummyJson.ts` com funções:
   - `fetchProducts(params: { limit, skip, category?, sortBy?, order? })` → `ProductsResponse`
   - `fetchProduct(id: number)` → `Product`
   - `fetchCategories()` → `Category[]`
   - `searchProducts(query: string)` → `ProductsResponse`
3. Usar `useState` + `useEffect` pattern (sem lib externa de fetching)
4. Tipar todos os retornos da API conforme documentação DummyJson

**Verificação:** Criar um componente temporário que renderiza dados de `fetchProducts` e `fetchCategories` no console. Verificar tipagem no build (`pnpm build`).

**Demo:** Ao rodar `pnpm dev`, os dados da API DummyJson são fetchados e logados no console corretamente, com tipagem completa.

---

### Task 2: Criar o CartContext com persistência em localStorage

**Objetivo:** Implementar state management do carrinho usando React Context + localStorage.

**Implementação:**
1. Criar `src/contexts/CartContext.tsx` com:
   - Interface `CartItem`: `{ product: Product, quantity: number }`
   - State: `items: CartItem[]`
   - Actions: `addToCart(product, quantity?)`, `removeFromCart(productId)`, `updateQuantity(productId, quantity)`, `clearCart()`
   - Derivados: `totalItems`, `totalPrice`, `isInCart(productId)`
   - Persistência: `useEffect` para salvar em `localStorage` key `'tamentai-cart'`
   - Inicialização: ler do `localStorage` no mount (com try/catch para JSON inválido)
2. Atualizar `src/main.tsx` para wrapping com `CartProvider`
3. Exportar hook `useCart()` para consumo nos componentes

**Verificação:** Adicionar/remover items via console ou componente temporário. Recarregar a página e verificar que o state persiste.

**Demo:** O carrinho persiste dados entre reloads do browser. Actions de add/remove/update funcionam corretamente.

---

### Task 3: Configurar rotas do Shop e ocultar playground antigo

**Objetivo:** Criar a estrutura de rotas para o shop e remover o playground antigo da navegação.

**Implementação:**
1. Criar `src/routes/shop.tsx` como layout route (com `Outlet`) — wrapper minimalista
2. Criar `src/routes/shop/index.tsx` com placeholder
3. Criar `src/routes/shop/product.$productId.tsx` com placeholder
4. Criar `src/routes/shop/cart.tsx` com placeholder
5. Remover o arquivo `src/routes/playground.tsx` do router (renomear para `_playground.tsx` com underscore para que o TanStack Router ignore)
6. Atualizar `src/components/Header/Header.tsx`:
   - Trocar link "Playground" por "Shop" apontando para `/shop`
   - Adicionar `CartBadge` (ícone de sacola com badge de quantidade) usando componentes Tamentai (`ButtonIcon` + `Badge`)
7. Atualizar `src/components/Home/PlaygroundLinks.tsx`:
   - Trocar os 3 cards antigos por novos que referenciam a experiência DummyJson:
     - "Catálogo de Produtos" → `/shop`
     - "Detalhes & Reviews" → `/shop` (com menção à feature)
     - "Carrinho Virtual" → `/shop/cart`

**Verificação:** Navegar entre `/`, `/shop`, `/shop/cart`. Header atualizado. Playground antigo inacessível via navegação (mas código intacto). Build sem erros.

**Demo:** Navegação fluída entre Home → Shop → Cart via header e links. Rotas antigas ocultas.

---

### Task 4: Implementar a página de listagem de produtos (grid estilo Lululemon)

**Objetivo:** Criar a página principal do shop com grid de produtos, filtro por categoria e ordenação.

**Implementação:**
1. Criar `src/components/Shop/CategoryFilter.tsx`:
   - Barra horizontal de `Badge` components (um por categoria) — scroll horizontal em mobile
   - Badge "Todos" ativo por default
   - Usar variantes `solid` (ativo) e `outlined` (inativo) para indicar seleção
   - Fetch das categorias via `fetchCategories()`
2. Criar `src/components/Shop/ProductCard.tsx` + CSS Module:
   - Card com imagem (thumbnail) em aspect-ratio 3:4 (estilo fashion e-commerce)
   - Hover: scale sutil na imagem + mostrar botão "Add to Cart"
   - Informações: title, brand (como Badge), preço com desconto riscado, rating (estrelas com Progress)
   - Usar `Card` do Tamentai como base, `Badge` para brand/tags, `Button` para add-to-cart
   - `Tooltip` no preço com desconto mostrando % off
3. Criar `src/components/Shop/ProductGrid.tsx` + CSS Module:
   - CSS Grid: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` com gap
   - Loading state com `Spinner`
   - Empty state com mensagem
4. Criar `src/components/Shop/SearchBar.tsx`:
   - `Combobox` do Tamentai com busca via API (`/products/search?q=`)
   - Debounce de 400ms
   - Ao selecionar, navega para `/shop/product/{id}`
5. Integrar tudo em `src/routes/shop/index.tsx`:
   - Header da página: título + `SearchBar`
   - `CategoryFilter` abaixo
   - Ordenação com `Select` (price asc/desc, rating, title)
   - `ProductGrid` com paginação (botão "Carregar mais" usando `Button`)
   - Usar `limit=12` com skip incremental

**Verificação:** Grid renderiza 12 produtos. Filtro por categoria funciona. Ordenação funciona. Busca navega para detalhe. Responsivo em 3-4 breakpoints.

**Demo:** Página `/shop` com grid de produtos estilizado, filtros por categoria via badges, busca com autocomplete, e botão de load more. Visual clean e premium.

---

### Task 5: Implementar a página de detalhes do produto

**Objetivo:** Criar uma página de detalhe rico com galeria, informações e reviews.

**Implementação:**
1. Criar `src/components/Shop/ProductDetail.tsx` + CSS Module:
   - Layout 2 colunas (60/40): galeria à esquerda, info à direita
   - Galeria: imagem principal grande + thumbnails menores clicáveis
   - Info: title, brand (`Badge`), preço (com desconto em vermelho + preço original riscado), rating (estrelas), stock status (`Badge` verde/amarelo/vermelho), description
   - Ações: Quantity selector (`Input` type number ou buttons +/-) + `Button` "Adicionar ao Carrinho" (solid, full width, size lg)
   - `Tooltip` em informações de shipping/warranty
   - Breadcrumb manual: Home > Shop > {Category} > {Product} (usando `Button` variant="link" ou texto estilizado)
2. Criar `src/components/Shop/ReviewSection.tsx`:
   - Rating overview: média + barras de `Progress` (5 star → 1 star) mostrando distribuição
   - Lista de reviews: `Avatar` (placeholder com initials do reviewer name) + nome + data + rating + comment
   - Usar `Card` para cada review, `Badge` para rating
3. Integrar em `src/routes/shop/product.$productId.tsx`:
   - Fetch via `fetchProduct(productId)`
   - Loading com `Spinner`
   - Compor `ProductDetail` + `ReviewSection`
4. Integrar com `useCart()` para o botão de adicionar ao carrinho
5. Toast de sucesso ao adicionar ("Produto adicionado ao carrinho")

**Verificação:** Clicar num produto do grid navega para `/shop/product/1`. Detalhes renderizados. Galeria funcional. Add-to-cart atualiza o CartBadge no header. Toast aparece.

**Demo:** Página de detalhes completa com galeria de imagens, info do produto, reviews com rating bars, e integração com carrinho + toast de feedback.

---

### Task 6: Implementar a página do carrinho

**Objetivo:** Criar a página do carrinho com lista de items, controle de quantidade e resumo.

**Implementação:**
1. Criar `src/components/Shop/CartItem.tsx`:
   - Layout row: thumbnail (64px) + info (title, brand, price unitário) + quantity controls (ButtonIcon -/+, Input com valor) + subtotal + botão remover (ButtonIcon com ícone Trash, variant ghost, color destructive)
   - `Tooltip` no botão remover ("Remover do carrinho")
2. Criar `src/components/Shop/CartSummary.tsx`:
   - Card com resumo: subtotal, desconto estimado, total
   - `Button` "Finalizar Compra" (solid, lg) — ao clicar, mostra Toast de sucesso e limpa carrinho
   - `Badge` com quantidade total de items
   - `Progress` mostrando quanto falta para frete grátis (ex: "Faltam R$X para frete grátis!" — apenas visual demo)
3. Integrar em `src/routes/shop/cart.tsx`:
   - Se carrinho vazio: empty state com ícone, mensagem e `Button` "Continuar Comprando" → `/shop`
   - Se tem items: lista + summary side-by-side (responsivo: collapsa em mobile)
4. Toast notifications:
   - Ao remover item: Toast warning "Item removido"
   - Ao limpar carrinho: Toast info "Carrinho limpo"
   - Ao "finalizar": Toast success "Pedido realizado com sucesso!"

**Verificação:** Adicionar items via detalhe do produto. Navegar para `/shop/cart`. Ajustar quantidades. Remover items. "Finalizar compra". Empty state. Persistência após reload.

**Demo:** Carrinho funcional completo com CRUD de items, feedback via Toasts, resumo financeiro, e empty state elegante.

---

### Task 7: Feature extra 1 — Busca global com Combobox no Header

**Objetivo:** Adicionar busca global no header usando Combobox do Tamentai com search via API.

**Implementação:**
1. Criar `src/components/Shop/GlobalSearch.tsx`:
   - `Combobox` compacto (size sm, variant gray) posicionado no centro do header
   - Busca via `/products/search?q=` com debounce de 400ms
   - Options mostram thumbnail + title + price
   - Ao selecionar, navega para `/shop/product/{id}` via `useNavigate()`
   - Loading state integrado do Combobox
   - Placeholder: "Buscar produtos..."
   - Icon leading: Search
2. Atualizar Header para incluir `GlobalSearch` entre logo e nav
3. Responsivo: em mobile, substituir por `ButtonIcon` de search que expande o Combobox

**Verificação:** Digitar "phone" no header → autocomplete aparece → clicar navega para produto. Funciona em todas as rotas do shop.

**Demo:** Busca global fluída no header com autocomplete usando Combobox do Tamentai — demonstra integração de busca via API em tempo real.

---

### Task 8: Feature extra 2 — Wishlist com Switch e persistência

**Objetivo:** Adicionar funcionalidade de wishlist demonstrando Switch, Badge de contagem e Toast.

**Implementação:**
1. Criar `src/contexts/WishlistContext.tsx`:
   - State: `items: Product[]`
   - Actions: `toggleWishlist(product)`, `isWishlisted(productId)`, `clearWishlist()`
   - Persistência em localStorage key `'tamentai-wishlist'`
2. Criar ícone de coração nos `ProductCard`:
   - `ButtonIcon` com Heart icon (Lucide)
   - Estilo: preenchido em vermelho se wishlisted, outline se não
   - Toast ao adicionar/remover ("Adicionado aos favoritos" / "Removido dos favoritos")
3. Adicionar `Switch` na página de listagem:
   - "Mostrar apenas favoritos" — filtra o grid localmente
   - Usar `Switch` component do Tamentai
4. Adicionar badge de contagem de wishlist no header (ao lado do cart badge)
5. Wrapping com `WishlistProvider` no `main.tsx`

**Verificação:** Clicar coração no ProductCard → Toast + ícone muda. Switch "favoritos" filtra grid. Badge no header atualiza. Persistência após reload.

**Demo:** Wishlist funcional com toggle visual (ícone de coração), switch de filtro, e feedback via Toasts — demonstra composição de Switch, ButtonIcon, Badge e Toast em cenário real.

---

### Task 9: Polish visual e integração final

**Objetivo:** Refinamentos visuais para alcançar o visual premium Lululemon-inspired e garantir harmonia entre componentes.

**Implementação:**
1. **Tema visual do shop:**
   - Paleta neutra e clean: fundo branco, texto escuro, acentos sutis
   - Tipografia Geist para headings, Inter para body
   - Espaçamento generoso (padding 2-3rem), grid com gap adequado
   - Imagens com border-radius sutil e object-fit: cover
2. **Micro-interações:**
   - Hover no ProductCard: image scale + overlay sutil + botão "Add" aparece
   - Transição suave ao mudar de categoria (opacity fade)
   - CartBadge com bounce animation ao adicionar item
3. **Responsividade:**
   - Grid: 4 colunas desktop → 3 tablet → 2 mobile → 1 small mobile
   - Header: colapsa busca em mobile
   - Detalhes: 2 colunas → 1 coluna stack
   - Carrinho: side-by-side → stack
4. **Atualizar HeroSection:**
   - Badge de versão para `v1.0.0-beta.11`
   - CTA secundário mudar de "Playground" para "Ver Shop →" apontando para `/shop`
5. **Limpeza:**
   - Mover `src/routes/playground.tsx` para `src/routes/_playground.tsx` (TanStack Router ignora routes com `_` prefix)
   - Garantir que build passa sem erros
   - Sem console.log em produção
6. **Verificação final:**
   - Fluxo completo: Home → Shop → Filtrar → Buscar → Detalhe → Add to Cart → Cart → Finalizar
   - Wishlist: favoritar → filtrar → ver badge
   - Persistência: reload em qualquer ponto mantém estado do carrinho/wishlist
   - `pnpm build` sem erros
   - Responsividade em 4 breakpoints

**Verificação:** Build passing. Todos os fluxos funcionais. Visual consistente e premium. Performance adequada (sem re-renders desnecessários).

**Demo:** Experiência completa e polida de e-commerce demonstrando todos os componentes Tamentai em harmonia — uma demonstração convincente do design system.

---

### Task 10: Auditoria de uso do Tamentai — garantir máximo aproveitamento do DS

**Objetivo:** Revisar todo o código produzido nas tasks anteriores para garantir que nenhum elemento de UI foi criado "do zero" quando existe um componente equivalente em `@poliedro/tamentai/web`. Maximizar o uso da lib e eliminar implementações manuais redundantes.

**Implementação:**
1. **Auditoria de imports:** Verificar em cada arquivo se todo componente visual vem de `@poliedro/tamentai/web`. Buscar por elementos HTML nativos (`<button>`, `<input>`, `<select>`, `<table>`, etc.) que poderiam ser substituídos por componentes Tamentai.
2. **Checklist de substituições comuns:**
   - `<button>` → `Button` ou `ButtonIcon`
   - `<input>` → `Input`
   - `<select>` → `Select`
   - Texto com estilo de heading → `Title` (se disponível)
   - Texto com estilo de paragrafo → `Text` (se disponível)
   - Links estilizados → `Button` variant="link" ou `Links` (se disponível)
   - Loading spinners manuais (CSS keyframes) → `Spinner`
   - Divisores/separadores manuais → verificar se há componente
   - Breadcrumb manual (spans/links) → `Breadcrumb` (se disponível no beta.11)
   - Alertas/feedback inline → `Alert` (se disponível)
   - Toggle/switch customizado → `Switch`
   - Abas/tabs manuais → `Tabs` (se disponível)
3. **Verificar padrões de composição:**
   - `Card` com `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` em vez de divs manuais
   - `InputGroup` para agrupamentos de inputs em vez de flex containers manuais
   - `Badge` para qualquer label/tag em vez de spans estilizados
   - `Tooltip` em todos os ícones de ação e informações contextuais
   - `Progress` para qualquer barra de progresso em vez de divs com width%
4. **Verificar consistência de props:**
   - Todos os `Button` usando props corretas: `variant`, `color`, `size`, `roundness`
   - Todos os `Badge` usando `variant` (solid/soft/outlined), `color`, `shape`, `size`
   - Todos os `Input` usando `variant` (bordered/gray/underline), `size`, feedback props
   - `Icon` via Tamentai em vez de import direto de Lucide quando possível (verificar se `Icon` com prop `name` cobre os ícones usados)
5. **Verificar que NÃO existem:**
   - CSS customizado para botões (hover, focus, active states) — deve vir do DS
   - CSS customizado para inputs (borders, focus rings) — deve vir do DS
   - CSS customizado para cards (shadows, borders, padding) — deve vir do DS
   - Implementações manuais de tooltips, modais, selects, ou dropdowns
   - Spinners feitos com CSS @keyframes quando `Spinner` está disponível
   - Badges/chips feitos com spans estilizados quando `Badge` existe
6. **CSS Modules:** Devem conter APENAS:
   - Layout (grid, flex, gaps, padding de containers)
   - Posicionamento (absolute, sticky, z-index)
   - Responsividade (media queries para breakpoints)
   - Animações de transição entre estados (opacity, transform)
   - **NÃO** devem conter estilos que competem com o DS (cores de botão, border-radius de cards, font-sizes de labels)
7. **Documentar exceções:** Se algum elemento precisar ser customizado além do que o Tamentai oferece, documentar com comentário `/* Custom: Tamentai não cobre este caso */` explicando o motivo.

**Verificação:**
- Grep por `<button`, `<input`, `<select` em arquivos `.tsx` do shop — deve retornar zero (exceto dentro de componentes Tamentai internos)
- Grep por imports: todo arquivo de componente deve ter `import { ... } from '@poliedro/tamentai/web'` como import principal de UI
- Build sem erros após substituições
- Visual não regrediu — componentes Tamentai devem manter ou melhorar a aparência

**Demo:** Codebase onde 100% dos elementos de UI interativos e de feedback vêm do Tamentai. CSS Modules contêm apenas layout e responsividade. O playground serve como prova de que o DS cobre todos os cenários de um e-commerce real.

---

## Componentes Tamentai Utilizados (Mapa de Uso)

| Componente | Onde é usado |
|---|---|
| Avatar / AvatarGroup | ReviewSection (avatar dos reviewers) |
| Badge | CategoryFilter, ProductCard (brand/tags), CartBadge, stock status, header counters |
| Button | Add-to-cart, Load more, Finalizar compra, CTAs |
| ButtonIcon | Wishlist heart, Cart +/-, Remove item, Search mobile |
| Card | ProductCard, CartItem, CartSummary, Review items |
| Checkbox | (mantido na BentoGrid da Home) |
| Combobox | GlobalSearch, SearchBar |
| Icon | Ícones via Lucide wrapper em toda a app |
| Input | Quantity selector no carrinho, busca |
| Progress | Rating bars (reviews), frete grátis bar |
| Select | Ordenação (sort by) na listagem |
| Spinner | Loading states em todas as páginas |
| Switch | Filtro "apenas favoritos" na listagem |
| Toast | Feedback em todas as ações (add/remove cart, wishlist, checkout) |
| Tooltip | Preço com desconto, shipping info, botões de ação |
| Table | (mantido no código legado, não usado no shop) |
| ActivityIndicator | (mantido na BentoGrid da Home) |
| SignalBars | (mantido no código legado) |
| InputGroup | (mantido no código legado) |

---

## Referências

- [DummyJSON API](https://dummyjson.com/) — API de dados mock para e-commerce
- [Lululemon Category Page](https://shop.lululemon.com/c/city-essentials-bags/n1b5vqzrdci) — Inspiração visual para grid de produtos
- [TanStack Router Docs](https://tanstack.com/router/latest) — File-based routing com Vite
- Lib `@poliedro/tamentai` v1.0.0-beta.11 — Componentes disponíveis via `@poliedro/tamentai/web`
