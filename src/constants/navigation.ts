import { PATHS } from '@/routes/paths'
import type { NavItem } from '@/types'

export const NAV_LINKS: NavItem[] = [
  { label: 'Accueil', to: PATHS.home },
  { label: 'À propos', to: PATHS.about },
  { label: 'Compétences', to: PATHS.skills },
  { label: 'Projets', to: PATHS.projects },
  { label: 'Services', to: PATHS.services },
  { label: 'Parcours', to: PATHS.journey },
  { label: 'Blog', to: PATHS.blog },
]

export const FOOTER_LINKS: NavItem[] = [
  { label: 'Accueil', to: PATHS.home },
  { label: 'À propos', to: PATHS.about },
  { label: 'Compétences', to: PATHS.skills },
  { label: 'Projets', to: PATHS.projects },
  { label: 'Services', to: PATHS.services },
  { label: 'Parcours', to: PATHS.journey },
  { label: 'Certifications', to: PATHS.certifications },
  { label: 'Blog', to: PATHS.blog },
  { label: 'Contact', to: PATHS.contact },
]
