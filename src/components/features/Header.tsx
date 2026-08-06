import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TopBar } from './TopBar'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/galeria', label: 'Galería' },
  { to: '/contacto', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40">
      <TopBar />
      <nav className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center bg-dark-band font-display text-lg font-bold text-primary">
              T
            </span>
            <span className="font-display text-lg font-bold leading-none">
              THIMPSON <span className="text-primary">EXPRESS</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-[2px] px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-dark-band text-primary' : 'text-foreground hover:bg-muted'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button asChild variant="outline" size="sm">
              <Link to="/suscribir">Suscríbete</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/servicios">Solicitar servicio</Link>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>

        {open && (
          <div className="border-t border-border bg-surface md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className="rounded-[2px] px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild size="sm" className="mt-2">
                <Link to="/servicios" onClick={() => setOpen(false)}>Solicitar servicio</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}