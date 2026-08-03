import { Award } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function CertificationsPage() {
  return (
    <ComingSoon
      eyebrow="Accréditations"
      title="Certifications"
      icon={Award}
      description="Mes certifications professionnelles et techniques. Cette section arrive avec un prochain sprint."
    />
  )
}
