import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RiderRatingBadgeProps {
  rating: number
  totalRatings: number
  variant?: 'compact' | 'detailed'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function RiderRatingBadge({
  rating,
  totalRatings,
  variant = 'compact',
  size = 'md',
  className,
}: RiderRatingBadgeProps) {
  const sizeConfig = {
    sm: {
      starSize: 'h-3 w-3',
      text: 'text-xs',
      gap: 'gap-0.5',
    },
    md: {
      starSize: 'h-4 w-4',
      text: 'text-sm',
      gap: 'gap-1',
    },
    lg: {
      starSize: 'h-5 w-5',
      text: 'text-base',
      gap: 'gap-1.5',
    },
  }

  const config = sizeConfig[size]
  const displayRating = rating.toFixed(1)

  // Determinar color según rating
  const getRatingColor = (r: number) => {
    if (r >= 4.5) return 'text-whatsapp'
    if (r >= 3.5) return 'text-primary'
    if (r >= 2.5) return 'text-amber-500'
    return 'text-destructive'
  }

  const ratingColor = getRatingColor(rating)

  // Etiqueta descriptiva
  const ratingLabel = (() => {
    if (rating >= 4.5) return 'Excelente'
    if (rating >= 3.5) return 'Muy bueno'
    if (rating >= 2.5) return 'Regular'
    if (rating >= 1.5) return 'Malo'
    return 'Horrible'
  })()

  if (variant === 'compact') {
    return (
      <div
        className={cn(
          "inline-flex items-center",
          config.gap,
          className
        )}
        title={`Rating: ${displayRating} (${totalRatings} calificaciones) - ${ratingLabel}`}
      >
        <Star
          className={cn(
            "fill-current",
            config.starSize,
            ratingColor
          )}
        />
        <span
          className={cn(
            "font-mono font-medium",
            config.text,
            ratingColor
          )}
        >
          {displayRating}
        </span>
      </div>
    )
  }

  // Variante detallada
  return (
    <div
      className={cn(
        "inline-flex items-center",
        config.gap,
        className
      )}
      title={`Rating: ${displayRating} (${totalRatings} calificaciones) - ${ratingLabel}`}
    >
      <Star
        className={cn(
          "fill-current",
          config.starSize,
          ratingColor
        )}
      />
      <div className="flex flex-col">
        <div className="flex items-center">
          <span
            className={cn(
              "font-mono font-medium",
              config.text,
              ratingColor
            )}
          >
            {displayRating}
          </span>
          <span className="text-xs text-text-muted">
            {' '}
            ({totalRatings.toLocaleString('es-NI')})
          </span>
        </div>
        {size === 'lg' && (
          <span className="text-xs text-text-muted">
            {ratingLabel}
          </span>
        )}
      </div>
    </div>
  )
}
