import { History } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function JourneyPage() {
  return (
    <ComingSoon
      eyebrow="Expériences & formations"
      title="Parcours"
      icon={History}
      description="Ma carrière sous forme de timeline interactive. Cette section arrive avec le Sprint 3."
    />
  )
}
