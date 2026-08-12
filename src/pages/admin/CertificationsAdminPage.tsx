import { Award } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CrudAdminPage } from '@/components/admin/CrudAdminPage'
import { certificationsApi, type CertificationItem } from '@/services/admin'

export function CertificationsAdminPage() {
  usePageMeta('Certifications', 'Gestion des certifications')

  return (
    <CrudAdminPage<CertificationItem>
      config={{
        title: 'Certifications',
        description: 'Gérez les certifications et accréditations affichées sur le site.',
        icon: Award,
        queryKey: 'admin-certifications',
        api: certificationsApi,
        createLabel: 'Nouvelle certification',
        emptyMessage: 'Aucune certification enregistrée pour le moment.',
        identify: (item) => item.title,
        columns: [
          { key: 'issuer', label: 'Organisme' },
          { key: 'issuedAt', label: 'Obtenue le' },
          { key: 'isPublished', label: 'Publiée' },
        ],
        fields: [
          {
            key: 'title',
            label: 'Intitulé',
            type: 'text',
            required: true,
            placeholder: 'Ex : Développeur Full Stack JavaScript',
            spanFull: true,
          },
          {
            key: 'issuer',
            label: 'Organisme',
            type: 'text',
            required: true,
            placeholder: 'Ex : MO’OCK Academy',
            spanFull: true,
          },
          {
            key: 'issuedAt',
            label: "Date d'obtention",
            type: 'date',
            required: true,
            hint: 'Ex : 2025 ou 2025-06',
          },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Détails de la certification…',
            spanFull: true,
          },
          { key: 'credentialId', label: "Identifiant", type: 'text', placeholder: 'Ex : MOCK-2025-0123' },
          {
            key: 'url',
            label: 'Lien de vérification (URL)',
            type: 'url',
            placeholder: 'https://…',
            spanFull: true,
          },
          {
            key: 'tags',
            label: 'Compétences',
            type: 'list',
            placeholder: 'Un élément par ligne\nReact\nTypeScript',
            hint: 'Une compétence par ligne.',
            spanFull: true,
          },
          { key: 'order', label: 'Ordre', type: 'number', min: 0, step: 1, defaultValue: 0 },
          { key: 'isPublished', label: 'Publiée sur le site', type: 'checkbox', spanFull: true },
        ],
      }}
    />
  )
}
