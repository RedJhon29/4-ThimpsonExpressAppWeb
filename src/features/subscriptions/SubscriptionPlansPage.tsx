import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, X, Zap, Building2, Sparkles, ShieldCheck, CreditCard, ArrowRight, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { plans } from '@/lib/mock-data/plans'
import type { BillingCycle } from '@/lib/mock-data/plans'

const planIcons: Record<string, typeof Zap> = {
  free: Sparkles,
  pro: Zap,
  business: Building2,
}

const comparisons = [
  { feature: 'Entregas / mes', free: '10', pro: '200', business: 'Ilimitadas' },
  { feature: 'Chat WhatsApp + Web', free: true, pro: true, business: true },
  { feature: 'Rastreo en vivo + ETA', free: false, pro: true, business: true },
  { feature: 'Precios corporativos', free: false, pro: true, business: true },
  { feature: 'Reportes avanzados', free: false, pro: true, business: true },
  { feature: 'Rider dedicado', free: false, pro: false, business: true },
  { feature: 'Soporte prioritario 24/7', free: false, pro: false, business: true },
]

const faqs = [
  { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí. Tu suscripción es mes a mes y podés cancelarla cuando quieras desde el panel sin penalización.' },
  { q: '¿El plan anual me conviene?', a: 'El plan anual incluye 2 meses gratis (20% de ahorro). Ideal si ya estás usando el servicio de forma constante.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito/débito, transferencia bancaria y billeteras móviles. Para negocios también facturación mensual.' },
  { q: '¿Qué pasa si me paso de las entregas de mi plan?', a: 'No te bloqueamos. Las entregas extra se cobran al precio normal y al renovar podés subir de plan sin fricción.' },
]

function checkValue(v: string | boolean) {
  if (typeof v === 'boolean') return v
  return true
}

export function SubscriptionPlansPage() {
  const [cycle, setCycle] = useState<BillingCycle>('annual')

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Planes para negocios</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Thimpson Express para tu negocio
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Empezá gratis y escalá cuando tu negocio crezca. Sin letra pequeña, sin permanencia.
        </p>

        {/* Toggle mensual/anual */}
        <div className="mt-6 inline-flex items-center gap-1 border-2 border-primary bg-muted p-1">
          <button
            onClick={() => setCycle('monthly')}
            className={cn(
              'h-9 px-4 text-sm font-semibold transition-colors',
              cycle === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Mensual
          </button>
          <button
            onClick={() => setCycle('annual')}
            className={cn(
              'h-9 px-4 text-sm font-semibold transition-colors',
              cycle === 'annual' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Anual
          </button>
          <span className="ml-1 mr-1 h-9 flex items-center bg-whatsapp/10 px-3 text-xs font-bold text-whatsapp">
            2 meses gratis
          </span>
        </div>
      </div>

      {/* Cards de planes */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {plans.map(plan => {
          const price = cycle === 'monthly' ? plan.monthly : plan.annual / 12
          const Icon = planIcons[plan.id]

          return (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col border-2 p-6',
                plan.highlight
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card'
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Más popular
                </span>
              )}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-muted border border-border">
                  <Icon className={cn('size-5', plan.highlight ? 'text-primary' : 'text-muted-foreground')} />
                </div>
                <h2 className="font-display text-lg font-bold">{plan.name}</h2>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="font-mono text-4xl font-bold">
                  {price === 0 ? 'C$0' : `C$${price}`}
                </span>
                <span className="mb-1 text-xs text-muted-foreground">/ mes</span>
              </div>
              {cycle === 'annual' && price > 0 && (
                <p className="mt-1 text-xs text-whatsapp">
                  C${plan.annual} facturados por año
                </p>
              )}

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f, i) => (
                  <li key={i} className={cn('flex items-start gap-2 text-sm', !f.included && 'text-muted-foreground/60')}>
                    {f.included ? (
                      <Check className="mt-0.5 size-4 flex-shrink-0 text-whatsapp" />
                    ) : (
                      <X className="mt-0.5 size-4 flex-shrink-0 text-muted-foreground/40" />
                    )}
                    {f.label}
                  </li>
                ))}
              </ul>

              <Link
                to={`/planes/checkout/${plan.id}`}
                className={cn(
                  'mt-6 flex h-11 w-full items-center justify-center text-sm font-bold transition-colors',
                  plan.highlight
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border-2 border-primary text-foreground hover:bg-primary/10'
                )}
              >
                {plan.cta}
              </Link>
            </div>
          )
        })}
      </div>

      {/* Nota pagos */}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 border-2 border-border bg-card p-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <CreditCard className="size-5 text-primary" />
          <p className="text-sm text-muted-foreground">
            Facturación segura. Pagá con tarjeta, transferencia o billetera móvil.
          </p>
        </div>
        <Link
          to="/marketplace/registro"
          className="inline-flex h-10 items-center gap-2 border-2 border-primary px-4 text-sm font-bold text-foreground hover:bg-primary/10 transition-colors"
        >
          Registrar mi negocio <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Comparativa */}
      <div className="mt-14">
        <h2 className="text-center font-display text-2xl font-bold">Comparativa de planes</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr className="border-2 border-border">
                <th className="bg-muted p-3 text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Funcionalidad
                </th>
                <th className="bg-muted p-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">Gratis</th>
                <th className="bg-primary/10 p-3 text-center font-mono text-xs uppercase tracking-widest text-primary">Pro</th>
                <th className="bg-muted p-3 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">Empresarial</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="p-3 text-sm">{row.feature}</td>
                  <td className="p-3 text-center">
                    {typeof row.free === 'boolean'
                      ? checkValue(row.free)
                        ? <Check className="mx-auto size-4 text-whatsapp" />
                        : <X className="mx-auto size-4 text-muted-foreground/40" />
                      : <span className="font-mono text-sm">{row.free}</span>}
                  </td>
                  <td className="bg-primary/5 p-3 text-center">
                    {typeof row.pro === 'boolean'
                      ? checkValue(row.pro)
                        ? <Check className="mx-auto size-4 text-whatsapp" />
                        : <X className="mx-auto size-4 text-muted-foreground/40" />
                      : <span className="font-mono text-sm">{row.pro}</span>}
                  </td>
                  <td className="p-3 text-center">
                    {typeof row.business === 'boolean'
                      ? checkValue(row.business)
                        ? <Check className="mx-auto size-4 text-whatsapp" />
                        : <X className="mx-auto size-4 text-muted-foreground/40" />
                      : <span className="font-mono text-sm">{row.business}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold">Preguntas frecuentes</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ¿Tenés otra duda? Escribinos por WhatsApp o al chat.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group border-2 border-border bg-card p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold">
                {faq.q}
                <span className="font-mono text-primary transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* CTA final */}
      <div className="mt-14 border-2 border-primary bg-dark-band p-8 text-center text-white">
        <ShieldCheck className="mx-auto size-10 text-primary" />
        <h2 className="mt-3 font-display text-2xl font-bold">Empezá hoy, es gratis</h2>
        <p className="mx-auto mt-2 max-w-xl text-white/70">
          Registrá tu negocio en menos de 5 minutos y hacé tu primer envío sin pagar nada.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/marketplace/registro"
            className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Crear cuenta gratis <ArrowRight className="size-4" />
          </Link>
          <a
            href="https://wa.me/50584125678"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 border-2 border-whatsapp px-6 text-sm font-bold text-whatsapp hover:bg-whatsapp/10 transition-colors"
          >
            <MessageCircle className="size-4" /> Hablar con ventas
          </a>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlansPage
