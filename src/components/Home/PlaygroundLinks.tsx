import { Link } from '@tanstack/react-router'
import styles from './PlaygroundLinks.module.css'
import { Icon, type IconName } from '@poliedro/tamentai/web'

const playgrounds = [
  {
    icon: 'ShoppingBag',
    title: 'Catálogo de Produtos',
    description: 'Grid de produtos estilo Lululemon com filtros por categoria, ordenação e busca via API DummyJson.',
    to: '/shop' as const,
  },
  {
    icon: 'Star',
    title: 'Detalhes & Reviews',
    description: 'Página de detalhes com galeria de imagens, rating bars, reviews reais e integração com carrinho.',
    to: '/shop' as const,
  },
  {
    icon: 'ShoppingCart',
    title: 'Carrinho Virtual',
    description: 'Carrinho com React Context + localStorage. Controle de quantidade, resumo e checkout simulado.',
    to: '/shop/cart' as const,
  },
  {
    icon: 'Table',
    title: 'Table Playground',
    description: 'Tabela avançada com paginação server-side, ordenação, busca, edição e ações para dados de Pokémon.',
    to: '/table' as const,
  },
]

export function PlaygroundLinks() {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Explore o Shop</h2>
        <p className={styles.sectionSubtitle}>
          Experiência de e-commerce real demonstrando todos os componentes Tamentai
        </p>
      </div>

      <div className={styles.grid}>
        {playgrounds.map((item) => (
          <Link key={item.title} to={item.to} className={styles.card}>
            <span className={styles.cardIcon}>
              <Icon name={String(item.icon) as IconName} size={32}/>
            </span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            <span className={styles.cardArrow}>Explorar &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
