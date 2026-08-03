import { Settings } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function SettingsAdminPage() {
  return (
    <ComingSoon
      eyebrow="Administration"
      title="Paramètres"
      icon={Settings}
      description="Configuration générale du portfolio. Disponible avec un prochain sprint."
    />
  )
}
