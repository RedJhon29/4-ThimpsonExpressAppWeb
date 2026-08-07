import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Search, PackageSearch } from 'lucide-react'
import { TrackingCliente } from '@/components/features/tracking/TrackingMap'
import { RideRatingModal } from '@/features/ratings/RideRatingModal'
import { getTrackedOrder, trackedOrders } from '@/lib/mock-data/tracking'
import type { Rating } from '@/lib/mock-data/ratings'
import { cn } from '@/lib/utils'

export function TrackOrderPage() {
  const { orderId } = useParams()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [showRating, setShowRating] = useState(false)
  const [rated, setRated] = useState(false)

  const order = orderId ? getTrackedOrder(orderId) : submitted ? getTrackedOrder(submitted) : undefined

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(query.trim())
  }

  const handleRatingSubmit = (_rating: Rating) => {
    setShowRating(false)
    setRated(true)
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-3xl font-bold">Rastrear pedido</h1>
        <p className="mt-2 text-muted-foreground">
          Ingresá el número de pedido (ej. TEX-2026-0847) para ver el seguimiento en vivo.
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Número de pedido"
              className="h-11 w-full border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="h-11 bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Buscar
          </button>
        </form>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">Pedidos de ejemplo</p>
        <div className="mt-3 flex flex-col gap-2">
          {trackedOrders.map(o => (
            <Link
              key={o.id}
              to={`/rastrear/${o.id}`}
              className="flex items-center gap-3 border-2 border-border bg-card p-3 hover:border-primary/50 transition-colors"
            >
              <PackageSearch className="size-5 text-primary" />
              <div className="min-w-0">
                <p className="font-mono text-sm font-semibold">{o.id}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {o.originLabel} → {o.destinationLabel}
                </p>
              </div>
              <span
                className={cn(
                  'ml-auto px-2 py-0.5 text-xs font-semibold',
                  o.status === 'IN_TRANSIT' || o.status === 'PICKED_UP'
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {o.status === 'IN_TRANSIT' || o.status === 'PICKED_UP' ? 'En camino' : 'Sin asignar'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/rastrear" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Rastrear otro pedido
      </Link>

      <div className="mt-4">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">{order.service}</p>
        <h1 className="mt-1 font-display text-3xl font-bold">Pedido #{order.id}</h1>
      </div>

      <div className="mt-6">
        <TrackingCliente
          orderId={order.id}
          origin={order.origin}
          destination={order.destination}
          rider={order.rider}
          status={order.status}
          estimatedTime={order.estimatedTime}
          distance={order.distance}
          cost={order.cost}
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border-2 border-border bg-card p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Origen</p>
          <p className="mt-1 text-sm">{order.originLabel}</p>
        </div>
        <div className="border-2 border-border bg-card p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Destino</p>
          <p className="mt-1 text-sm">{order.destinationLabel}</p>
        </div>
      </div>

      {order.status === 'DELIVERED' && !rated && (
        <div className="mt-6 flex items-center justify-between border-2 border-whatsapp bg-whatsapp/5 p-4">
          <div>
            <p className="font-display text-lg font-bold">¡Entrega completada!</p>
            <p className="text-sm text-muted-foreground">¿Cómo fue tu experiencia con el rider?</p>
          </div>
          <button
            onClick={() => setShowRating(true)}
            className="h-10 bg-primary px-5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Calificar
          </button>
        </div>
      )}

      {order.status === 'DELIVERED' && rated && (
        <div className="mt-6 border-2 border-whatsapp bg-whatsapp/5 p-4 text-center">
          <p className="font-display text-lg font-bold">Gracias por tu calificación</p>
          <p className="text-sm text-muted-foreground">Tu opinión ayuda a mejorar el servicio.</p>
        </div>
      )}

      {showRating && order.rider && (
        <RideRatingModal
          orderId={order.id}
          riderName={order.rider.name}
          riderRating={order.rider.rating}
          service={order.service}
          onClose={() => setShowRating(false)}
          onSubmit={handleRatingSubmit}
        />
      )}
    </div>
  )
}

export default TrackOrderPage
