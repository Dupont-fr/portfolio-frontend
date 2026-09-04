import { Newspaper } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { CrudAdminPage } from '@/components/admin/CrudAdminPage'
import { blogsApi, type BlogItem } from '@/services/admin'

export function BlogAdminPage() {
  usePageMeta('Actualités', 'Gestion des actualités')

  return (
    <CrudAdminPage<BlogItem>
      config={{
        title: 'Actualités',
        description: 'Rédigez et publiez les articles présentés sur le portfolio.',
        icon: Newspaper,
        queryKey: 'admin-blog',
        api: blogsApi,
        createLabel: 'Nouvel article',
        emptyMessage: 'Aucun article enregistré pour le moment.',
        ai: { mode: 'article' },
        identify: (item) => item.title,
        columns: [
          { key: 'publishedAt', label: 'Publié le' },
          { key: 'isPublished', label: 'Publié' },
        ],
        fields: [
          {
            key: 'title',
            label: 'Titre',
            type: 'text',
            required: true,
            placeholder: 'Ex : Mon premier article',
            spanFull: true,
          },
          {
            key: 'slug',
            label: 'Slug',
            type: 'text',
            placeholder: 'mon-premier-article',
            hint: 'Laisser vide pour générer automatiquement depuis le titre.',
            spanFull: true,
          },
          {
            key: 'excerpt',
            label: 'Extrait',
            type: 'textarea',
            required: true,
            placeholder: 'Un résumé percutant affiché sur la liste des articles…',
            spanFull: true,
          },
          {
            key: 'content',
            label: 'Contenu',
            type: 'textarea',
            required: true,
            placeholder: '## Un titre de section\n\nVotre paragraphe…\n\n- Un élément de liste\n- Un autre élément',
            hint: 'Format : ## titre, - liste, **gras**, `code`, [lien](url), ![legende](url-image), [video](url-video).',
            spanFull: true,
            mediaInsert: true,
          },
          {
            key: 'coverImage',
            label: 'Image de couverture',
            type: 'image',
            hint: 'PNG, JPG ou WebP — stockée sur Cloudinary.',
            spanFull: true,
          },
          {
            key: 'tags',
            label: 'Tags',
            type: 'list',
            placeholder: 'Un tag par ligne\nReact\nTypeScript\nNode.js',
            hint: 'Un tag par ligne.',
            spanFull: true,
          },
          { key: 'order', label: 'Ordre', type: 'number', min: 0, step: 1, defaultValue: 0 },
          {
            key: 'publishedAt',
            label: 'Date de publication',
            type: 'date',
            hint: 'Définie automatiquement à la première publication.',
          },
          {
            key: 'scheduledAt',
            label: 'Programmer la publication',
            type: 'datetime',
            hint: 'Choisissez une date future : l’article sera publié automatiquement à ce moment-là.',
          },
          { key: 'isPublished', label: 'Publié sur le site', type: 'checkbox', spanFull: true },
        ],
      }}
    />
  )
}
