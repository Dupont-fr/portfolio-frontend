import { GitBranch, UserRound, AtSign, Mail } from 'lucide-react'
import type { SocialLink } from '@/types'

export const SITE = {
  name: 'Portfolio',
  //brand: 'DevStack',
  brand: 'Dupont Djeague',
  role: 'Développeur Full Stack JavaScript',
  email: 'dupontdjeague@gmail.com',
  location: 'Cameroun',
  tagline: 'Je conçois et développe des expériences web premium, performantes et accessibles.',
  availability: 'Disponible pour de nouvelles missions',
} as const

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/Dupont-fr', icon: GitBranch },
  { label: 'LinkedIn', url: 'https://linkedin.com', icon: UserRound },
  { label: 'Twitter', url: 'https://twitter.com', icon: AtSign },
  { label: 'Email', url: `mailto:${SITE.email}`, icon: Mail },
]
