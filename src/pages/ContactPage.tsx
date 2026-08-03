import { Send } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export function ContactPage() {
  return (
    <ComingSoon
      eyebrow="Parlons de votre projet"
      title="Contact"
      icon={Send}
      description="Un formulaire élégant, la validation Zod et l'envoi des messages arrivent avec le Sprint 5."
    />
  )
}
