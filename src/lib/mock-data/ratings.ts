export interface Rating {
  id: string
  orderId: string
  riderId?: string
  riderName?: string
  riderAvatar?: string
  clientId: string
  clientName: string
  clientAvatar?: string
  rating: number // 1-5
  comment: string
  service: string
  timestamp: string
  photos: string[]      // URLs de fotos subidas
  tags: string[]        // Etiquetas rápidas seleccionadas
  status: 'ACTIVE' | 'REPORTED' | 'REVIEWED'
  reportedReason?: string
}

export interface RatingStats {
  totalRatings: number
  averageRating: number
  distribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  recentComments: Rating[]
  topRiders: {
    id: string
    name: string
    avatar?: string
    average: number
    totalRatings: number
  }[]
}

export const ratings: Rating[] = [
  {
    id: 'r1',
    orderId: 'ORD-001',
    riderId: 'rider-001',
    riderName: 'Carlos Mendoza',
    riderAvatar: 'https://i.pravatar.cc/32?img=32',
    clientId: 'client-001',
    clientName: 'María López',
    clientAvatar: 'https://i.pravatar.cc/32?img=44',
    rating: 5,
    comment: 'Excelente servicio, muy rápido y amable.',
    service: 'Delivery',
    timestamp: '2026-08-05T14:30:00',
    photos: [],
    tags: ['Servicio rápido', 'Rider amable'],
    status: 'ACTIVE',
  },
  {
    id: 'r2',
    orderId: 'ORD-002',
    riderId: 'rider-002',
    riderName: 'Luis Herrera',
    riderAvatar: 'https://i.pravatar.cc/32?img=33',
    clientId: 'client-002',
    clientName: 'Pedro Ramírez',
    clientAvatar: 'https://i.pravatar.cc/32?img=45',
    rating: 5,
    comment: 'Muy profesional, llegó 10 minutos antes del tiempo estimado.',
    service: 'Encomiendas',
    timestamp: '2026-08-05T12:15:00',
    photos: [],
    tags: ['Servicio rápido'],
    status: 'ACTIVE',
  },
  {
    id: 'r3',
    orderId: 'ORD-003',
    riderId: 'rider-003',
    riderName: 'Ana Gómez',
    riderAvatar: 'https://i.pravatar.cc/32?img=34',
    clientId: 'client-003',
    clientName: 'Laura Torres',
    clientAvatar: 'https://i.pravatar.cc/32?img=46',
    rating: 4,
    comment: 'Buen servicio, aunque el paquete llegó un poco más tarde.',
    service: 'Delivery',
    timestamp: '2026-08-05T10:00:00',
    photos: [],
    tags: ['Servicio amable'],
    status: 'ACTIVE',
  },
  {
    id: 'r4',
    orderId: 'ORD-004',
    riderId: 'rider-001',
    riderName: 'Carlos Mendoza',
    riderAvatar: 'https://i.pravatar.cc/32?img=32',
    clientId: 'client-004',
    clientName: 'José Díaz',
    clientAvatar: 'https://i.pravatar.cc/32?img=47',
    rating: 1,
    comment: 'El rider no se presentó y no respondió las llamadas. Muy mal servicio.',
    service: 'Delivery',
    timestamp: '2026-08-04T18:30:00',
    photos: ['https://placehold.co/300x200/png?text=Foto+paquete+dañado'],
    tags: ['Producto dañado', 'Servicio malo'],
    status: 'REPORTED',
    reportedReason: 'No show y producto potencialmente dañado',
  },
  {
    id: 'r5',
    orderId: 'ORD-005',
    riderId: 'rider-004',
    riderName: 'Jorge Salazar',
    riderAvatar: 'https://i.pravatar.cc/32?img=35',
    clientId: 'client-005',
    clientName: 'Carmen Silva',
    clientAvatar: 'https://i.pravatar.cc/32?img=48',
    rating: 5,
    comment: 'Servicio impecable, el rider fue muy amable y profesional.',
    service: 'Delivery',
    timestamp: '2026-08-04T16:45:00',
    photos: [],
    tags: ['Rider amable', 'Servicio rápido'],
    status: 'ACTIVE',
  },
  {
    id: 'r6',
    orderId: 'ORD-006',
    riderId: 'rider-005',
    riderName: 'Martha Ruiz',
    riderAvatar: 'https://i.pravatar.cc/32?img=36',
    clientId: 'client-006',
    clientName: 'Roberto Vega',
    clientAvatar: 'https://i.pravatar.cc/32?img=49',
    rating: 3,
    comment: 'Servicio aceptable, pero tardó más de lo esperado.',
    service: 'Encomiendas',
    timestamp: '2026-08-04T09:20:00',
    photos: [],
    tags: ['Servicio lento'],
    status: 'ACTIVE',
  },
  {
    id: 'r7',
    orderId: 'ORD-007',
    riderId: 'rider-002',
    riderName: 'Luis Herrera',
    riderAvatar: 'https://i.pravatar.cc/32?img=33',
    clientId: 'client-007',
    clientName: 'Patricia Morales',
    clientAvatar: 'https://i.pravatar.cc/32?img=50',
    rating: 5,
    comment: 'Excelente, llegó rápido y el producto estaba en perfectas condiciones.',
    service: 'Delivery',
    timestamp: '2026-08-03T15:10:00',
    photos: [],
    tags: ['Servicio rápido', 'Producto en buen estado'],
    status: 'ACTIVE',
  },
  {
    id: 'r8',
    orderId: 'ORD-008',
    riderId: 'rider-003',
    riderName: 'Ana Gómez',
    riderAvatar: 'https://i.pravatar.cc/32?img=34',
    clientId: 'client-008',
    clientName: 'Daniel Castillo',
    clientAvatar: 'https://i.pravatar.cc/32?img=51',
    rating: 2,
    comment: 'El rider fue desorganizado y casi se cae el paquete.',
    service: 'Delivery',
    timestamp: '2026-08-03T11:45:00',
    photos: [],
    tags: ['Servicio desorganizado'],
    status: 'REPORTED',
    reportedReason: 'Near-drop incident, client concerned',
  },
  {
    id: 'r9',
    orderId: 'ORD-009',
    riderId: 'rider-006',
    riderName: 'Fernando Cárdenas',
    riderAvatar: 'https://i.pravatar.cc/32?img=37',
    clientId: 'client-009',
    clientName: 'Sofía Reyes',
    clientAvatar: 'https://i.pravatar.cc/32?img=52',
    rating: 5,
    comment: 'Servicio excelente, muy puntual y amable.',
    service: 'Delivery',
    timestamp: '2026-08-02T14:00:00',
    photos: [],
    tags: ['Servicio rápido', 'Servicio amable'],
    status: 'ACTIVE',
  },
  {
    id: 'r10',
    orderId: 'ORD-010',
    riderId: 'rider-001',
    riderName: 'Carlos Mendoza',
    riderAvatar: 'https://i.pravatar.cc/32?img=32',
    clientId: 'client-010',
    clientName: 'Andrés Ruiz',
    clientAvatar: 'https://i.pravatar.cc/32?img=53',
    rating: 5,
    comment: 'Muy buen servicio, llegó dentro del tiempo estimado.',
    service: 'Encomiendas',
    timestamp: '2026-08-02T10:30:00',
    photos: [],
    tags: ['Servicio rápido'],
    status: 'ACTIVE',
  },
]

