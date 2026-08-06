import { describe, expect, it } from 'vitest'
import { createChatState, processMessage } from './chat-flow'

describe('chat-flow', () => {
  it('createChatState returns initial state', () => {
    const state = createChatState()
    expect(state.messages).toHaveLength(1)
    expect(state.messages[0].role).toBe('bot')
    expect(state.subscribed).toBe(false)
    expect(state.service).toBeNull()
  })

  it('processMessage handles greeting', () => {
    const state = createChatState()
    const result = processMessage(state, 'Hola')
    expect(result.messages[result.messages.length - 1].role).toBe('bot')
    expect(result.messages[result.messages.length - 1].text).toContain('Hola')
  })

  it('processMessage gates pricing behind subscription', () => {
    const state = createChatState()
    const result = processMessage(state, 'cuánto cuesta el envío')
    const lastBot = result.messages.filter((m) => m.role === 'bot').pop()
    expect(lastBot?.text).toContain('suscrito')
  })

  it('processMessage allows pricing after subscription', () => {
    let state = createChatState()
    state = processMessage(state, 'sí estoy suscrito')
    state = processMessage(state, 'cuánto cuesta el envío')
    const lastBot = state.messages.filter((m) => m.role === 'bot').pop()
    expect(lastBot?.text).not.toContain('suscrito')
  })

  it('processMessage finds service by slug keyword', () => {
    const state = createChatState()
    const result = processMessage(state, 'necesito acarreo')
    const lastBot = result.messages.filter((m) => m.role === 'bot').pop()
    expect(lastBot?.text).toContain('Acarreo')
  })

  it('processMessage handles thank you', () => {
    const state = createChatState()
    const result = processMessage(state, 'gracias')
    const lastBot = result.messages.filter((m) => m.role === 'bot').pop()
    expect(lastBot?.text).toContain('De nada')
  })

  it('processMessage tracks municipality', () => {
    const state = createChatState()
    const result = processMessage(state, 'desde estelí')
    expect(result.municipality).toBe('Estelí')
  })

  it('processMessage tracks round trip', () => {
    const state = createChatState()
    const result = processMessage(state, 'ida y vuelta')
    expect(result.roundTrip).toBe('round')
  })

  it('processMessage tracks vehicle hours', () => {
    const state = createChatState()
    const result = processMessage(state, '3 horas')
    expect(result.vehicleHours).toBe(3)
  })

  it('processMessage returns quote when service and municipality are set', () => {
    let state = createChatState()
    state = processMessage(state, 'necesito acarreo')
    state = processMessage(state, 'desde estelí')
    state = processMessage(state, 'ida y vuelta')
    state = processMessage(state, '2 horas')
    const lastBot = state.messages.filter((m) => m.role === 'bot').pop()
    expect(lastBot?.text).toContain('C$')
  })
})