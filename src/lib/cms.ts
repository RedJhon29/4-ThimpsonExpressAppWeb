import type { CmsBanner } from './types'

export function isBannerActive(banner: CmsBanner, now: Date): boolean {
  const start = new Date(banner.startDate + 'T00:00:00')
  const end = new Date(banner.endDate + 'T23:59:59')
  return now >= start && now <= end
}

export function getActiveBanners(banners: CmsBanner[], now: Date): CmsBanner[] {
  return banners.filter((b) => isBannerActive(b, now))
}

export const cmsBanners: CmsBanner[] = [
  {
    id: 'aniversario',
    title: '¡Celebramos con vos!',
    subtitle: 'Mandados y delivery con tarifa especial todo el mes.',
    ctaLabel: 'Solicitar servicio',
    ctaHref: '/servicios',
    backgroundColor: 'yellow',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
  },
]