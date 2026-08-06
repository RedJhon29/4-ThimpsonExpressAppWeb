import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { MapPin, Navigation, Clock } from 'lucide-react'

// Fix para los íconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.2/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.2/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.2/images/marker-shadow.png',
})

// Ícono personalizado para el rider (animado)
const riderIcon = L.divIcon({
  html: `
    <div style="
      background: #FBB03B;
      border-radius: 0;
      width: 32px;
      height: 32px;
      border: 3px solid #0B1F22;
      box-shadow: 0 0 12px rgba(251, 176, 59, 0.6);
      animation: pulse 2s infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(45deg);
    ">
      <div style="
        width: 16px;
        height: 16px;
        background: #000;
        border-radius: 0;
        transform: rotate(-45deg);
      "></div>
    </div>
  `,
  className: 'rider-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

// Ícono para origen
const originIcon = L.divIcon({
  html: `
    <div style="
      background: #0B1F22;
      border-radius: 0;
      width: 24px;
      height: 24px;
      border: 2px solid #FBB03B;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FBB03B" stroke-width="2">
        <path d="M21 10.25H11.211a1 1 0 0 1-1-1V3.5h-4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5.75a1 1 0 0 0-1-1z"/>
      </svg>
    </div>
  `,
  className: 'origin-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

// Ícono para destino
const destinationIcon = L.divIcon({
  html: `
    <div style="
      background: #0B1F22;
      border-radius: 0;
      width: 24px;
      height: 24px;
      border: 2px solid #25D366;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.79 19.79 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67 2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.64 2 2 0 0 1-.44 2.55l-.5.35a1 1 0 0 1-.5 1.5h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1.5l-.5-.35a2 2 0 0 1 2.55-.45 12.84 12.84 0 0 0 2.64-.7 2 2 0 0 1 1.7 1.7z"/>
      </svg>
    </div>
  `,
  className: 'destination-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
})

const LeafletMapInner = ({
  center,
  origin,
  destination,
  riderPosition,
  rider,
  status,
}: {
  center: [number, number]
  origin: [number, number]
  destination: [number, number]
  riderPosition: [number, number]
  rider: any
  status: string
}) => {
  const MapContainerAny = MapContainer as any
  const TileLayerAny = TileLayer as any
  const MarkerAny = Marker as any
  const PolylineAny = Polyline as any
  const PopupAny = Popup as any

  return (
    <MapContainerAny
      center={center}
      zoom={15}
      className="h-full w-full"
    >
      <TileLayerAny
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Línea de ruta */}
      <PolylineAny
        positions={[origin, destination]}
        pathOptions={{
          color: '#FBB03B',
          weight: 5,
          opacity: 0.8,
          dashArray: status === 'DELIVERED' ? 'none' : '10, 10',
        }}
      />

      {/* Marca de origen */}
      <MarkerAny position={origin} icon={originIcon}>
        <PopupAny>
          <div className="text-sm">
            <strong>Punto de origen</strong>
            <br />
            {`${origin[0].toFixed(4)}, ${origin[1].toFixed(4)}`}
          </div>
        </PopupAny>
      </MarkerAny>

      {/* Marca de destino */}
      <MarkerAny position={destination} icon={destinationIcon}>
        <PopupAny>
          <div className="text-sm">
            <strong>Destino</strong>
            <br />
            {`${destination[0].toFixed(4)}, ${destination[1].toFixed(4)}`}
          </div>
        </PopupAny>
      </MarkerAny>

      {/* Marcador del rider (si existe) */}
      {rider && (
        <MarkerAny position={riderPosition} icon={riderIcon}>
          <PopupAny>
            <div className="text-sm">
              <strong>{rider.name}</strong>
              <br />
              {rider.vehicle} • {rider.rating} ★
            </div>
          </PopupAny>
        </MarkerAny>
      )}
    </MapContainerAny>
  )
}

interface Rider {
  id: string
  name: string
  phone: string
  rating: number
  vehicle: string
  position: [number, number]
}

interface TrackingClienteProps {
  orderId: string
  origin: [number, number]
  destination: [number, number]
  rider?: Rider | null
  status: 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_TRANSIT' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED'
  estimatedTime: string
  distance: number
  cost: number
  className?: string
}

export function TrackingCliente({
  orderId,
  origin,
  destination,
  rider,
  status,
  estimatedTime,
  distance,
  cost,
  className,
}: TrackingClienteProps) {
  const [riderPosition, setRiderPosition] = useState<[number, number]>(
    rider?.position ?? origin
  )

  // Centrar el mapa entre origen y destino
  const center: [number, number] = useMemo(() => {
    return [
      (origin[0] + destination[0]) / 2,
      (origin[1] + destination[1]) / 2,
    ]
  }, [origin, destination])

  // Simular movimiento del rider
  useEffect(() => {
    if (rider && status === 'IN_TRANSIT') {
      const timer = setInterval(() => {
        const progress = Math.random()
        const lat = origin[0] + (destination[0] - origin[0]) * progress
        const lng = origin[1] + (destination[1] - origin[1]) * progress
        setRiderPosition([lat, lng])
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [rider, status, origin, destination])

  return (
    <div className={cn("relative h-[500px] bg-surface border border-border", className)}>
      <LeafletMapInner
        center={center}
        origin={origin}
        destination={destination}
        riderPosition={riderPosition}
        rider={rider}
        status={status}
      />

      {/* Panel de información superpuesto */}
      <div className="absolute top-4 right-4 bg-surface/95 backdrop-blur border border-border p-4 max-w-xs z-[500] shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg">Pedido #{orderId}</h3>
        </div>

        {rider ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-none border-2 border-primary">
                <img
                  src={`https://ui-avatar.com/api/${rider.name}`}
                  alt={rider.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-sm text-white">{rider.name}</p>
                <p className="text-xs text-text-muted">
                  {rider.vehicle} • {rider.rating.toFixed(1)} ★
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Navigation className="h-3 w-3 text-primary" />
              <span>{distance.toFixed(1)} km</span>
              <Clock className="h-3 w-3 text-primary" />
              <span>ETA: {estimatedTime}</span>
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-text-muted mb-1">Total</p>
              <p className="text-xl font-bold text-primary">C$ {cost.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              {status === 'PENDING'
                ? 'Buscando un rider cercano...'
                : 'Asignando rider...'}
            </p>
            <div className="mt-2 w-full h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse w-2/3 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Estado del pedido */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-surface/95 backdrop-blur border border-border px-4 py-2 shadow-lg z-[500]">
        <div className="flex items-center gap-4">
          {[
            { key: 'PENDING', label: 'Solicitado' },
            { key: 'ASSIGNED', label: 'Asignado' },
            { key: 'IN_TRANSIT', label: 'En camino' },
            { key: 'DELIVERED', label: 'Entregado' },
          ].map((step, i) => (
            <div key={step.key} className="flex items-center gap-1">
              <div
                className={cn(
                  "h-6 w-6 rounded-none flex items-center justify-center text-xs font-mono border transition-colors",
                  status === step.key || status === 'DELIVERED'
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-surface-1 text-text-muted border-border"
                )}
              >
                {i + 1}
              </div>
              <span className="text-xs font-medium">
                {step.label}
              </span>
              {i < 3 && (
                <div
                  className={cn(
                    "w-6 h-0.5",
                    status === 'DELIVERED' ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Exportar también como default para facilitar import
export default TrackingCliente
