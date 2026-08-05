import { Link } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dark-band text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">
            THIMPSON <span className="text-primary">EXPRESS</span>
          </p>
          <p className="mt-3 text-sm text-white/70">
            Delivery, mandados, encomiendas, viajes, transporte, acarreo y mudanzas en Ocotal y toda Nicaragua.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Enlaces</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link to="/servicios" className="hover:text-primary">Servicios</Link></li>
            <li><Link to="/marketplace" className="hover:text-primary">Marketplace</Link></li>
            <li><Link to="/nosotros" className="hover:text-primary">Nosotros</Link></li>
            <li><Link to="/galeria" className="hover:text-primary">Galería</Link></li>
            <li><Link to="/contacto" className="hover:text-primary">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><Phone className="size-4" /> Claro +505 8415 9112</li>
            <li className="flex items-center gap-2"><Phone className="size-4" /> Tigo +505 8593 2295</li>
            <li className="flex items-center gap-2"><MapPin className="size-4" /> Ocotal, Nueva Segovia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Servicio Express Thimpson. Todos los derechos reservados.
      </div>
    </footer>
  )
}