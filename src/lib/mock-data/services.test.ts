import { describe, it, expect } from 'vitest'
import { services, getServiceBySlug } from './services'

describe('catalogo de servicios', () => {
  it('contiene los 7 servicios con slug unico', () => {
    expect(services).toHaveLength(7)
    const slugs = new Set(services.map((s) => s.slug))
    expect(slugs.size).toBe(7)
  })

  it('mandado, delivery y encomienda tienen precio base 40', () => {
    for (const slug of ['mandado', 'delivery', 'encomienda']) {
      expect(getServiceBySlug(slug)?.basePrice).toBe(40)
    }
  })

  it('viaje expreso, transporte, acarreo y mudanza son de cotizacion', () => {
    for (const slug of ['viaje-expreso', 'transporte', 'acarreo', 'mudanza']) {
      expect(getServiceBySlug(slug)?.pricingType).toBe('quote')
    }
  })
})