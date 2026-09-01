import { Avatar, Badge, Card, Icon, Progress, Text, TitleV2 } from '@poliedro/tamentai/web'
import type { ProductReview } from '../../types/product'
import styles from './ReviewSection.module.css'

interface ReviewSectionProps {
  reviews: ProductReview[];
  averageRating: number;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getRatingDistribution(reviews: ProductReview[]): number[] {
  const dist = [0, 0, 0, 0, 0] // index 0 = 5 stars, index 4 = 1 star
  for (const review of reviews) {
    const idx = 5 - review.rating
    if (idx >= 0 && idx < 5) dist[idx]++
  }
  return dist
}

function getReviewBadgeColor(rating: number): 'green' | 'yellow' | 'red' {
  if (rating >= 4) return 'green'
  if (rating >= 3) return 'yellow'
  return 'red'
}

export function ReviewSection({ reviews, averageRating }: Readonly<ReviewSectionProps>) {
  const distribution = getRatingDistribution(reviews)
  const maxCount = Math.max(...distribution, 1)

  return (
    <div className={styles.section}>
      <TitleV2 variant="h4" weight="bold">
        Avaliações ({reviews.length})
      </TitleV2>

      {/* Rating Overview */}
      <div className={styles.overview}>
        <div className={styles.ratingSummary}>
          <TitleV2 variant="h1" weight="bold">{averageRating.toFixed(1)}</TitleV2>
          <div className={styles.starGroup}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon key={i} name='Star' size={16} fill={i < Math.round(averageRating) ? '#f59e0b' : 'transparent'} stroke="#f59e0b" />
            ))}
          </div>
          <Text variant="caption" color="muted">
            {reviews.length} avaliações
          </Text>
        </div>

        <div className={styles.distribution}>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={star} className={styles.distributionRow}>
              <Text variant="caption" color="muted" as="span">{star}★</Text>
              <div className={styles.progressBarWrapper}>
                <Progress value={(distribution[i] / maxCount) * 100} variant="linear" size="sm" />
              </div>
              <Text variant="caption" color="muted" as="span">{distribution[i]}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <Card key={`${review.reviewerEmail}-${review.date}`}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Avatar
                alt={review.reviewerName}
                size="md"
                shape="circular"
                initials={getInitials(review.reviewerName)}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className={styles.reviewHeader}>
                  <Text weight="semibold">{review.reviewerName}</Text>
                  <Badge color={getReviewBadgeColor(review.rating)} size="sm" shape="pilled">
                    {review.rating}/5
                  </Badge>
                  <Text variant="caption" color="muted">
                    {new Date(review.date).toLocaleDateString('pt-BR')}
                  </Text>
                </div>
                <Text color="muted" variant="body-sm">
                  {review.comment}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
