import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Phone, ShoppingCart, Star } from 'lucide-react'
import { getBusinessBySlug } from '@/lib/mock-data/businesses'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NotFound } from '@/app/NotFound'

export function BusinessPage() {
  const { slug } = useParams()
  const business = slug ? getBusinessBySlug(slug) : undefined

  if (!business) return <NotFound />

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Marketplace
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid h-48 place-items-center" style={{ backgroundColor: business.categoryColor }}>
            <span className="font-display text-5xl font-bold text-white">{business.name.charAt(0)}</span>
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">{business.name}</h1>
          <p className="mt-2 flex items-center gap-1 text-sm font-medium">
            <Star className="size-4 fill-primary text-primary" /> {business.rating}
            <span className="text-muted-foreground">({business.reviews} reseñas)</span>
            <Badge variant="secondary" className="ml-2">{business.category}</Badge>
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="border border-border p-5">
              <h2 className="font-display text-lg font-semibold">Misión</h2>
              <p className="mt-2 text-sm text-muted-foreground">{business.mission}</p>
            </div>
            <div className="border border-border p-5">
              <h2 className="font-display text-lg font-semibold">Visión</h2>
              <p className="mt-2 text-sm text-muted-foreground">{business.vision}</p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl font-bold">Productos</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {business.products.map((product) => (
                <div key={product.id} className="flex items-center justify-between border border-border p-4">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="mt-1 font-mono text-sm text-muted-foreground">C$ {product.price}</p>
                  </div>
                  <Badge variant={product.stock > 0 ? 'outline' : 'destructive'}>
                    {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {business.services.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-xl font-bold">Servicios</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {business.services.map((service) => (
                  <div key={service.id} className="border border-border p-4">
                    <p className="font-medium">{service.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                    <p className="mt-2 font-mono text-sm font-semibold">
                      {service.price !== null ? `C$ ${service.price}` : 'Consultar'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="border-2 border-primary p-5">
            <h2 className="font-display text-lg font-bold">Pedir con Thimpson Express</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Todo pedido de este negocio se entrega con el delivery de Thimpson Express automáticamente.
            </p>
            <Button className="mt-4 w-full rounded-[2px]" disabled>
              <ShoppingCart className="mr-2 size-4" /> Pedir ahora
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">Disponible pronto en la app</p>
          </div>
          <div className="border border-border p-5">
            <h3 className="text-sm font-semibold">Contacto</h3>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4" /> {business.phone}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{business.address}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}