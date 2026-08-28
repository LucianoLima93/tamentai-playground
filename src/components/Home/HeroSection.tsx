import { Link } from '@tanstack/react-router'
import { Button } from '@poliedro/tamentai/web'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const handleScrollToComponents = () => {
    const el = document.getElementById('components')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.badge}>
        <span className={styles.badgeDot} />{'  '}v1.0.2
      </div>

      <h1 className={styles.title}>
        Componentes React para aplicações Poliedro
      </h1>

      <p className={styles.subtitle}>
        Um conjunto de componentes React acessíveis, customizáveis e prontos para
        produção. Comece aqui e faça do seu jeito.
      </p>

      <div className={styles.actions}>
        <Button
          variant="solid"
          size="lg"
          roundness="round"
          onClick={handleScrollToComponents}
        >
          Explorar Componentes
        </Button>

        <Link to="/shop" className={styles.linkWrapper}>
          <Button variant="outline" size="lg" roundness="round">
            Ver Shop &rarr;
          </Button>
        </Link>
      </div>
    </section>
  )
}
