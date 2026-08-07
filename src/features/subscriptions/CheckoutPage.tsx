import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, CreditCard, Landmark, Smartphone, Lock, ShieldCheck, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getPlanById } from '@/lib/mock-data/plans'
import type { BillingCycle } from '@/lib/mock-data/plans'
import { paymentMethods } from '@/lib/mock-data/billing'
import { NotFound } from '@/app/NotFound'

type PayMethod = 'card' | 'transfer' | 'wallet'

export function CheckoutPage() {
  const { planId } = useParams()
  const plan = getPlanById(planId ?? '')

  const [cycle, setCycle] = useState<BillingCycle>('annual')
  const [method, setMethod] = useState<PayMethod>('card')
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('09/28')
  const [cardCvv, setCardCvv] = useState('')
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  if (!plan) return <NotFound />

  const amount = cycle === 'monthly' ? plan.monthly : plan.annual

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setDone(true)
    }, 1400)
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <div className="border-2 border-whatsapp bg-muted p-8">
          <div className="mx-auto flex size-14 items-center justify-center border-2 border-whatsapp bg-whatsapp/10">
            <Check className="size-7 text-whatsapp" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold">¡Plan activado!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Tu negocio ahora está en el plan <strong className="text-foreground">{plan.name}</strong>
            {cycle === 'annual' ? ' (facturación anual)' : ' (facturación mensual)'} por{' '}
            <strong className="font-mono text-foreground">
              {cycle === 'annual' ? `C$${plan.annual}` : `C$${plan.monthly}`}
            </strong>.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Recibirás un correo con tu factura. Podés gestionar tu suscripción en cualquier momento.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/cuenta/facturacion"
              className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Ver mi facturación
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex h-11 items-center gap-2 border-2 border-primary px-6 text-sm font-bold text-foreground hover:bg-primary/10 transition-colors"
            >
              Ir al marketplace
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/planes" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Volver a planes
      </Link>

      <h1 className="mt-4 font-display text-3xl font-bold">Confirmar plan</h1>
      <p className="mt-2 text-muted-foreground">Completá el pago para activar tu suscripción.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Formulario de pago */}
        <form onSubmit={handleSubmit} className="border-2 border-border bg-card p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">1 · Método de pago</p>

          <div className="mt-4 flex flex-col gap-2">
            {(
              [
                { key: 'card', icon: CreditCard, label: 'Tarjeta de crédito / débito' },
                { key: 'transfer', icon: Landmark, label: 'Transferencia bancaria' },
                { key: 'wallet', icon: Smartphone, label: 'Billetera móvil' },
              ] as { key: PayMethod; icon: typeof CreditCard; label: string }[]
            ).map(m => {
              const Icon = m.icon
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMethod(m.key)}
                  className={cn(
                    'flex items-center gap-3 border-2 p-3 text-left transition-colors',
                    method === m.key
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/40'
                  )}
                >
                  <Icon className={cn('size-5', method === m.key ? 'text-primary' : 'text-muted-foreground')} />
                  <span className="text-sm font-medium">{m.label}</span>
                  <span className="ml-auto flex items-center gap-2">
                    {paymentMethods
                      .filter(p => p.type === m.key)
                      .map(p => (
                        <span key={p.id} className="text-xs font-mono text-muted-foreground">
                          {p.detail}
                        </span>
                      ))}
                  </span>
                </button>
              )
            })}
          </div>

          {method === 'card' && (
            <div className="mt-6 flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium">Número de tarjeta</label>
                <input
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  placeholder="0000 0000 0000 0000"
                  className="mt-1 h-11 w-full border border-input bg-background px-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Nombre en la tarjeta</label>
                <input
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="NOMBRE APELLIDO"
                  required
                  className="mt-1 h-11 w-full border border-input bg-background px-3 text-sm uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Vencimiento</label>
                  <input
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    placeholder="MM/AA"
                    className="mt-1 h-11 w-full border border-input bg-background px-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">CVV</label>
                  <input
                    value={cardCvv}
                    onChange={e => setCardCvv(e.target.value)}
                    placeholder="123"
                    type="password"
                    className="mt-1 h-11 w-full border border-input bg-background px-3 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </div>
          )}

          {method === 'transfer' && (
            <div className="mt-6 border-2 border-border bg-muted p-4">
              <p className="text-sm font-medium">Datos para la transferencia</p>
              <div className="mt-2 flex flex-col gap-1 font-mono text-sm text-muted-foreground">
                <p>Banco: BAC Credomatic</p>
                <p>Cuenta: 1245-6789-0000-8841</p>
                <p>Beneficiario: Thimpson Express, S.A.</p>
                <p className="text-xs">Tu plan se activará al confirmar el pago (1-2 días hábiles).</p>
              </div>
            </div>
          )}

          {method === 'wallet' && (
            <div className="mt-6 border-2 border-border bg-muted p-4">
              <p className="text-sm font-medium">Pago por billetera móvil</p>
              <div className="mt-2 flex flex-col gap-1 font-mono text-sm text-muted-foreground">
                <p>Tigo Money: *844#</p>
                <p>Celular: +505 8412 5678</p>
                <p>Claro Móvil: *222#</p>
                <p className="text-xs">Recibirás una solicitud de pago en tu celular.</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={processing || (method === 'card' && !cardName)}
            className="mt-6 flex h-11 w-full items-center justify-center gap-2 bg-primary text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {processing ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Procesando...
              </>
            ) : (
              <>
                <Lock className="size-4" /> Pagar C${amount} {cycle === 'annual' ? '(anual)' : '(mensual)'}
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" /> Pago cifrado y seguro. Podés cancelar cuando quieras.
          </p>
        </form>

        {/* Resumen del plan */}
        <aside className="border-2 border-primary bg-primary/5 p-6 h-fit">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Resumen</p>
          <h2 className="mt-2 font-display text-xl font-bold">{plan.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

          <div className="mt-4 flex items-end gap-1">
            <span className="font-mono text-3xl font-bold">
              {cycle === 'annual' ? `C$${plan.annual}` : `C$${plan.monthly}`}
            </span>
            <span className="mb-1 text-xs text-muted-foreground">/{cycle === 'annual' ? 'año' : 'mes'}</span>
          </div>
          {cycle === 'annual' && plan.id !== 'free' && (
            <p className="mt-1 text-xs text-whatsapp">Ahorrás 2 meses (C${plan.monthly * 12 - plan.annual}).</p>
          )}

          {/* Toggle ciclo */}
          <div className="mt-4 inline-flex items-center gap-1 border-2 border-primary bg-surface p-1">
            {(['monthly', 'annual'] as BillingCycle[]).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCycle(c)}
                className={cn(
                  'h-8 px-3 text-xs font-semibold transition-colors',
                  cycle === c ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {c === 'monthly' ? 'Mensual' : 'Anual'}
              </button>
            ))}
          </div>

          <ul className="mt-6 flex flex-col gap-2">
            {plan.features.filter(f => f.included).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 flex-shrink-0 text-whatsapp" />
                {f.label}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-primary/20 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-mono text-lg font-bold">
                {cycle === 'annual' ? `C$${plan.annual}` : `C$${plan.monthly}`}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default CheckoutPage
