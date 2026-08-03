import { Briefcase } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function ExperiencesAdminPage() {
  return (
    <ComingSoon
      eyebrow="Administration"
      title="Gestion des expériences"
      icon={Briefcase}
      description="CRUD complet des expériences professionnelles. Disponible avec le Sprint 7."
    />
  )
}
