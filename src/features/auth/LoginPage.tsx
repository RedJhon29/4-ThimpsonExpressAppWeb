import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center">
        <div className="border-2 border-primary bg-muted p-8">
          <h2 className="font-display text-xl font-bold">¡Bienvenido!</h2>
          <p className="mt-3 text-sm text-muted-foreground">Iniciaste sesión correctamente.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Volver al inicio
      </Link>
      <h1 className="mt-4 font-display text-3xl font-bold">Iniciar sesión</h1>
      <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setLoggedIn(true) }}>
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <Input id="email" type="email" placeholder="tu@email.com" required />
        </div>
        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full rounded-[2px]">Iniciar sesión</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿No tenés cuenta?{' '}
        <Link to="/suscribir" className="font-medium text-primary hover:underline">Suscribirse</Link>
      </p>
    </div>
  )
}