import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { services } from '@/lib/mock-data/services'
import { businesses } from '@/lib/mock-data/businesses'
import { testimonials } from '@/lib/mock-data/testimonials'
import { cmsBanners, getActiveBanners } from '@/lib/cms'
import { ServiceCard } from '@/components/features/ServiceCard'
import { CtaBanner } from '@/components/features/CtaBanner'

const STEPS = [
  { n: '01', title: 'Solicitá', text: 'Cuéntanos qué necesitás por el chat, WhatsApp o un formulario.' },
  { n: '02', title: 'Te asignamos', text: 'Un motorizado Thimpson cerca de ti toma tu solicitud en minutos.' },
  { n: '03', title: 'Recibís', text: 'Seguimiento del recorrido hasta que tu pedido llega a destino.' },
]

export function HomePage() {
  const activeBanners = getActiveBanners(cmsBanners, new Date())
  const featured = businesses.slice(0, 3)

  return (
    <>
      {activeBanners.map((banner) => (
        <section key={banner.id} className={banner.backgroundColor === 'yellow' ? 'bg-primary text-primary-foreground' : 'bg-dark-band text-white'}>
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-xl font-bold">{banner.title}</h2>
              <p className="text-sm opacity-80">{banner.subtitle}</p>
            </div>
            <Button asChild variant="secondary" className="rounded-[2px]">
              <Link to={banner.ctaHref}>{banner.ctaLabel}</Link>
            </Button>
          </div>
        </section>
      ))}

      <section className="bg-dark-band text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Delivery · Encomiendas · Viajes</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Servicio Express <span className="text-primary">Thimpson</span>
            </h1>
            <p className="mt-4 max-w-md text-white/70">
              Mandados, delivery, encomiendas, viajes expresos, transporte, acarreo y mudanzas.
              Rápidos, seguros y a toda Nicaragua.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-[2px] bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/servicios">Solicitar servicio</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-[2px] border-white/40 text-foreground hover:bg-white/10 hover:text-white">
                <Link to="/marketplace">Ver marketplace</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
          <div className="relative aspect-square overflow-hidden rounded-[2px] border-2 border-primary">
            <img src="/ceo-allan-thimpson.jpg" alt="Allan Thimpson, CEO de Thimpson Express" className="h-full w-full object-contain" />
          </div>
          <div className="md:pt-2">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Fundador</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-white">Allan Thimpson</h3>
            <p className="mt-2 text-sm text-white/60">Líder y visionario detrás de Thimpson Express</p>
          </div>
        </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Nuestros servicios</p>
          <h2 className="mt-2 font-display text-3xl font-bold">¿Qué necesitás hoy?</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="rounded-[2px]">
              <Link to="/servicios">Ver todos los servicios <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-teal-band text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Así funciona</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Tres pasos, cero complicaciones</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="border border-white/15 p-6">
                <p className="font-mono text-sm text-primary">{step.n}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-white/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="border-2 border-primary p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Nuestra misión</p>
              <h2 className="mt-2 font-display text-2xl font-bold">Llegar a cada rincón de tu comunidad</h2>
              <p className="mt-4 text-muted-foreground">
                En Thimpson Express creemos que cada paquete cuenta una historia. Ya sea un regalo para tu familia,
                la mercanía de un negocio local o un documento importante, nos encargamos de que llegue con la
                rapidez y el cuidado que merece. Nacimos en Ocotal para servir a toda Nicaragua, porque confiamos
                en que los negocios locales merecen crecer y las personas merecen recibir lo que necesitan,
                cuando lo necesitan.
              </p>
            </div>
            <div className="border-2 border-primary p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Nuestra visión</p>
              <h2 className="mt-2 font-display text-2xl font-bold">Ser el corazón logístico del norte</h2>
              <p className="mt-4 text-muted-foreground">
                Imaginamos una Nicaragua donde la distancia no sea un obstáculo para oportunidades. Donde cada
                negocio, por pequeño que sea, pueda llegar a clientes en cualquier rincón del país. Donde la
                confianza y la velocidad vayan de la mano. Ese es el futuro que construimos día a día, motorizado
                a motorizado, entrega a entrega.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-primary">Marketplace</p>
              <h2 className="mt-2 font-display text-3xl font-bold">Negocios afiliados</h2>
            </div>
            <Button asChild variant="ghost" className="rounded-[2px]">
              <Link to="/marketplace">Ver todos <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((business) => (
              <Link key={business.slug} to={`/marketplace/${business.slug}`} className="group border border-border bg-card p-5 transition-colors hover:border-primary">
                <div className="flex items-start justify-between">
                  <span className="font-display text-lg font-semibold group-hover:text-primary">{business.name}</span>
                  <span className="rounded-[2px] bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">{business.category}</span>
                </div>
                <p className="mt-2 flex items-center gap-1 text-sm font-medium">
                  <Star className="size-4 fill-primary text-primary" /> {business.rating}
                  <span className="text-muted-foreground">({business.reviews})</span>
                </p>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{business.mission}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-band text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">Testimonios</p>
          <h2 className="mt-2 font-display text-3xl font-bold">Lo que dicen nuestros clientes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="border border-white/15 p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < t.rating ? 'fill-primary text-primary' : 'text-white/30'}`} />
                  ))}
                </div>
                <p className="mt-4 text-sm text-white/80">"{t.quote}"</p>
                <footer className="mt-4 text-sm font-medium">
                  <p className="text-primary">{t.author}</p>
                  <p className="text-white/60">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="¿Necesitás un mandado o delivery ahora?"
        subtitle="Solicitá en menos de un minuto. Motorizado en camino."
        label="Solicitar servicio"
        href="/servicios"
      />
    </>
  )
}