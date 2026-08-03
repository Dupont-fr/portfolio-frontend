import { MessageSquare } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function MessagesAdminPage() {
  return (
    <ComingSoon
      eyebrow="Administration"
      title="Gestion des messages"
      icon={MessageSquare}
      description="Boîte de réception des messages envoyés via le formulaire de contact. Disponible avec le Sprint 5."
    />
  )
}
