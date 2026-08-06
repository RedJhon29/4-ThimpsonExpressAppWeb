import { useState } from 'react'
import { Bot, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WebChat } from '@/components/features/chat/WebChat'

export function ChatLauncher() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        size="icon"
        className="fixed bottom-5 right-20 z-50 size-14 rounded-[2px] bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat con el asistente virtual'}
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </Button>
      {open && <WebChat onClose={() => setOpen(false)} />}
    </>
  )
}