import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ExternalLink, FolderKanban, TrendingUp } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Reveal } from '@/components/ui/Reveal'
import { PROJECT_CATEGORIES, PROJECTS } from '@/constants/projects'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PATHS } from '@/routes/paths'
import { cn } from '@/utils/cn'

const EASE = [0.22, 1, 0.36, 1] as const

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = PROJECTS.find((item) => item.slug === slug)

  usePageMeta(project?.title ?? 'Projet introuvable', project?.description)

  if (!project) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 pt-32 text-center sm:px-8">
        <FolderKanban className="size-10 text-primary/50" />
        <h1 className="mt-6 font-sora text-3xl font-bold text-foreground sm:text-4xl">
          Projet introuvable
        </h1>
        <p className="mt-3 max-w-md text-muted">Ce projet n’existe pas ou n’est plus disponible.</p>
        <Button asChild variant="primary" className="mt-8">
          <Link to={PATHS.projects}>
            <ArrowLeft className="size-4" />
            Retour aux projets
          </Link>
        </Button>
      </section>
    )
  }

  const categoryLabel = PROJECT_CATEGORIES.find((category) => category.slug === project.category)?.label

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pb-12 pt-32 sm:px-8">
        <Reveal y={12}>
          <Link
            to={PATHS.projects}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" />
            Tous les projets
          </Link>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className={cn(
            'relative mt-8 grid h-72 place-items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br',
            project.gradient,
          )}
        >
          <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-secondary/20 blur-[100px]" />
          <div className="relative grid size-20 place-items-center rounded-3xl border border-white/15 bg-background/50 shadow-xl shadow-black/30 backdrop-blur-md">
            <project.icon className="size-9 text-primary" strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
          className="mt-10 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categoryLabel && <Badge>{categoryLabel}</Badge>}
            <Badge className="border-white/10 bg-white/[0.04] text-muted">{project.year}</Badge>
          </div>
          <h1 className="mt-5 font-sora text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {project.longDescription}
          </p>
          <p className="mt-6 text-sm font-medium text-primary">{project.role}</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {project.liveUrl && (
            <Button asChild variant="primary" size="lg">
              <a href={project.liveUrl} target="_blank" rel="noreferrer noopener">
                <ExternalLink className="size-4" />
                Voir le projet
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="lg">
              <a href={project.githubUrl} target="_blank" rel="noreferrer noopener">
                <FaGithub className="size-4" />
                Code source
              </a>
            </Button>
          )}
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-wrap justify-center gap-2">
            {project.stack.map((tag) => (
              <Badge key={tag} className="px-3.5 py-1.5 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary">
                  <CheckCircle2 className="size-5" />
                </span>
                <h2 className="font-sora text-lg font-semibold text-foreground">
                  Fonctionnalités clés
                </h2>
              </div>
              <ul className="mt-6 space-y-3.5">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_#00C2FF]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass h-full rounded-3xl p-8 shadow-2xl shadow-black/20">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary">
                  <TrendingUp className="size-5" />
                </span>
                <h2 className="font-sora text-lg font-semibold text-foreground">Résultats</h2>
              </div>
              <ul className="mt-6 space-y-3.5">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-muted">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
