import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { testimonials } from '@/lib/mock-data/testimonials'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Nosotros</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        Thimpson Express nació en Ocotal con la misión de hacer llegar cada paquete a su destino con la rapidez y el cuidado que merece. Somos un equipo local que conoce las rutas, los barrios y las necesidades de nuestra comunidad.
      </p>

      <div className="mt-10 border-2 border-primary p-8">
        <h2 className="font-display text-xl font-bold">Nuestra visión</h2>
        <p className="mt-3 text-muted-foreground">
          Ser el servicio de delivery de referencia en el norte de Nicaragua, conectando negocios locales con sus clientes de forma rápida y confiable.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold">Lo que dicen nuestros clientes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{t.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}