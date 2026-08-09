import { FolderKanban } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CrudAdminPage } from '@/components/admin/CrudAdminPage'
import { projectsApi, type ProjectItem } from '@/services/admin'

export function ProjectsAdminPage() {
  usePageMeta('Projets', 'Gestion des projets')

  return (
    <CrudAdminPage<ProjectItem>
      config={{
        title: 'Projets',
        description: 'Gérez les projets présentés sur le portfolio.',
        icon: FolderKanban,
        queryKey: 'admin-projects',
        api: projectsApi,
        createLabel: 'Nouveau projet',
        emptyMessage: 'Aucun projet enregistré pour le moment.',
        identify: (item) => item.title,
        columns: [
          { key: 'category', label: 'Catégorie' },
          { key: 'featured', label: 'À la une' },
          { key: 'isPublished', label: 'Publié' },
        ],
        fields: [
          { key: 'title', label: 'Titre', type: 'text', required: true, placeholder: 'Ex : Nexus Dashboard', spanFull: true },
          {
            key: 'slug',
            label: 'Slug',
            type: 'text',
            placeholder: 'nexus-dashboard',
            hint: 'Laisser vide pour générer automatiquement depuis le titre.',
            spanFull: true,
          },
          { key: 'category', label: 'Catégorie', type: 'text', placeholder: 'Ex : fullstack, frontend, ecommerce' },
          { key: 'order', label: 'Ordre', type: 'number', min: 0, step: 1, defaultValue: 0 },
          { key: 'description', label: 'Description courte', type: 'textarea', required: true, placeholder: 'Une phrase qui résume le projet…', spanFull: true },
          { key: 'content', label: 'Contenu détaillé', type: 'textarea', placeholder: 'Description longue du projet…', spanFull: true },
          { key: 'coverImage', label: 'Image de couverture (URL)', type: 'url', placeholder: 'https://…', spanFull: true },
          { key: 'githubUrl', label: 'Lien GitHub (URL)', type: 'url', placeholder: 'https://github.com/…' },
          { key: 'liveUrl', label: 'Lien du site (URL)', type: 'url', placeholder: 'https://…' },
          { key: 'featured', label: 'Projet à la une', type: 'checkbox', spanFull: true },
          { key: 'isPublished', label: 'Publié sur le site', type: 'checkbox', spanFull: true },
        ],
      }}
    />
  )
}
