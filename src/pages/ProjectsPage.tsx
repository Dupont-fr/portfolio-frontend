import { FolderKanban } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function ProjectsPage() {
  return (
    <ComingSoon
      eyebrow="Portfolio"
      title="Projets"
      icon={FolderKanban}
      description="Une sélection de mes projets les plus aboutis. Cette section arrive avec le Sprint 4."
    />
  )
}
