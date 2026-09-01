import { Progress, ActivityIndicator, SignalBars } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const SIZES = ['sm', 'md', 'lg'] as const
const COLORS = ['primary', 'destructive'] as const

export function ProgressShowcase() {
  return (
    <>
      <ShowcaseSection title="Sizes" description="Escala da barra." layout="stack">
        {SIZES.map((size) => (
          <div key={size} style={{ width: '100%' }}>
            <Progress size={size} value={60} />
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Colors" layout="stack">
        {COLORS.map((color) => (
          <div key={color} style={{ width: '100%' }}>
            <Progress color={color} value={60} />
          </div>
        ))}
      </ShowcaseSection>

      <ShowcaseSection title="Com valor e rótulo" layout="stack">
        <div style={{ width: '100%' }}>
          <Progress value={75} label="Upload" showValue />
        </div>
        <div style={{ width: '100%' }}>
          <Progress value={40} variant="steps" steps={5} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Indicadores relacionados"
        description="ActivityIndicator e SignalBars fazem parte do módulo Progress."
        layout="row"
      >
        <ActivityIndicator value={72} label="Uso" activityTrend="+5%" activityTrendDirection="up" />
        <PropMatrix
          values={[1, 2, 3, 4] as const}
          render={(level) => <SignalBars value={level} />}
          label={(level) => `nível ${level}`}
        />
      </ShowcaseSection>
    </>
  )
}
