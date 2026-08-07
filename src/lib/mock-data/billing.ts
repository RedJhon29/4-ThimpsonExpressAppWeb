import type { PlanId } from './plans'

export interface BillingAddress {
  line1: string
  city: string
  state: string
  zip: string
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'transfer' | 'wallet'
  label: string
  detail: string
  isDefault: boolean
  brand?: string
}

export interface Invoice {
  id: string
  number: string
  period: string
  issuedAt: string
  dueAt: string
  amount: number
  status: 'PAID' | 'PENDING' | 'OVERDUE'
  method: string
}

export interface ActiveSubscription {
  planId: PlanId
  cycle: 'monthly' | 'annual'
  startedAt: string
  renewsAt: string
  monthlyPrice: number
  annualPrice: number
  deliveriesUsed: number
  deliveriesLimit: number
}

export const activeSubscription: ActiveSubscription = {
  planId: 'pro',
  cycle: 'annual',
  startedAt: '2026-05-01T00:00:00',
  renewsAt: '2026-09-01T00:00:00',
  monthlyPrice: 25,
  annualPrice: 240,
  deliveriesUsed: 87,
  deliveriesLimit: 200,
}

export const paymentMethods: PaymentMethod[] = [
  { id: 'pm1', type: 'card', label: 'Visa •••• 4242', detail: 'Expira 09/2028', brand: 'Visa', isDefault: true },
  { id: 'pm2', type: 'transfer', label: 'BAC Managua', detail: 'Cuenta •••• 8841', isDefault: false },
  { id: 'pm3', type: 'wallet', label: 'Billetera móvil Tigo', detail: '+505 8412 5678', isDefault: false },
]

export const billingAddress: BillingAddress = {
  line1: 'Del Restaurante El Sabor Nica, 1c al Norte',
  city: 'Managua',
  state: 'Managua',
  zip: '11000',
}

export const invoices: Invoice[] = [
  { id: 'inv1', number: 'TEX-2026-0847', period: 'Agosto 2026', issuedAt: '2026-08-01', dueAt: '2026-08-15', amount: 240, status: 'PAID', method: 'Visa •••• 4242' },
  { id: 'inv2', number: 'TEX-2026-0778', period: 'Julio 2026', issuedAt: '2026-07-01', dueAt: '2026-07-15', amount: 240, status: 'PAID', method: 'Visa •••• 4242' },
  { id: 'inv3', number: 'TEX-2026-0709', period: 'Junio 2026', issuedAt: '2026-06-01', dueAt: '2026-06-15', amount: 240, status: 'PAID', method: 'Visa •••• 4242' },
  { id: 'inv4', number: 'TEX-2026-0640', period: 'Mayo 2026', issuedAt: '2026-05-01', dueAt: '2026-05-15', amount: 300, status: 'PAID', method: 'Visa •••• 4242' },
]
