import { BarChart3, ShoppingBag, MessageSquare } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface FeaturedProject {
  slug: string
  title: string
  description: string
  tags: string[]
  icon: LucideIcon
  gradient: string
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'nexus-dashboard',
    title: 'Nexus Dashboard',
    description:
      'Dashboard analytique temps réel avec visualisations interactives, rôles et permissions avancés.',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    icon: BarChart3,
    gradient: 'from-primary/40 via-secondary/20 to-transparent',
  },
  {
    slug: 'aurora-commerce',
    title: 'Aurora Commerce',
    description:
      'Plateforme e-commerce headless : panier fluide, paiement sécurisé et gestion de catalogue complète.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    icon: ShoppingBag,
    gradient: 'from-secondary/40 via-primary/20 to-transparent',
  },
  {
    slug: 'pulse-chat',
    title: 'Pulse Chat',
    description:
      'Application de messagerie temps réel avec présence, notifications et chiffrement de bout en bout.',
    tags: ['React', 'Socket.io', 'Express', 'Redis'],
    icon: MessageSquare,
    gradient: 'from-accent/30 via-secondary/20 to-transparent',
  },
] as const

export const MARQUEE_TECH = [
  'React',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'TailwindCSS',
  //'Next.js',
  'Prisma',
  'GraphQL',
  'Docker',
  //'Framer Motion',
  'GitHub',
  '',
] as const
