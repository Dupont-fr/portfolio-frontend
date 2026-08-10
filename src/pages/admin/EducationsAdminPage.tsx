import { GraduationCap } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CrudAdminPage } from '@/components/admin/CrudAdminPage'
import { educationsApi, type EducationItem } from '@/services/admin'

export function EducationsAdminPage() {
  usePageMeta('Formations', 'Gestion des formations')

  return (
    <CrudAdminPage<EducationItem>
      config={{
        title: 'Formations',
        description: 'Gérez votre parcours académique.',
        icon: GraduationCap,
        queryKey: 'admin-educations',
        api: educationsApi,
        createLabel: 'Nouvelle formation',
        emptyMessage: 'Aucune formation enregistrée pour le moment.',
        identify: (item) => item.degree,
        columns: [
          { key: 'school', label: 'École' },
          { key: 'startDate', label: 'Début' },
          { key: 'isCurrent', label: 'En cours' },
        ],
        fields: [
          { key: 'school', label: 'École / Université', type: 'text', required: true, placeholder: 'Ex : Université de Dschang', spanFull: true },
          { key: 'degree', label: 'Diplôme', type: 'text', required: true, placeholder: 'Ex : Licence en Informatique', spanFull: true },
          { key: 'field', label: 'Domaine', type: 'text', placeholder: 'Ex : Informatique Fondamentale', spanFull: true },
          { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Détails de la formation…', spanFull: true },
          {
            key: 'tags',
            label: 'Compétences acquises',
            type: 'list',
            placeholder: 'Un élément par ligne\nAlgorithmique\nGénie logiciel',
            hint: 'Une compétence par ligne.',
            spanFull: true,
          },
          { key: 'startDate', label: 'Date de début', type: 'date', required: true },
          { key: 'endDate', label: 'Date de fin', type: 'date' },
          { key: 'order', label: 'Ordre', type: 'number', min: 0, step: 1, defaultValue: 0 },
          { key: 'isCurrent', label: 'Formation en cours', type: 'checkbox', spanFull: true },
        ],
      }}
    />
  )
}
