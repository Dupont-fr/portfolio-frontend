import { useState } from 'react'
import { motion } from 'framer-motion'
import { FolderKanban, LayoutGrid } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { PageHero } from '@/components/PageHero'
import { PROJECT_CATEGORIES, PROJECTS, type ProjectCategory } from '@/constants/projects'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/utils/cn'

type CategoryFilter = ProjectCategory | 'all'

const FILTERS: { slug: CategoryFilter; label: string }[] = [
  { slug: 'all', label: 'Tous' },
  ...PROJECT_CATEGORIES.map((category) => ({ slug: category.slug, label: category.label })),
]

export function ProjectsPage() {
  usePageMeta('Projets', 'Une sélection de mes projets les plus aboutis, du dashboard analytique à l’e-commerce.')

  const [active, setActive] = useState<CategoryFilter>('all')

  const projects = active === 'all' ? PROJECTS : PROJECTS.filter((project) => project.category === active)

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        icon={<FolderKanban className="size-3.5" />}
        title={
          <>
            Projets
            <span className="text-gradient">.</span>
          </>
        }
        description="Une sélection de réalisations récentes, mêlant interface soignée et architecture solide."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.slug}
              type="button"
              onClick={() => setActive(filter.slug)}
              className={cn(
                'relative rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300',
                active === filter.slug
                  ? 'border-primary/40 bg-primary/15 text-accent'
                  : 'border-white/10 bg-white/[0.04] text-muted hover:border-white/20 hover:text-foreground',
              )}
            >
              {active === filter.slug && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-primary/10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{filter.label}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.length === 0 && (
          <p className="mt-16 flex items-center justify-center gap-2 text-sm text-muted">
            <LayoutGrid className="size-4 text-primary" />
            Aucun projet dans cette catégorie pour le moment.
          </p>
        )}
      </section>

      <CtaBanner />
    </>
  )
}
