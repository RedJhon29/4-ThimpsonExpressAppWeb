import type { Service } from './types'

const BASE_STOP_PRICE = 40

export interface StopsInput {
  stops: number
  contentCost: number
}

export function calculateFixedPrice(
  service: Service,
  stops: number,
  contentCost: number
): number {
  const perStop = service.perStop ? stops : 1
  return BASE_STOP_PRICE * perStop + contentCost
}

export interface TripFactor {
  municipality: string
  roundTrip: boolean
  vehicleHours: number
}

const MUNICIPALITY_MULTIPLIER: Record<string, number> = {
  ocotal: 1,
  esteli: 1.6,
  jinotega: 1.8,
  madriz: 1.5,
  somoto: 1.5,
}

function normalizedKey(municipality: string): string {
  return municipality
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

export function estimateQuotePrice(f: TripFactor): string {
  const key = normalizedKey(f.municipality)
  const base = f.roundTrip ? 600 : 400
  const multiplier = MUNICIPALITY_MULTIPLIER[key] ?? 1.4
  const timeCharge = Math.max(0, f.vehicleHours) * 150
  const total = Math.round((base * multiplier + timeCharge) / 10) * 10
  const trip = f.roundTrip ? 'ida y vuelta' : 'ida simple'
  return `Cotización estimada ${f.municipality} (${trip}, ${f.vehicleHours}h): C$${total}. El precio final lo confirma el equipo Thimpson.`
}

export function getTotalFromStops(service: Service, stops: number, contentCost: number): number {
  return calculateFixedPrice(service, stops, contentCost)
}