import { useParams } from 'react-router-dom'
import { Newspaper } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <ComingSoon
      eyebrow="Article"
      title={slug ?? 'Article'}
      icon={Newspaper}
      description="Le contenu de cet article sera disponible avec le Sprint 8."
    />
  )
}
