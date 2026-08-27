import { Avatar, Badge, Card, Progress, Text, TitleV2 } from '@poliedro/tamentai/web'
import { Star } from 'lucide-react'
import type { ProductReview } from '../../types/product'

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem' }}>
      <TitleV2 variant="h4" weight="bold">
        Avaliações ({reviews.length})
      </TitleV2>

      {/* Rating Overview */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'center' }}>
          <TitleV2 variant="h1" weight="bold">{averageRating.toFixed(1)}</TitleV2>
          <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '0.5rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < Math.round(averageRating) ? '#f59e0b' : 'transparent'} color="#f59e0b" />
            ))}
          </div>
          <Text variant="caption" color="muted">
            {reviews.length} avaliações
          </Text>
        </div>

        <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {[5, 4, 3, 2, 1].map((star, i) => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Text variant="caption" color="muted" as="span">{star}★</Text>
              <div style={{ flex: 1 }}>
                <Progress value={(distribution[i] / maxCount) * 100} variant="linear" size="sm" />
              </div>
              <Text variant="caption" color="muted" as="span">{distribution[i]}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Review List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reviews.map((review) => (
          <Card key={`${review.reviewerEmail}-${review.date}`}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Avatar
                alt={review.reviewerName}
                size="md"
                shape="circular"
                initials={getInitials(review.reviewerName)}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
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
