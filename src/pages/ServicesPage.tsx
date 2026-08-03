import { Rocket } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function ServicesPage() {
  return (
    <ComingSoon
      eyebrow="Ce que je propose"
      title="Services"
      icon={Rocket}
      description="Développement d'applications, refonte d'interface, API et conseil. Cette section arrive avec le Sprint 3."
    />
  )
}
