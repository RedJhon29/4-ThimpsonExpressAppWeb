export type PricingType = 'fixed' | 'quote'

export type CoverageZone = 'ocotal' | 'zona-norte' | 'zona-central' | 'zona-pacifico'

export interface Service {
  slug: string
  name: string
  shortDescription: string
  description: string
  pricingType: PricingType
  basePrice: number | null
  priceNote: string
  coverage: CoverageZone[]
  icon: string
  perStop: boolean
  askContent: boolean
  quoteFactors?: string[]
}

export type BusinessPlan = 'free' | 'premium'

export interface Business {
  slug: string
  name: string
  category: string
  categoryColor: string
  rating: number
  reviews: number
  mission: string
  vision: string
  phone: string
  address: string
  plan: BusinessPlan
  coverImage: string
  gallery: string[]
  products: { id: string; name: string; price: number; stock: number }[]
  services: { id: string; name: string; description: string; price: number | null }[]
}

export interface Testimonial {
  id: string
  author: string
  role: string
  quote: string
  rating: number
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
}

export interface CmsBanner {
  id: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaHref: string
  backgroundColor: 'dark' | 'teal' | 'yellow'
  startDate: string
  endDate: string
}