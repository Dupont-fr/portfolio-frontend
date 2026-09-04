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
        ai: { mode: 'project' },
        identify: (item) => item.title,
        columns: [
          { key: 'category', label: 'Catégorie' },
          { key: 'year', label: 'Année' },
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
          { key: 'category', label: 'Catégorie', type: 'text', placeholder: 'fullstack, frontend, backend, ecommerce' },
          { key: 'year', label: 'Année', type: 'text', placeholder: 'Ex : 2024' },
          { key: 'role', label: 'Poste / Rôle', type: 'text', placeholder: 'Ex : Lead Développeur Full Stack', spanFull: true },
          { key: 'order', label: 'Ordre', type: 'number', min: 0, step: 1, defaultValue: 0 },
          { key: 'description', label: 'Description courte', type: 'textarea', required: true, placeholder: 'Une phrase qui résume le projet…', spanFull: true },
          { key: 'longDescription', label: 'Description longue', type: 'textarea', placeholder: 'Le détail du projet affiché sur la fiche…', spanFull: true },
          {
            key: 'stack',
            label: 'Stack technique',
            type: 'list',
            placeholder: 'Un élément par ligne\nReact\nNode.js\nMongoDB',
            hint: 'Une technologie par ligne.',
            spanFull: true,
          },
          {
            key: 'features',
            label: 'Fonctionnalités clés',
            type: 'list',
            placeholder: 'Un élément par ligne\nVisualisations temps réel\nRôles et permissions',
            hint: 'Une fonctionnalité par ligne.',
            spanFull: true,
          },
          {
            key: 'outcomes',
            label: 'Résultats',
            type: 'list',
            placeholder: 'Un élément par ligne\nAdoption par 150 utilisateurs\nScore Lighthouse > 95',
            hint: 'Un résultat par ligne.',
            spanFull: true,
          },
          { key: 'coverImage', label: 'Image de couverture', type: 'image', hint: 'PNG, JPG ou WebP — stockée sur Cloudinary.', spanFull: true },
          { key: 'githubUrl', label: 'Lien GitHub (URL)', type: 'url', placeholder: 'https://github.com/…' },
          { key: 'liveUrl', label: 'Lien du site (URL)', type: 'url', placeholder: 'https://…' },
          { key: 'featured', label: 'Projet à la une', type: 'checkbox', spanFull: true },
          { key: 'isPublished', label: 'Publié sur le site', type: 'checkbox', spanFull: true },
        ],
      }}
    />
  )
}
