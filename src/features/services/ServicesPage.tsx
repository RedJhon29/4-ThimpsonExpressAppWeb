import { ServiceCard } from '@/components/features/ServiceCard'
import { services } from '@/lib/mock-data/services'

export function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">Servicios</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Nuestros servicios</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Precios base dentro de Ocotal. Para viajes, transporte, acarreo y mudanzas te enviamos una cotización personalizada.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  )
}