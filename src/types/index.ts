import type { ComponentType } from 'react'

export interface NavItem {
  label: string
  to: string
}

export interface SocialLink {
  label: string
  url: string
  color: string
  icon: ComponentType<{ className?: string }>
}
