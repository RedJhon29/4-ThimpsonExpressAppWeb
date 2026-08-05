import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="h-full rounded-[2px] border-border transition-colors hover:border-primary">
      <CardContent className="flex h-full flex-col gap-3 p-5">
        <div className="grid size-11 place-items-center bg-dark-band text-primary">
          <span className="text-lg font-display font-bold">{service.name.charAt(0)}</span>
        </div>
        <h3 className="font-display text-lg font-semibold">{service.name}</h3>
        <p className="flex-1 text-sm text-muted-foreground">{service.shortDescription}</p>
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <p className="font-mono text-lg font-semibold">
              {service.pricingType === 'fixed' ? `C$${service.basePrice}` : 'Cotización'}
            </p>
            <p className="text-xs text-muted-foreground">{service.pricingType === 'fixed' ? 'precio base' : 'según factores'}</p>
          </div>
          <Link to={`/servicios/${service.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            Cotizar <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}