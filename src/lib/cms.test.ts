import { describe, it, expect } from 'vitest'
import { getActiveBanners, isBannerActive } from './cms'
import type { CmsBanner } from './types'

const banner: CmsBanner = {
  id: 'navidad',
  title: 'Ofertas de Navidad',
  subtitle: 'Envíos con descuento',
  ctaLabel: 'Cotizar',
  ctaHref: '/servicios',
  backgroundColor: 'dark',
  startDate: '2026-12-01',
  endDate: '2026-12-31',
}

describe('isBannerActive', () => {
  it('activo dentro del rango', () => {
    expect(isBannerActive(banner, new Date('2026-12-15'))).toBe(true)
  })
  it('inactivo antes del rango', () => {
    expect(isBannerActive(banner, new Date('2026-11-30'))).toBe(false)
  })
  it('inactivo despues del rango', () => {
    expect(isBannerActive(banner, new Date('2027-06-01'))).toBe(false)
  })
})

describe('getActiveBanners', () => {
  it('devuelve solo los banners activos hoy', () => {
    const banners: CmsBanner[] = [
      banner,
      { ...banner, id: 'fuera', startDate: '2025-01-01', endDate: '2025-01-31' },
    ]
    const active = getActiveBanners(banners, new Date('2026-12-15'))
    expect(active.map((b) => b.id)).toEqual(['navidad'])
  })
})