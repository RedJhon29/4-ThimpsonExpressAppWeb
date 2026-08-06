import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getServiceBySlug } from '@/lib/mock-data/services'
import { ServiceRequestForm } from '@/components/features/ServiceRequestForm'
import { NotFound } from '@/app/NotFound'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) return <NotFound />

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link to="/servicios" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Todos los servicios
      </Link>
      <div className="mt-4 grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-3xl font-bold">{service.name}</h1>
          <p className="mt-4 text-muted-foreground">{service.description}</p>
          <div className="mt-6 border-2 border-primary p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Precio</p>
            <p className="font-mono text-3xl font-semibold">
              {service.pricingType === 'fixed' ? `C$${service.basePrice}` : 'Según cotización'}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{service.priceNote}</p>
          </div>
          {service.coverage.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold">Cobertura</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {service.coverage.map((zone) => (
                  <span key={zone} className="rounded-[2px] bg-muted px-2 py-1 text-xs font-medium capitalize text-muted-foreground">
                    {zone.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Solicitar {service.name.toLowerCase()}</h2>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">
            Llena el formulario y el costo se calcula mientras escribes.
          </p>
          <ServiceRequestForm service={service} />
        </div>
      </div>
    </div>
  )
}