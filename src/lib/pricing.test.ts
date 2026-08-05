import { describe, it, expect } from 'vitest'
import { calculateFixedPrice, estimateQuotePrice } from './pricing'
import { getServiceBySlug } from './mock-data/services'

describe('calculateFixedPrice', () => {
  it('1 parada cuesta C$40', () => {
    const service = getServiceBySlug('mandado')!
    expect(calculateFixedPrice(service, 1, 0)).toBe(40)
  })

  it('3 paradas cuestan C$120 mas el costo del contenido', () => {
    const service = getServiceBySlug('delivery')!
    expect(calculateFixedPrice(service, 3, 250)).toBe(370)
  })

  it('el costo de contenido se suma siempre', () => {
    const service = getServiceBySlug('encomienda')!
    expect(calculateFixedPrice(service, 1, 500)).toBe(540)
  })
})

describe('estimateQuotePrice', () => {
  it('incluye los factores del viaje en el texto', () => {
    const text = estimateQuotePrice({ municipality: 'Estelí', roundTrip: true, vehicleHours: 3 })
    expect(text).toContain('Estelí')
    expect(text).toContain('ida y vuelta')
  })

  it('menciona ida simple cuando no es ida y vuelta', () => {
    const text = estimateQuotePrice({ municipality: 'Jinotega', roundTrip: false, vehicleHours: 2 })
    expect(text).toContain('ida simple')
  })
})