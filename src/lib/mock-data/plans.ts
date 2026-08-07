export type BillingCycle = 'monthly' | 'annual'
export type PlanId = 'free' | 'pro' | 'business'

export interface PlanFeature {
  included: boolean
  label: string
}

export interface Plan {
  id: PlanId
  name: string
  description: string
  monthly: number
  annual: number
  monthlyLabel: string
  annualLabel: string
  highlight?: boolean
  cta: string
  features: PlanFeature[]
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Gratis',
    description: 'Para probar Thimpson Express en tu negocio sin costo.',
    monthly: 0,
    annual: 0,
    monthlyLabel: 'C$0',
    annualLabel: 'C$0',
    cta: 'Empezar gratis',
    features: [
      { included: true, label: 'Hasta 10 entregas / mes' },
      { included: true, label: 'Chat WhatsApp + Web' },
      { included: true, label: 'Rastreo básico en vivo' },
      { included: false, label: 'Precios corporativos' },
      { included: false, label: 'Métricas y reportes avanzados' },
      { included: false, label: 'Rider dedicado (día completo)' },
      { included: false, label: 'Soporte prioritario 24/7' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para negocios que mandan a diario y necesitan control.',
    monthly: 25,
    annual: 240,
    monthlyLabel: 'C$25',
    annualLabel: 'C$20',
    highlight: true,
    cta: 'Elegir Pro',
    features: [
      { included: true, label: 'Hasta 200 entregas / mes' },
      { included: true, label: 'Chat WhatsApp + Web' },
      { included: true, label: 'Rastreo en vivo + ETA' },
      { included: true, label: 'Precios corporativos por volumen' },
      { included: true, label: 'Métricas y reportes avanzados' },
      { included: false, label: 'Rider dedicado (día completo)' },
      { included: false, label: 'Soporte prioritario 24/7' },
    ],
  },
  {
    id: 'business',
    name: 'Empresarial',
    description: 'Para empresas con alto volumen y necesidades a medida.',
    monthly: 65,
    annual: 624,
    monthlyLabel: 'C$65',
    annualLabel: 'C$52',
    cta: 'Hablar con ventas',
    features: [
      { included: true, label: 'Entregas ilimitadas' },
      { included: true, label: 'Chat WhatsApp + Web' },
      { included: true, label: 'Rastreo en vivo + ETA' },
      { included: true, label: 'Precios corporativos por volumen' },
      { included: true, label: 'Métricas y reportes avanzados' },
      { included: true, label: 'Rider dedicado (día completo)' },
      { included: true, label: 'Soporte prioritario 24/7' },
    ],
  },
]

export function getPlanById(id: string): Plan | undefined {
  return plans.find(p => p.id === id)
}

export function planPrice(plan: Plan, cycle: BillingCycle): number {
  return cycle === 'monthly' ? plan.monthly : plan.annual
}

export function planPriceLabel(plan: Plan, cycle: BillingCycle): string {
  if (plan.id === 'free') return 'C$0'
  if (cycle === 'annual') return `C$${plan.annual} / año`
  return `C$${plan.monthly} / mes`
}
