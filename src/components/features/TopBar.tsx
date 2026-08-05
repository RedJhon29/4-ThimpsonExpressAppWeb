import { Phone } from 'lucide-react'

const PHONE_CLARO = '+505 8415 9112'
const PHONE_TIGO = '+505 8593 2295'

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5 text-xs font-medium">
        <p>Servicio Express Thimpson · Ocotal, Nicaragua</p>
        <div className="flex items-center gap-4">
          <a href={`tel:${PHONE_CLARO.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:underline">
            <Phone className="size-3.5" /> Claro {PHONE_CLARO}
          </a>
          <a href={`tel:${PHONE_TIGO.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:underline">
            <Phone className="size-3.5" /> Tigo {PHONE_TIGO}
          </a>
        </div>
      </div>
    </div>
  )
}