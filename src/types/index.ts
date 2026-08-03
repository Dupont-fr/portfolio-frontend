import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  to: string
}

export interface SocialLink {
  label: string
  url: string
  icon: LucideIcon
}
