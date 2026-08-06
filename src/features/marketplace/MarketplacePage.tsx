import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Store } from 'lucide-react'
import { businesses } from '@/lib/mock-data/businesses'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CATEGORIES = ['Todos', 'Comida', 'Farmacias', 'Supermercados']

export function MarketplacePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Todos')

  const filtered = businesses.filter((b) => {
    const matchesCategory = category === 'Todos' || b.category === category
    const matchesQuery = b.name.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-primary">Marketplace</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Negocios afiliados</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Comprá en negocios locales y recibí todo con el delivery de Thimpson Express.
      </p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar negocio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar negocio"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              size="sm"
              variant={category === c ? 'default' : 'outline'}
              className="rounded-[2px]"
              onClick={() => setCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((business) => (
          <Link key={business.slug} to={`/marketplace/${business.slug}`} className="group border border-border bg-card transition-colors hover:border-primary">
            <div className="grid h-32 place-items-center" style={{ backgroundColor: business.categoryColor }}>
              <Store className="size-10 text-white" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold group-hover:text-primary">{business.name}</h3>
                <Badge variant={business.plan === 'premium' ? 'default' : 'secondary'}>{business.plan}</Badge>
              </div>
              <p className="mt-2 flex items-center gap-1 text-sm font-medium">
                <Star className="size-4 fill-primary text-primary" /> {business.rating}
                <span className="text-muted-foreground">({business.reviews})</span>
              </p>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{business.mission}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 border-2 border-dashed border-border bg-muted p-10 text-center">
        <h2 className="font-display text-xl font-bold">¿Tenés un negocio?</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Afíliate a Thimpson Express y vendé con delivery incluido. Plan gratuito o premium.
        </p>
        <Button asChild className="rounded-[2px]">
          <Link to="/marketplace/registro">Registrar negocio</Link>
        </Button>
      </div>
    </div>
  )
}