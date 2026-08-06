import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function BusinessRegisterPage() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center">
        <div className="border-2 border-primary bg-muted p-8">
          <h2 className="font-display text-xl font-bold">Solicitud recibida</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            En breve un asesor se comunicará para activar tu negocio en el marketplace.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <Link to="/marketplace" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Marketplace
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Registrar negocio</h1>
      <p className="mt-2 text-muted-foreground">Completa el formulario para unirte al marketplace de Thimpson Express.</p>

      <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
        <div>
          <Label htmlFor="name">Nombre del negocio</Label>
          <Input id="name" placeholder="Tu negocio" required />
        </div>
        <div>
          <Label htmlFor="category">Categoría</Label>
          <select id="category" className="flex h-10 w-full rounded-[2px] border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Selecciona</option>
            <option value="comida">Comida</option>
            <option value="farmacia">Farmacia</option>
            <option value="supermercado">Supermercado</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" type="tel" placeholder="+505 0000 0000" required />
        </div>
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" placeholder="Dirección del negocio" required />
        </div>
        <div>
          <Label htmlFor="mission">Misión</Label>
          <Textarea id="mission" placeholder="¿Qué ofrece tu negocio?" required />
        </div>
        <div>
          <Label htmlFor="vision">Visión</Label>
          <Textarea id="vision" placeholder="¿Cómo te imaginas en 2 años?" />
        </div>
        <div>
          <Label>Plan</Label>
          <select className="flex h-10 w-full rounded-[2px] border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Selecciona</option>
            <option value="free">Gratuito</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        <Button type="submit" className="w-full rounded-[2px]">Enviar solicitud</Button>
      </form>
    </div>
  )
}