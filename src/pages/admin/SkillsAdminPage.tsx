import { BarChart3 } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CrudAdminPage } from '@/components/admin/CrudAdminPage'
import { skillsApi, type SkillItem } from '@/services/admin'

export function SkillsAdminPage() {
  usePageMeta('Compétences', 'Gestion des compétences')

  return (
    <CrudAdminPage<SkillItem>
      config={{
        title: 'Compétences',
        description: 'Gérez les compétences affichées sur le portfolio.',
        icon: BarChart3,
        queryKey: 'admin-skills',
        api: skillsApi,
        createLabel: 'Nouvelle compétence',
        emptyMessage: 'Aucune compétence enregistrée pour le moment.',
        identify: (item) => item.name,
        columns: [
          { key: 'level', label: 'Niveau' },
          { key: 'order', label: 'Ordre' },
          { key: 'isPublished', label: 'Affichée' },
        ],
        fields: [
          { key: 'name', label: 'Nom', type: 'text', required: true, placeholder: 'Ex : React', spanFull: true },
          {
            key: 'icon',
            label: 'Icône',
            type: 'text',
            placeholder: 'Ex : Zap',
            hint: 'Nom d’une icône lucide (optionnel).',
            spanFull: true,
          },
          { key: 'level', label: 'Niveau (%)', type: 'number', min: 0, max: 100, step: 1, defaultValue: 0 },
          { key: 'order', label: 'Ordre', type: 'number', min: 0, step: 1, defaultValue: 0 },
          { key: 'isPublished', label: 'Visible sur le site', type: 'checkbox', defaultValue: true, spanFull: true },
        ],
      }}
    />
  )
}
