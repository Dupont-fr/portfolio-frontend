import { BarChart3 } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function SkillsAdminPage() {
  return (
    <ComingSoon
      eyebrow="Administration"
      title="Gestion des compétences"
      icon={BarChart3}
      description="CRUD complet des compétences. Disponible avec le Sprint 7."
    />
  )
}
