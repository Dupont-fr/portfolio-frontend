import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { FeaturedProject } from '@/constants/home'
import { PATHS } from '@/routes/paths'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

interface ProjectCardProps {
  project: FeaturedProject
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to={PATHS.projectDetail(project.slug)}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
          <div
            className={cn(
              'relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br',
              project.gradient,
            )}
          >
            <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            <div className="relative grid size-16 place-items-center rounded-2xl border border-white/15 bg-background/50 backdrop-blur-md shadow-xl shadow-black/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <project.icon className="size-8 text-primary" strokeWidth={1.5} />
            </div>
            <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 bg-background/50 text-muted opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight className="size-4 text-accent" />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-sora text-lg font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag}>
                  <Badge className="px-2.5 py-1 text-[11px]">{tag}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Link>
      <Sparkles className="pointer-events-none absolute -right-2 -top-2 size-5 text-primary/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  )
}
