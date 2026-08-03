import { UserRound } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function AboutPage() {
  return (
    <ComingSoon
      eyebrow="Qui suis-je"
      title="À propos"
      icon={UserRound}
      description="Mon parcours, mes valeurs et ma vision du développement web. Cette section arrive avec le Sprint 2."
    />
  )
}
