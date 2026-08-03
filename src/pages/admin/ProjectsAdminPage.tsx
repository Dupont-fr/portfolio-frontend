import { FolderKanban } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function ProjectsAdminPage() {
  return (
    <ComingSoon
      eyebrow="Administration"
      title="Gestion des projets"
      icon={FolderKanban}
      description="CRUD complet des projets. Disponible avec le Sprint 7."
    />
  )
}