export const ratingStats: RatingStats = {
  totalRatings: ratings.length,
  averageRating: ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length,
  distribution: {
    5: ratings.filter(r => r.rating === 5).length,
    4: ratings.filter(r => r.rating === 4).length,
    3: ratings.filter(r => r.rating === 3).length,
    2: ratings.filter(r => r.rating === 2).length,
    1: ratings.filter(r => r.rating === 1).length,
  },
  recentComments: ratings.slice(0, 5),
  topRiders: (() => {
    const riderStats: Record<string, { id: string; name: string; avatar?: string; ratings: number[]; }> = {}

    ratings.forEach(r => {
      if (r.riderId && r.riderName) {
        if (!riderStats[r.riderId]) {
          riderStats[r.riderId] = { id: r.riderId, name: r.riderName, avatar: r.riderAvatar, ratings: [] }
        }
        riderStats[r.riderId].ratings.push(r.rating)
      }
    })

    return Object.values(riderStats)
      .map(rider => ({
        id: rider.id,
        name: rider.name,
        avatar: rider.avatar,
        average: rider.ratings.reduce((a, b) => a + b, 0) / rider.ratings.length,
        totalRatings: rider.ratings.length,
      }))
      .sort((a, b) => b.average - a.average)
      .slice(0, 5)
  })(),
}

export const ratingTags = [
  'Servicio rápido',
  'Servicio amable',
  'Servicio lento',
  'Servicio desorganizado',
  'Producto en buen estado',
  'Producto dañado',
  'Servicio malo',
  'Servicio excelente',
  'Servicio aceptable',
  'Servicio impecable',
] as const

export const ratingNegativeTags = [
  'Producto dañado',
  'Servicio malo',
  'Servicio lento',
  'Servicio desorganizado',
  'No show',
] as const
