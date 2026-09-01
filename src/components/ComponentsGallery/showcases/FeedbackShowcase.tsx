import { Feedback } from '@poliedro/tamentai/web'
import { ShowcaseSection } from '../ShowcaseSection'
import { PropMatrix } from '../PropMatrix'

const TYPES = ['default', 'info', 'error', 'success'] as const

export function FeedbackShowcase() {
  return (
    <ShowcaseSection title="Types" description="Tipo visual e ícone da mensagem." layout="stack">
      <PropMatrix
        values={TYPES}
        render={(feedbackType) => (
          <Feedback
            feedbackShow
            feedbackType={feedbackType}
            feedbackMessage={`Mensagem de feedback (${feedbackType})`}
          />
        )}
      />
    </ShowcaseSection>
  )
}
