# Plano: Reimplementacao da Table com DummyJson

## Objetivo

Reimplementar `src/TablePlayground.tsx` usando a versao atual de `Table` e `useServerTable` exportadas por `@poliedro/tamentai/web`, substituindo a integracao antiga com a PokeAPI por dados de produtos da DummyJson.

A tabela deve demonstrar:

- Busca global de produtos.
- Filtro por categoria.
- Ordenacao de coluna delegada a API.
- Paginacao server-side.
- Edicao e modificacao de linhas.

A implementacao deve continuar acessivel pela rota publica `/table` e preservar os providers e o padrao de toast do projeto.

## Diagnostico atual

- `src/TablePlayground.tsx` usa modelos proprios de Pokemon e consulta `pokeapi.co`.
- Cada pagina exige uma chamada para a listagem e varias chamadas adicionais para os detalhes dos Pokemon.
- O componente ja usa `useServerTable`, `ServerTableResponse`, selecao, ordenacao, filtros, paginacao e edicao inline, mas os parametros enviados a API atualmente consideram apenas `page` e `pageSize`.
- `src/hooks/useDummyJson.ts` ja possui `fetchProducts`, `searchProducts` e suporte a `limit`, `skip`, `category`, `sortBy` e `order`.
- `Product` e `ProductsResponse` em `src/types/product.ts` ja representam o retorno necessario.
- A DummyJson oferece leitura e endpoints de mutacao simulada (`PUT`/`PATCH`/`DELETE`), mas as alteracoes nao sao persistidas no servidor. A UI devera manter as edicoes localmente durante a sessao e informar isso ao usuario.

## Decisoes de arquitetura

1. Manter `TablePlayground.tsx` como componente principal, removendo os tipos e helpers exclusivos de Pokemon.
2. Usar `Product` como modelo da tabela e adaptar os produtos para uma linha pronta para exibicao somente quando isso simplificar celulas customizadas.
3. Manter `useServerTable` como fonte de estado de pagina, ordenacao, busca e selecao, depois confirmar no tipo instalado os nomes exatos dos parametros serializados.
4. Usar `fetchProducts` para listagem, categoria, paginacao e ordenacao.
5. Usar `searchProducts` quando houver busca global. A busca deve ser combinada com categoria se o contrato da DummyJson nao suportar os dois filtros no mesmo endpoint; nesse caso, definir explicitamente a precedencia e a estrategia no adaptador.
6. Debounce da busca global para evitar uma requisicao a cada tecla, com cancelamento/logica de request obsoleto para nao sobrescrever resultados mais novos.
7. Manter as edicoes em um mapa local por `product.id`, mesclando-as nas linhas retornadas pela API. Ao salvar, chamar o endpoint de mutacao da DummyJson e atualizar o mapa local apenas em caso de sucesso.
8. Nao tratar a resposta simulada da DummyJson como persistencia real. Exibir toast de sucesso informando que a alteracao foi aplicada na demonstracao; em erro, manter a linha original.

## Fases de implementacao

### 1. Confirmar o contrato atual da Table

- Inspecionar os tipos exportados de `@poliedro/tamentai/web` usados por `Table`, `useServerTable`, `HeaderProps`, `RowActionsProps` e `ServerTableResponse`.
- Confirmar o formato real de `queryParams` para:
  - pagina atual;
  - tamanho da pagina;
  - busca global;
  - filtro por coluna/categoria;
  - ordenacao e direcao.
- Confirmar os callbacks de save, cancel e delete das acoes por linha.
- Reutilizar os nomes e opcoes suportados pela versao instalada, removendo opcoes antigas que nao existirem mais.

### 2. Preparar o adaptador DummyJson

- Criar ou ajustar funcoes tipadas no hook `useDummyJson.ts` para:
  - buscar produtos por `limit` e `skip`;
  - buscar por texto global;
  - buscar por categoria;
  - ordenar por um campo permitido pela API;
  - atualizar e remover produto usando `PATCH`/`DELETE` de demonstracao.
- Centralizar a montagem de URLs e tratamento de respostas HTTP.
- Garantir que categoria use o `slug` da API e que campos vazios nao gerem filtros invalidos.
- Documentar no codigo, de forma breve, qualquer limitacao da DummyJson para combinar busca e categoria.

### 3. Modelar estado da tabela

- Definir `PAGE_SIZE` e estado inicial de carregamento.
- Converter os parametros do `useServerTable` para o contrato da DummyJson:
  - `skip = (page - 1) * pageSize`;
  - `limit = pageSize`;
  - `sortBy` e `order` a partir da coluna e direcao;
  - texto de busca global;
  - categoria selecionada.
