import type { Business } from '../types'

export const businesses: Business[] = [
  {
    slug: 'sabor-criollo',
    name: 'Sabor Criollo',
    category: 'Comida',
    categoryColor: '#E53935',
    rating: 4.8,
    reviews: 132,
    mission: 'Llevar el auténtico sabor criollo a la mesa de cada hogar de Ocotal.',
    vision: 'Ser la referencia gastronómica de la zona norte de Nicaragua.',
    phone: '+505 5555 0101',
    address: 'Calle Central, Ocotal, Nueva Segovia',
    plan: 'premium',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    ],
    products: [
      { id: 'p1', name: 'Nacatamal', price: 40, stock: 25 },
      { id: 'p2', name: 'Vigorón', price: 55, stock: 30 },
      { id: 'p3', name: 'Gallo pinto con queso', price: 45, stock: 40 },
    ],
    services: [],
  },
  {
    slug: 'farmacia-divina',
    name: 'Farmacia Divina Providencia',
    category: 'Farmacias',
    categoryColor: '#4CAF50',
    rating: 4.9,
    reviews: 87,
    mission: 'Cuidar la salud de la comunidad con atención cercana y productos de calidad.',
    vision: 'Ser la farmacia de confianza de toda Nueva Segovia.',
    phone: '+505 5555 0202',
    address: 'Frente al parque, Ocotal, Nueva Segovia',
    plan: 'premium',
    coverImage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    ],
    products: [
      { id: 'f1', name: 'Acetaminofén 500mg', price: 25, stock: 100 },
      { id: 'f2', name: 'Vitamina C 1000mg', price: 90, stock: 60 },
    ],
    services: [
      { id: 's1', name: 'Entrega de recetas', description: 'Entrega de medicamentos recetados en menos de 40 minutos.', price: 40 },
    ],
  },
  {
    slug: 'supermercado-central',
    name: 'Supermercado Central',
    category: 'Supermercados',
    categoryColor: '#1976D2',
    rating: 4.6,
    reviews: 210,
    mission: 'Proveer a las familias de Ocotal los mejores productos al mejor precio.',
    vision: 'Ser el supermercado líder de la zona norte.',
    phone: '+505 5555 0303',
    address: 'Barrio El Calvario, Ocotal, Nueva Segovia',
    plan: 'free',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    gallery: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
      'https://images.unsplash.com/photo-1550565118-3a14e8d0386c?w=800',
    ],
    products: [
      { id: 'm1', name: 'Arroz 5lb', price: 120, stock: 200 },
      { id: 'm2', name: 'Aceite 1L', price: 85, stock: 150 },
      { id: 'm3', name: 'Azúcar 5lb', price: 110, stock: 180 },
    ],
    services: [],
  },
]

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug)
}