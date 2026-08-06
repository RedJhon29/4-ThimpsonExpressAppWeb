import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SubscribePage() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center">
        <div className="border-2 border-primary bg-muted p-8">
          <h2 className="font-display text-xl font-bold">¡Suscripción confirmada!</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Recibirás novedades de Thimpson Express en tu correo.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Suscribirse</h1>
      <p className="mt-2 text-muted-foreground">Recibí novedades y ofertas de Thimpson Express en tu correo.</p>
      <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="tu@email.com" required />
        </div>
        <Button type="submit" className="w-full rounded-[2px]">Suscribirse</Button>
      </form>
    </div>
  )
}