- Reiniciar a pagina para a primeira quando busca, categoria ou ordenacao mudar.
- Usar `AbortController` ou verificacao de request ativo para evitar race conditions.
- Preencher `ServerTableResponse<Product>` com `data` e `meta.total/page/pageSize`.
- Diferenciar estado de carregamento inicial, recarregamento e erro, exibindo mensagem de erro e permitindo nova tentativa.

### 4. Definir colunas e filtros

Criar colunas focadas em produtos e adequadas ao espaco da tabela:

- `id`: identificador, sem edicao.
- `thumbnail`: avatar/imagem, sem edicao.
- `title`: editavel.
- `category`: exibida como Badge e usada no filtro por categoria.
- `price`: editavel como numero, com formatacao monetaria.
- `rating`: ordenavel, sem edicao.
- `stock`: editavel como numero e ordenavel.
- `brand`: editavel quando presente.
- `availabilityStatus`: Badge, sem edicao.

- Habilitar sorting apenas para campos aceitos pelo DummyJson.
- Desabilitar busca interna em colunas que nao tenham representacao textual util.
- Evitar colocar o objeto completo ou arrays complexos como valores editaveis.

### 5. Implementar busca global e categoria

- Expor um controle de busca global no cabecalho da pagina ou na area de filtros, usando os componentes Tamentai existentes.
- Adicionar um seletor de categoria alimentado por `useCategories`.
- Incluir opcao `Todas` para limpar o filtro.
- Manter busca e categoria sincronizadas com o estado da tabela.
- Limpar ou reiniciar pagina e resultados quando filtros mudarem.
- Mostrar estado vazio especifico para nenhum produto encontrado.

### 6. Implementar edicao e modificacao de linhas

- Habilitar edicao inline somente para campos seguros: `title`, `price`, `stock` e, se suportado pelo componente, `brand`.
- Validar valores antes de salvar:
  - `title` nao vazio;
  - `price` maior ou igual a zero;
  - `stock` inteiro maior ou igual a zero.
- Ao salvar, enviar `PATCH /products/{id}` com apenas os campos modificados.
- Mesclar a resposta na linha local sem perder a pagina atual.
- Ao cancelar, descartar alteracoes pendentes da linha.
- Ao excluir, chamar `DELETE /products/{id}`, remover a linha local e atualizar o total exibido.
- Usar toast para sucesso e falha de salvar/excluir.
- Deixar claro na interface que as mutacoes da DummyJson sao simuladas e podem nao sobreviver a um novo carregamento.

### 7. Remover o legado com escopo controlado

- Remover imports, tipos, constantes, textos e acoes especificas de Pokemon.
- Remover chamadas diretas para `pokeapi.co`.
- Substituir acoes de captura/time por acoes coerentes com produtos, somente se a API atual da Table exigir a demonstracao de acoes em lote.
- Preservar download/selecionados apenas se continuarem funcionando corretamente para `Product`.
- Manter a rota `/table` e os links existentes sem alterar o restante do Shop.

## Criterios de aceite

- A pagina `/table` carrega produtos da DummyJson sem chamadas para a PokeAPI.
- A busca global envia requisicoes debounced e atualiza a tabela com resultados correspondentes.
- O filtro de categoria usa as categorias da DummyJson e pode ser limpo.
- Clicar na ordenacao de uma coluna dispara nova requisicao com `sortBy` e `order` corretos.
- Trocar de pagina envia `limit` e `skip` corretos e mostra o total retornado pela API.
- Alteracoes validas podem ser salvas inline, aparecem imediatamente na linha e geram feedback visual.
- Cancelar uma edicao restaura o valor original.
- Excluir uma linha atualiza a tabela e o total local.
- Erros de rede exibem estado compreensivel sem quebrar a pagina.
- `pnpm build` e `pnpm lint` passam depois de corrigir eventuais erros preexistentes diretamente relacionados ao arquivo tocado.
- Teste manual cobre combinacoes de busca, categoria, ordenacao, pagina e edicao.

## Validacao planejada

1. Inspecionar os tipos da versao instalada antes da primeira alteracao de `TablePlayground.tsx`.
2. Implementar em pequenos passos, validando typecheck apos o adaptador e apos a tabela.
3. Rodar `pnpm lint` e `pnpm build`.
4. Executar a aplicacao e testar `/table` no navegador:
   - carregamento inicial;
   - busca vazia e busca com resultado;
   - categoria;
   - ordenacao ascendente/descendente;
   - pagina anterior/proxima;
   - salvar, cancelar e excluir.
5. Verificar que uma resposta antiga de rede nao substitui o resultado de um filtro mais recente.
