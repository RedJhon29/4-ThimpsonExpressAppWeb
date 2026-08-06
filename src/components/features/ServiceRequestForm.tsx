import { useMemo, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import type { Service } from '@/lib/types'
import { calculateFixedPrice } from '@/lib/pricing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function ServiceRequestForm({ service }: { service: Service }) {
  const [stops, setStops] = useState(1)
  const [contentCost, setContentCost] = useState(0)
  const [municipality, setMunicipality] = useState('')
  const [roundTrip, setRoundTrip] = useState<'one' | 'round'>('one')
  const [vehicleHours, setVehicleHours] = useState(1)
  const [sent, setSent] = useState(false)

  const total = useMemo(() => {
    if (service.pricingType === 'fixed') {
      return calculateFixedPrice(service, Math.max(1, stops), Math.max(0, contentCost))
    }
    return null
  }, [service, stops, contentCost])

  const quoteText = useMemo(() => {
    if (service.pricingType !== 'quote') return ''
    if (!municipality) return 'Completa el municipio para estimar tu cotización.'
    const MUNICIPALITY_MULTIPLIER: Record<string, number> = {
      ocotal: 1, esteli: 1.6, jinotega: 1.8, madriz: 1.5, somoto: 1.5,
    }
    const key = municipality.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
    const base = roundTrip === 'round' ? 600 : 400
    const multiplier = MUNICIPALITY_MULTIPLIER[key] ?? 1.4
    const timeCharge = Math.max(0, vehicleHours) * 150
    const total = Math.round((base * multiplier + timeCharge) / 10) * 10
    const trip = roundTrip === 'round' ? 'ida y vuelta' : 'ida simple'
    return `Cotización estimada ${municipality} (${trip}, ${vehicleHours}h): C$${total}. El precio final lo confirma el equipo Thimpson.`
  }, [service.pricingType, municipality, roundTrip, vehicleHours])

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-3 border-2 border-primary bg-muted p-8 text-center">
        <CheckCircle2 className="size-10 text-primary" />
        <h3 className="font-display text-xl font-bold">Solicitud enviada</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Recibimos tu solicitud. Un asesor de Thimpson Express la confirmará en breve.
        </p>
      </div>
    )
  }

  return (
    <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
      <div>
        <Label htmlFor="origin">Punto de origen</Label>
        <Input id="origin" placeholder="Barrio, dirección o referencia en Ocotal" required />
      </div>
      <div>
        <Label htmlFor="destiny">Punto de destino</Label>
        <Input id="destiny" placeholder="Barrio, dirección o municipio" required />
      </div>

      {service.perStop && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="stops">Número de paradas</Label>
            <Input id="stops" type="number" min={1} value={stops} onChange={(e) => setStops(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="content">Costo del contenido (C$)</Label>
            <Input id="content" type="number" min={0} value={contentCost} onChange={(e) => setContentCost(Number(e.target.value))} />
          </div>
        </div>
      )}

      {service.askContent && (
        <div>
          <Label htmlFor="contentDesc">Contenido del paquete</Label>
          <Textarea id="contentDesc" placeholder="Describe el contenido que se enviará" required />
        </div>
      )}

      {service.pricingType === 'quote' && (
        <>
          <div>
            <Label htmlFor="municipality">Municipio o departamento</Label>
            <select id="municipality" value={municipality} onChange={(e) => setMunicipality(e.target.value)} className="flex h-10 w-full rounded-[2px] border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="">Selecciona el destino</option>
              {['Ocotal', 'Estelí', 'Jinotega', 'Somoto', 'Matagalpa', 'Managua', 'León', 'Chinandega'].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Tipo de viaje</Label>
            <select value={roundTrip} onChange={(e) => setRoundTrip(e.target.value as 'one' | 'round')} className="flex h-10 w-full rounded-[2px] border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              <option value="one">Solo ida</option>
              <option value="round">Ida y vuelta</option>
            </select>
          </div>
          <div>
            <Label htmlFor="vehicleHours">Tiempo que ocupará el vehículo (horas)</Label>
            <Input id="vehicleHours" type="number" min={1} value={vehicleHours} onChange={(e) => setVehicleHours(Number(e.target.value))} />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="name">Tu nombre</Label>
        <Input id="name" placeholder="Nombre completo" required />
      </div>
      <div>
        <Label htmlFor="phone">Teléfono de contacto</Label>
        <Input id="phone" type="tel" placeholder="+505 0000 0000" required />
      </div>

      {service.pricingType === 'fixed' && total !== null && (
        <div className="border-2 border-primary bg-muted p-4 text-right">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Total estimado</p>
          <p className="font-mono text-3xl font-semibold">C$ {total.toLocaleString()}</p>
        </div>
      )}
      {service.pricingType === 'quote' && (
        <p className="border border-border bg-muted p-3 text-sm text-muted-foreground">{quoteText}</p>
      )}

      <Button type="submit" className="w-full rounded-[2px]">Enviar solicitud</Button>
    </form>
  )
}