import { LayoutDashboard } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function DashboardPage() {
  return (
    <ComingSoon
      eyebrow="Administration"
      title="Dashboard"
      icon={LayoutDashboard}
      description="Statistiques, visiteurs et aperçu du contenu. Disponible avec le Sprint 8."
    />
  )
}
