import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { plans } from '@/lib/mock-data/plans'
import type { PlanId } from '@/lib/mock-data/plans'

const CATEGORIES = ['Comida', 'Farmacia', 'Supermercado', 'Otro']

export function BusinessRegisterPage() {
  const [step, setStep] = useState(1)
  const [planId, setPlanId] = useState<PlanId>('pro')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    category: '',
    phone: '',
    address: '',
    mission: '',
    vision: '',
  })

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  const selectedPlan = plans.find(p => p.id === planId) ?? plans[0]

  if (sent) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <div className="border-2 border-whatsapp bg-muted p-8">
          <div className="mx-auto grid size-14 place-items-center border-2 border-whatsapp bg-whatsapp/10">
            <Check className="size-7 text-whatsapp" />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold">Solicitud recibida</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Tu negocio fue registrado con el plan <strong className="text-foreground">{selectedPlan.name}</strong>.
            {selectedPlan.id !== 'free' ? (
              <> Para completar la activación, procesá tu pago en el checkout.</>
            ) : (
              <> Ya podés empezar a usar Thimpson Express.</>
            )}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {selectedPlan.id !== 'free' && (
              <Link
                to={`/planes/checkout/${selectedPlan.id}`}
                className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Pagar ahora <ArrowRight className="size-4" />
              </Link>
            )}
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

  const steps = ['Datos del negocio', 'Elige tu plan', 'Revisión']

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Marketplace
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Registrar negocio</h1>
      <p className="mt-2 text-muted-foreground">Unite al marketplace de Thimpson Express en menos de 5 minutos.</p>

      {/* Stepper */}
      <div className="mt-8 flex items-center gap-2">
        {steps.map((s, i) => {
          const n = i + 1
          const active = step === n
          const done = step > n
          return (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'grid size-8 flex-shrink-0 place-items-center border-2 font-mono text-xs font-bold',
                  active && 'border-primary bg-primary text-primary-foreground',
                  done && 'border-whatsapp bg-whatsapp/10 text-whatsapp',
                  !active && !done && 'border-border text-muted-foreground'
                )}
              >
                {done ? <Check className="size-4" /> : n}
              </div>
              <span className={cn('hidden text-xs font-semibold sm:block', active ? 'text-foreground' : 'text-muted-foreground')}>
                {s}
              </span>
              {n < steps.length && <div className={cn('h-0.5 flex-1', done ? 'bg-whatsapp' : 'bg-border')} />}
            </div>
          )
        })}
      </div>

      {/* Paso 1: datos */}
      {step === 1 && (
        <div className="mt-8">
          <form
            className="flex flex-col gap-5"
            onSubmit={e => {
              e.preventDefault()
              setStep(2)
            }}
          >
            <div>
              <Label htmlFor="name">Nombre del negocio</Label>
              <Input id="name" placeholder="Tu negocio" value={form.name} onChange={set('name')} required />
            </div>
            <div>
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={form.category}
                onChange={set('category')}
                required
                className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" disabled>Selecciona</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" type="tel" placeholder="+505 0000 0000" value={form.phone} onChange={set('phone')} required />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" placeholder="Dirección del negocio" value={form.address} onChange={set('address')} required />
              </div>
            </div>
            <div>
              <Label htmlFor="mission">Misión</Label>
              <Textarea id="mission" placeholder="¿Qué ofrece tu negocio?" value={form.mission} onChange={set('mission')} required />
            </div>
            <div>
              <Label htmlFor="vision">Visión</Label>
              <Textarea id="vision" placeholder="¿Cómo te imaginas en 2 años?" value={form.vision} onChange={set('vision')} />
            </div>
            <Button type="submit" size="lg" className="self-end rounded-none">
              Continuar <ArrowRight className="size-4" />
            </Button>
          </form>
        </div>
      )}

      {/* Paso 2: plan */}
      {step === 2 && (
        <div className="mt-8">
          <div className="flex flex-col gap-4">
            {plans.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlanId(p.id)}
                className={cn(
                  'flex items-center gap-4 border-2 p-4 text-left transition-colors',
                  planId === p.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                )}
              >
                <div className="grid size-11 flex-shrink-0 place-items-center border border-border bg-muted">
                  <Store className={cn('size-5', planId === p.id ? 'text-primary' : 'text-muted-foreground')} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold">{p.name}</p>
                    {p.highlight && (
                      <span className="bg-primary px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-primary-foreground">
                        Más popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-bold">
                    {p.id === 'free' ? 'C$0' : `C$${p.monthly}`}
                    {p.id !== 'free' && <span className="text-xs font-normal text-muted-foreground"> /mes</span>}
                  </p>
                  {p.id === 'pro' && <p className="text-xs text-whatsapp">C$240/año · ahorrás C$60</p>}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)} className="rounded-none">
              <ArrowLeft className="size-4" /> Atrás
            </Button>
            <Button onClick={() => setStep(3)} size="lg" className="rounded-none">
              Continuar <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Paso 3: revisión */}
      {step === 3 && (
        <div className="mt-8">
          <div className="border-2 border-border bg-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Resumen</p>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Negocio</dt>
                <dd className="mt-1 font-semibold">{form.name || '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Categoría</dt>
                <dd className="mt-1 font-semibold">{form.category || '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Teléfono</dt>
                <dd className="mt-1 font-semibold">{form.phone || '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Dirección</dt>
                <dd className="mt-1 font-semibold">{form.address || '—'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Plan</dt>
                <dd className="mt-1 font-semibold">
                  {selectedPlan.name}{' '}
                  <span className="font-mono text-primary">
                    ({selectedPlan.id === 'free' ? 'C$0' : `C$${selectedPlan.monthly}/mes`})
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)} className="rounded-none">
              <ArrowLeft className="size-4" /> Atrás
            </Button>
            <Button size="lg" onClick={() => setSent(true)} className="rounded-none">
              Enviar solicitud
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BusinessRegisterPage
