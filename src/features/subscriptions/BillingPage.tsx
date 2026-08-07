import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, CreditCard, Download, Landmark, MapPin, Smartphone, Trash2, Plus, Receipt } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getPlanById } from '@/lib/mock-data/plans'
import { activeSubscription, paymentMethods, billingAddress, invoices } from '@/lib/mock-data/billing'
import type { PaymentMethod } from '@/lib/mock-data/billing'

export function BillingPage() {
  const plan = getPlanById(activeSubscription.planId)
  const [showAddMethod, setShowAddMethod] = useState(false)

  const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
    PAID: { bg: 'bg-whatsapp/10', text: 'text-whatsapp', label: 'Pagada' },
    PENDING: { bg: 'bg-tigo/10', text: 'text-tigo', label: 'Pendiente' },
    OVERDUE: { bg: 'bg-destructive/10', text: 'text-destructive', label: 'Vencida' },
  }

  const methodIcons: Record<PaymentMethod['type'], typeof CreditCard> = {
    card: CreditCard,
    transfer: Landmark,
    wallet: Smartphone,
  }

  const usedPct = Math.round((activeSubscription.deliveriesUsed / activeSubscription.deliveriesLimit) * 100)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/planes" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Planes
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-3xl font-bold">Facturación</h1>
          <p className="mt-1 text-muted-foreground">Gestioná tu plan, métodos de pago y facturas.</p>
        </div>
        <Link
          to="/planes"
          className="inline-flex h-10 items-center gap-2 border-2 border-primary px-4 text-sm font-bold text-foreground hover:bg-primary/10 transition-colors"
        >
          Cambiar de plan <ArrowUpRight className="size-4" />
        </Link>
      </div>

      {/* Plan activo */}
      {plan && (
        <section className="mt-8 border-2 border-primary bg-primary/5 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Plan activo</p>
              <h2 className="mt-1 font-display text-2xl font-bold">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {activeSubscription.cycle === 'annual' ? 'Facturación anual' : 'Facturación mensual'} · Renueva el{' '}
                <span className="font-mono text-foreground">
                  {new Date(activeSubscription.renewsAt).toLocaleDateString('es-NI', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-mono text-3xl font-bold">
                C${activeSubscription.cycle === 'annual' ? activeSubscription.annualPrice : activeSubscription.monthlyPrice}
              </p>
              <p className="text-xs text-muted-foreground">/{activeSubscription.cycle === 'annual' ? 'año' : 'mes'}</p>
            </div>
          </div>

          {/* Uso de entregas */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Entregas usadas este período</span>
              <span className="font-mono font-semibold">
                {activeSubscription.deliveriesUsed} / {activeSubscription.deliveriesLimit}
              </span>
            </div>
            <div className="mt-2 h-2 w-full bg-border">
              <div
                className={cn('h-full', usedPct >= 90 ? 'bg-destructive' : usedPct >= 70 ? 'bg-primary' : 'bg-whatsapp')}
                style={{ width: `${Math.min(usedPct, 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {usedPct >= 90
                ? 'Casi llegás al límite. Considerá subir de plan para no frenar tus entregas.'
                : 'Podés subir de plan en cualquier momento sin esperar la renovación.'}
            </p>
          </div>
        </section>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Métodos de pago */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Métodos de pago</h2>
            <button
              onClick={() => setShowAddMethod(true)}
              className="inline-flex h-9 items-center gap-1 border-2 border-primary px-3 text-xs font-bold text-foreground hover:bg-primary/10 transition-colors"
            >
              <Plus className="size-3.5" /> Agregar
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {paymentMethods.map(m => {
              const Icon = methodIcons[m.type]
              return (
                <div key={m.id} className="flex items-center gap-3 border-2 border-border bg-card p-4">
                  <div className="grid size-10 place-items-center border border-border bg-muted">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      {m.label}
                      {m.isDefault && (
                        <span className="bg-primary px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-primary-foreground">
                          Principal
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.detail}</p>
                  </div>
                  <button className="ml-auto p-2 text-muted-foreground hover:text-destructive" aria-label={`Quitar ${m.label}`}>
                    <Trash2 className="size-4" />
                  </button>
                </div>
              )
            })}
          </div>

          {showAddMethod && (
            <div className="mt-4 border-2 border-primary bg-muted p-4">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Nuevo método</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(['card', 'transfer', 'wallet'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setShowAddMethod(false)}
                    className="flex h-10 items-center justify-center gap-2 border border-border bg-background text-xs font-medium hover:border-primary transition-colors"
                  >
                    {t === 'card' ? <CreditCard className="size-4" /> : t === 'transfer' ? <Landmark className="size-4" /> : <Smartphone className="size-4" />}
                    {t === 'card' ? 'Tarjeta' : t === 'transfer' ? 'Transferencia' : 'Billetera'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dirección de facturación */}
          <div className="mt-6 border-2 border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Dirección de facturación</p>
              <button className="text-xs font-medium text-primary hover:underline">Editar</button>
            </div>
            <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 flex-shrink-0 text-primary" />
              <p>
                {billingAddress.line1}, {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
              </p>
            </div>
          </div>
        </section>

        {/* Facturas */}
        <section>
          <h2 className="font-display text-xl font-bold">Facturas</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-2 border-border bg-muted">
                  <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">Número</th>
                  <th className="p-3 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">Período</th>
                  <th className="p-3 text-right font-mono text-xs uppercase tracking-widest text-muted-foreground">Monto</th>
                  <th className="p-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">Estado</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => {
                  const s = statusStyles[inv.status]
                  return (
                    <tr key={inv.id} className="border-b border-border">
                      <td className="p-3 font-mono text-sm">{inv.number}</td>
                      <td className="p-3 text-sm">{inv.period}</td>
                      <td className="p-3 text-right font-mono text-sm font-semibold">C${inv.amount}</td>
                      <td className="p-3 text-center">
                        <span className={cn('px-2 py-0.5 text-xs font-semibold', s.bg, s.text)}>{s.label}</span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline" aria-label={`Descargar ${inv.number}`}>
                          <Download className="size-3.5" /> PDF
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex items-start gap-3 border-2 border-border bg-muted p-4">
            <Receipt className="mt-0.5 size-5 flex-shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              Necesitás un recibo para tu contabilidad o un desglose de tus entregas.{' '}
              <a href="https://wa.me/50584125678" target="_blank" rel="noopener noreferrer" className="font-semibold text-whatsapp hover:underline">
                Escribinos por WhatsApp
              </a>
              .
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="size-3.5 text-whatsapp" />
            En este entorno de demostración los pagos se simulan localmente; no se procesan transacciones reales.
          </div>
        </section>
      </div>
    </div>
  )
}

export default BillingPage
