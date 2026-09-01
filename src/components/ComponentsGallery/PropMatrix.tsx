import type { ReactNode } from 'react'
import { Text } from '@poliedro/tamentai/web'
import styles from './PropMatrix.module.css'

interface PropMatrixProps<T> {
  /** Lista de valores da prop a demonstrar (ex.: os valores de um union type). */
  values: readonly T[]
  /** Render de um exemplo para um dado valor. */
  render: (value: T) => ReactNode
  /**
   * Rótulo exibido sob/junto ao exemplo. Por padrão usa o próprio valor
   * (convertido para string). Passe uma função para customizar.
   */
  label?: (value: T) => ReactNode
  /**
   * Alinhamento do rótulo em relação ao exemplo.
   * - `bottom` (padrão): rótulo abaixo do exemplo.
   * - `top`: rótulo acima do exemplo.
   */
  labelPosition?: 'top' | 'bottom'
}

/**
 * Renderiza um exemplo rotulado para cada valor de uma prop.
 * Reduz o boilerplate dos showcases: em vez de repetir o componente por
 * valor de variant/color/size, passa-se o array e uma render-fn.
 */
export function PropMatrix<T>({
  values,
  render,
  label,
  labelPosition = 'bottom',
}: PropMatrixProps<T>) {
  const toLabel = label ?? ((value: T) => String(value))

  return (
    <>
      {values.map((value, index) => (
        <div key={index} className={styles.cell} data-label-position={labelPosition}>
          <div className={styles.example}>{render(value)}</div>
          <Text as="span" variant="caption" color="muted">
            {toLabel(value)}
          </Text>
        </div>
      ))}
    </>
  )
}
