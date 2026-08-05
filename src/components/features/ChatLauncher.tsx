import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ChatLauncher() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-40px)] flex-col border border-border bg-background shadow-lg">
          <div className="flex items-center justify-between bg-dark-band px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Asistente Thimpson</p>
              <p className="text-xs text-white/60">En línea · responde al instante</p>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              <X className="size-5" />
            </Button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 text-muted-foreground">
            Chat con el asistente virtual de Thimpson Express
          </div>
        </div>
      )}
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-5 right-20 z-50 size-14 rounded-full"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Cerrar chat' : 'Abrir chat con el asistente virtual'}
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </Button>
    </>
  )
}