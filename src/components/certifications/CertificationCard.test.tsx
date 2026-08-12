import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { Certification } from '@/constants/certifications'
import { CertificationCard } from './CertificationCard'

const certification: Certification = {
  title: 'React Avancé',
  issuer: "MO'OCK Academy",
  issuedAt: '2025-06',
  description: 'Formation avancée sur React et son écosystème.',
  credentialId: 'CR-2025-001',
  url: 'https://example.com/verify',
  tags: ['React', 'TypeScript'],
}

describe('CertificationCard', () => {
  it('affiche le titre, l’organisme et la description', () => {
    render(<CertificationCard certification={certification} />)
    expect(screen.getByText('React Avancé')).toBeInTheDocument()
    expect(screen.getByText("MO'OCK Academy")).toBeInTheDocument()
    expect(screen.getByText(/Formation avancée/)).toBeInTheDocument()
  })

  it('affiche les tags', () => {
    render(<CertificationCard certification={certification} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('formate la date de délivrance en français', () => {
    render(<CertificationCard certification={certification} />)
    expect(screen.getByText('juin 2025')).toBeInTheDocument()
  })

  it('formate une date réduite à l’année', () => {
    render(<CertificationCard certification={{ ...certification, issuedAt: '2024' }} />)
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('affiche l’identifiant de la certification', () => {
    render(<CertificationCard certification={certification} />)
    expect(screen.getByText('CR-2025-001')).toBeInTheDocument()
  })

  it('affiche le lien de vérification', () => {
    render(<CertificationCard certification={certification} />)
    const link = screen.getByRole('link', { name: /Vérifier/ })
    expect(link).toHaveAttribute('href', 'https://example.com/verify')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('indique qu’une certification sans identifiant est vérifiable', () => {
    render(
      <CertificationCard
        certification={{ ...certification, credentialId: undefined, url: undefined }}
      />,
    )
    expect(screen.getByText('Certification vérifiable')).toBeInTheDocument()
  })
})
