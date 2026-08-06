import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { gallery } from '@/lib/mock-data/gallery'

export function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Galería</h1>
      <p className="mt-2 text-muted-foreground">Un vistazo a nuestro equipo y entregas.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <div key={item.id} className="group relative aspect-square overflow-hidden border border-border">
          <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <p className="absolute bottom-3 left-3 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}