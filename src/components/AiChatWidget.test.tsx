import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { sendAiChat } from '@/services/public'
import { AiChatWidget } from './AiChatWidget'

vi.mock('@/services/public', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services/public')>()
  return { ...actual, sendAiChat: vi.fn() }
})

describe('AiChatWidget', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.mocked(sendAiChat).mockReset()
    vi.mocked(sendAiChat).mockResolvedValue('Voici une réponse de démonstration.')
  })

  it('affiche le bouton d’ouverture du chat', () => {
    render(<AiChatWidget />)
    expect(screen.getByRole('button', { name: 'Ouvrir le chat Dupont AI' })).toBeInTheDocument()
  })

  it('ouvre le panneau avec le message de bienvenue', () => {
    render(<AiChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le chat Dupont AI' }))
    expect(screen.getByLabelText('Chat Dupont AI')).toBeInTheDocument()
    expect(screen.getByText('Assistant du portfolio · en ligne')).toBeInTheDocument()
    expect(screen.getByText(/Bonjour !/)).toBeInTheDocument()
  })

  it('propose des questions rapides à la première ouverture', () => {
    render(<AiChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le chat Dupont AI' }))
    expect(screen.getByRole('button', { name: 'Que proposez-vous ?' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Comment vous contacter ?' })).toBeInTheDocument()
  })

  it('envoie la question et affiche la réponse de l’assistant', async () => {
    render(<AiChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le chat Dupont AI' }))

    const question = 'Quelles sont tes compétences ?'
    fireEvent.change(screen.getByLabelText('Votre question'), { target: { value: question } })
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }))

    expect(vi.mocked(sendAiChat)).toHaveBeenCalledWith([
      expect.objectContaining({ role: 'assistant' }),
      expect.objectContaining({ role: 'user', content: question }),
    ])
    expect(await screen.findByText(/réponse de démonstration/)).toBeInTheDocument()
  })

  it('réinitialise la conversation', () => {
    render(<AiChatWidget />)
    fireEvent.click(screen.getByRole('button', { name: 'Ouvrir le chat Dupont AI' }))
    fireEvent.click(screen.getByRole('button', { name: 'Réinitialiser la conversation' }))
    expect(screen.getByText(/Bonjour !/)).toBeInTheDocument()
  })
})