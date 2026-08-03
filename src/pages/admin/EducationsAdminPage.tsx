import { GraduationCap } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function EducationsAdminPage() {
  return (
    <ComingSoon
      eyebrow="Administration"
      title="Gestion des formations"
      icon={GraduationCap}
      description="CRUD complet des formations. Disponible avec le Sprint 7."
    />
  )
}
