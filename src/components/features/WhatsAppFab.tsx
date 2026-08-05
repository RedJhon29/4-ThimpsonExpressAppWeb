import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const WHATSAPP_URL = 'https://wa.me/50584159112'

export function WhatsAppFab() {
  return (
    <Button
      asChild
      size="icon"
      className="fixed bottom-5 right-5 z-50 size-14 rounded-full bg-whatsapp hover:bg-whatsapp/90"
      aria-label="Abrir chat de WhatsApp"
    >
      <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
        <MessageCircle className="size-6" />
      </a>
    </Button>
  )
}