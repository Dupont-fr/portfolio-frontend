import { Briefcase } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CrudAdminPage } from '@/components/admin/CrudAdminPage'
import { experiencesApi, type ExperienceItem } from '@/services/admin'

export function ExperiencesAdminPage() {
  usePageMeta('Expériences', 'Gestion des expériences professionnelles')

  return (
    <CrudAdminPage<ExperienceItem>
      config={{
        title: 'Expériences',
        description: 'Gérez vos expériences professionnelles.',
        icon: Briefcase,
        queryKey: 'admin-experiences',
        api: experiencesApi,
        createLabel: 'Nouvelle expérience',
        emptyMessage: 'Aucune expérience enregistrée pour le moment.',
        identify: (item) => item.role,
        columns: [
          { key: 'company', label: 'Entreprise' },
          { key: 'startDate', label: 'Début' },
          { key: 'isCurrent', label: 'En cours' },
        ],
        fields: [
          { key: 'company', label: 'Entreprise', type: 'text', required: true, placeholder: 'Ex : MO’OC Academy', spanFull: true },
          { key: 'role', label: 'Poste', type: 'text', required: true, placeholder: 'Ex : Développeur Full Stack', spanFull: true },
          { key: 'location', label: 'Lieu', type: 'text', placeholder: 'Ex : Ouest Cameroun', spanFull: true },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Missions et réalisations…', spanFull: true },
          { key: 'startDate', label: 'Date de début', type: 'date', required: true },
          { key: 'endDate', label: 'Date de fin', type: 'date' },
          { key: 'order', label: 'Ordre', type: 'number', min: 0, step: 1, defaultValue: 0 },
          { key: 'isCurrent', label: 'Poste actuel', type: 'checkbox', spanFull: true },
        ],
      }}
    />
  )
}
