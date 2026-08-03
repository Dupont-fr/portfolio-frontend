import { useParams } from 'react-router-dom'
import { FolderKanban } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <ComingSoon
      eyebrow="Détail du projet"
      title={`Projet · ${slug ?? 'Sans titre'}`}
      icon={FolderKanban}
      description="Le détail complet de ce projet sera disponible avec le Sprint 4."
    />
  )
}
