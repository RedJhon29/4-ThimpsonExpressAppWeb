export interface TrackingRider {
  id: string
  name: string
  phone: string
  rating: number
  vehicle: string
  position: [number, number]
}

export interface TrackedOrder {
  id: string
  origin: [number, number]
  destination: [number, number]
  rider: TrackingRider | null
  status: 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_TRANSIT' | 'PICKED_UP' | 'DELIVERED' | 'CANCELLED'
  estimatedTime: string
  distance: number
  cost: number
  service: string
  originLabel: string
  destinationLabel: string
}

const riders: Record<string, TrackingRider> = {
  r2: {
    id: 'r2',
    name: 'María Torres',
    phone: '+505 8800 5678',
    rating: 4.9,
    vehicle: 'Moto Yamaha FZ',
    position: [12.1456, -86.2715],
  },
  r1: {
    id: 'r1',
    name: 'Luis Gómez',
    phone: '+505 8800 1234',
    rating: 4.8,
    vehicle: 'Moto Honda Wave',
    position: [12.1305, -86.265],
  },
}

export const trackedOrders: TrackedOrder[] = [
  {
    id: 'TEX-2026-0847',
    origin: [12.155, -86.285],
    destination: [12.122, -86.252],
    rider: riders.r2,
    status: 'IN_TRANSIT',
    estimatedTime: '12 min',
    distance: 4.8,
    cost: 120,
    service: 'Mandado Express',
    originLabel: 'Farmacia La Bendición, Centro',
    destinationLabel: 'Residencial Los Robles, Casa #12',
  },
  {
    id: 'TEX-2026-0851',
    origin: [12.15, -86.28],
    destination: [12.11, -86.26],
    rider: riders.r1,
    status: 'PICKED_UP',
    estimatedTime: '8 min',
    distance: 6.7,
    cost: 185,
    service: 'Comida a Domicilio',
    originLabel: 'Pollos Estrella, Comarca Los Chícaros',
    destinationLabel: 'Casa Club, Lomas de Monserrá',
  },
  {
    id: 'TEX-2026-0849',
    origin: [12.147, -86.27],
    destination: [12.13, -86.255],
    rider: null,
    status: 'PENDING',
    estimatedTime: '—',
    distance: 2.8,
    cost: 65,
    service: 'Paquetería',
    originLabel: 'Oficina Central Tigo, Centro',
    destinationLabel: 'Barrio San José, Casa #45',
  },
]

export function getTrackedOrder(id: string): TrackedOrder | undefined {
  return trackedOrders.find(o => o.id === id)
}
