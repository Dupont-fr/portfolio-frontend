import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BlogContent } from './BlogContent'

describe('BlogContent', () => {
  it('rend un titre h2', () => {
    render(<BlogContent content="## Mon titre" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Mon titre' })).toBeInTheDocument()
  })

  it('rend un titre h3', () => {
    render(<BlogContent content="### Sous-titre" />)
    expect(screen.getByRole('heading', { level: 3, name: 'Sous-titre' })).toBeInTheDocument()
  })

  it('rend une liste à puces', () => {
    render(<BlogContent content={'- Premier\n- Deuxième'} />)
    expect(screen.getByText('Premier')).toBeInTheDocument()
    expect(screen.getByText('Deuxième')).toBeInTheDocument()
  })

  it('rend une liste numérotée', () => {
    render(<BlogContent content={'1. Étape un\n2. Étape deux'} />)
    expect(screen.getByText('Étape un')).toBeInTheDocument()
    expect(screen.getByText('Étape deux')).toBeInTheDocument()
  })

  it('rend le texte en gras', () => {
    render(<BlogContent content="Texte avec **du gras** ici" />)
    expect(screen.getByText('du gras')).toBeInTheDocument()
  })

  it('rend un lien vers une nouvelle fenêtre', () => {
    render(<BlogContent content="Voir [le site](https://example.com)" />)
    const link = screen.getByRole('link', { name: 'le site' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('rend un séparateur horizontal', () => {
    render(<BlogContent content={'Texte\n\n---\n\nSuite'} />)
    expect(document.querySelector('hr')).toBeInTheDocument()
  })

  it('rend plusieurs paragraphes séparés par une ligne vide', () => {
    render(<BlogContent content={'Premier paragraphe\n\nSecond paragraphe'} />)
    expect(screen.getByText('Premier paragraphe')).toBeInTheDocument()
    expect(screen.getByText('Second paragraphe')).toBeInTheDocument()
  })
})
