import { services } from '@/lib/mock-data/services'

export interface ChatMessage {
  role: 'user' | 'bot'
  text: string
}

export interface ChatState {
  messages: ChatMessage[]
  subscribed: boolean
  service: string | null
  stops: number
  contentCost: number
  municipality: string | null
  roundTrip: 'one' | 'round'
  vehicleHours: number
}

export function createChatState(): ChatState {
  return {
    messages: [
      { role: 'bot', text: '¡Hola! Bienvenido a Thimpson Express. ¿En qué puedo ayudarte?' },
    ],
    subscribed: false,
    service: null,
    stops: 1,
    contentCost: 0,
    municipality: null,
    roundTrip: 'one',
    vehicleHours: 1,
  }
}

function findService(input: string): typeof services[0] | undefined {
  const lower = input.toLowerCase()
  return services.find((s) => s.slug.split('-').some((w) => lower.includes(w)))
}

function calculateQuote(state: ChatState): string {
  const MUNICIPALITY_MULTIPLIER: Record<string, number> = {
    ocotal: 1, esteli: 1.6, jinotega: 1.8, madriz: 1.5, somoto: 1.5,
  }
  const key = (state.municipality ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
  const base = state.roundTrip === 'round' ? 600 : 400
  const multiplier = MUNICIPALITY_MULTIPLIER[key] ?? 1.4
  const timeCharge = Math.max(0, state.vehicleHours) * 150
  const total = Math.round((base * multiplier + timeCharge) / 10) * 10
  const trip = state.roundTrip === 'round' ? 'ida y vuelta' : 'ida simple'
  return `Cotización estimada ${state.municipality} (${trip}, ${state.vehicleHours}h): C$${total}. El precio final lo confirma el equipo Thimpson.`
}

export function processMessage(state: ChatState, input: string): ChatState {
  const lower = input.toLowerCase().trim()
  let next: Partial<ChatState> = {}

  if (lower.includes('suscrito') || lower.includes('suscribir') || lower.includes('ya estoy suscrito') || lower.includes('tengo cuenta')) {
    next = { subscribed: true }
  }

  if (!state.subscribed && !lower.includes('suscrito') && !lower.includes('suscribir')) {
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuánto') || lower.includes('enviar') || lower.includes('delivery')) {
      return {
        ...state,
        messages: [
          ...state.messages,
          { role: 'user', text: input },
          { role: 'bot', text: 'Para cotizar un servicio necesitás estar suscrito. ¿Ya tenés cuenta? Respondé "sí" para iniciar sesión o "suscribirme" para crear una.' },
        ],
      }
    }
  }

  const service = findService(input)
  if (service) {
    next = { service: service.name }
    if (service.pricingType === 'fixed') {
      return {
        ...state,
        ...next,
        messages: [
          ...state.messages,
          { role: 'user', text: input },
          { role: 'bot', text: `El costo base de ${service.name} es C$${service.basePrice}. Para calcular el precio exacto según tu ruta y paradas, usá la calculadora en la página de ${service.name.toLowerCase()}.` },
        ],
      }
    }
    return {
      ...state,
      ...next,
      messages: [
        ...state.messages,
        { role: 'user', text: input },
        { role: 'bot', text: `${service.name} tiene un costo variable según distancia y tiempo. ¿Desde qué municipio y hacia dónde necesitás el envío?` },
      ],
    }
  }

  if (lower.includes('municipio') || lower.includes('desde') || lower.includes('hacia') || lower.includes('destino')) {
    const municipalities = ['ocotal', 'estelí', 'jinotega', 'somoto', 'matagalpa', 'managua', 'león', 'chinandega']
    const found = municipalities.find((m) => lower.includes(m))
    if (found) {
      next = { municipality: found.charAt(0).toUpperCase() + found.slice(1) }
    }
  }

  if (lower.includes('ida y vuelta') || lower.includes('round') || lower.includes('vuelta')) {
    next = { roundTrip: 'round' }
  }
  if (lower.includes('solo ida') || lower.includes('one') || lower.includes('ida simple')) {
    next = { roundTrip: 'one' }
  }

  const hoursMatch = input.match(/(\d+)\s*hora/)
  if (hoursMatch) {
    next = { vehicleHours: parseInt(hoursMatch[1], 10) }
  }

  if (state.service && state.municipality) {
    const service = services.find((s) => s.name === state.service)
    if (service && service.pricingType === 'quote') {
      const quote = calculateQuote(state)
      return {
        ...state,
        ...next,
        messages: [
          ...state.messages,
          { role: 'user', text: input },
          { role: 'bot', text: quote },
        ],
      }
    }
  }

  if (lower.includes('gracias') || lower.includes('thank')) {
    return {
      ...state,
      ...next,
      messages: [
        ...state.messages,
        { role: 'user', text: input },
        { role: 'bot', text: '¡De nada! Si necesitás algo más, preguntá sin duda.' },
      ],
    }
  }

  if (lower.includes('hola') || lower.includes('buenos') || lower.includes('hey') || lower.includes('saludo')) {
    return {
      ...state,
      ...next,
      messages: [
        ...state.messages,
        { role: 'user', text: input },
        { role: 'bot', text: '¡Hola! 👋 Bienvenido a Thimpson Express. ¿En qué puedo ayudarte?' },
      ],
    }
  }

  return {
    ...state,
    ...next,
    messages: [
      ...state.messages,
      { role: 'user', text: input },
      { role: 'bot', text: 'Gracias por tu mensaje. Para una respuesta más rápida, describí tu necesidad: ¿necesitás enviar un paquete, cotizar un viaje o conocés nuestros negocios afiliados?' },
    ],
  }
}