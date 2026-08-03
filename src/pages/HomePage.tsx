import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Code2, Server, Layers, TerminalSquare } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PATHS } from '@/routes/paths'
import { SITE } from '@/constants/site'

const EASE = [0.22, 1, 0.36, 1] as const

const STATS = [
  { value: '5+', label: 'Années d’expérience' },
  { value: '30+', label: 'Projets livrés' },
  { value: '20+', label: 'Clients satisfaits' },
]

const TECH = [
  { label: 'React', icon: Code2 },
  { label: 'Node.js', icon: Server },
  { label: 'TypeScript', icon: Layers },
  { label: 'Clean Code', icon: TerminalSquare },
]

export function HomePage() {
  usePageMeta(SITE.name, SITE.tagline)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 pb-16 sm:px-8">
      <div className="mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Badge tone="success" className="mb-8">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {SITE.availability}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
          className="font-sora text-4xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
        >
          Développeur
          <br />
          <span className="text-gradient">Full Stack</span> JavaScript
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.8, ease: EASE }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {SITE.tagline} Spécialisé dans les interfaces premium et les architectures
          robustes et évolutives.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button asChild variant="primary" size="lg">
            <Link to={PATHS.projects}>
              Voir mes projets
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={PATHS.contact}>Me contacter</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl px-6 py-5 transition-colors duration-300 hover:border-primary/30"
            >
              <p className="font-sora text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {TECH.map((tech) => (
            <span
              key={tech.label}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted transition-colors duration-300 hover:border-primary/40 hover:text-accent"
            >
              <tech.icon className="size-3.5 text-primary" />
              {tech.label}
            </span>
          ))}
        </motion.div>
      </div>

      <Sparkles className="pointer-events-none absolute right-[12%] top-[18%] hidden size-6 animate-pulse text-primary/40 lg:block" />
    </section>
  )
}
