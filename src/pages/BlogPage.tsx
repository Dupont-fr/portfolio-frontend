import { Newspaper } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Articles"
      title="Blog"
      icon={Newspaper}
      description="Mes articles techniques autour du développement web. Cette section arrive avec le Sprint 8."
    />
  )
}
