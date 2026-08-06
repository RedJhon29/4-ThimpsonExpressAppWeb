import { useState } from 'react'
import { Bot, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createChatState, processMessage } from './chat-flow'
import type { ChatState } from './chat-flow'

export function WebChat({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<ChatState>(createChatState())
  const [input, setInput] = useState('')

  const send = () => {
    const text = input.trim()
    if (!text) return
    setState((prev) => processMessage(prev, text))
    setInput('')
  }

  return (
    <div className="fixed bottom-24 right-5 z-50 flex h-[420px] w-80 flex-col border-2 border-primary bg-card shadow-lg">
      <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-3">
        <div className="flex items-center gap-2">
          <Bot className="size-5 text-primary" />
          <span className="font-display text-sm font-semibold">Thimpson Assistant</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 rounded-[2px]" onClick={onClose} aria-label="Cerrar chat">
          <X className="size-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {state.messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-[2px] px-3 py-2 text-sm ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border p-3">
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); send() }}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Preguntá por precios, servicios..."
            className="rounded-[2px]"
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" className="rounded-[2px]" aria-label="Enviar">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}