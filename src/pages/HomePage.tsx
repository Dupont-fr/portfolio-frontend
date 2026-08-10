import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Sparkles, Code2, Server, Layers, TerminalSquare } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Marquee } from '@/components/ui/Marquee'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PortraitCard } from '@/components/PortraitCard'
import { BIO_PARAGRAPHS, STATS } from '@/constants/about'
import { MARQUEE_TECH } from '@/constants/home'
import { useFeaturedProjects } from '@/hooks/usePublicContent'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PATHS } from '@/routes/paths'
import { SITE } from '@/constants/site'

const EASE = [0.22, 1, 0.36, 1] as const

const TECH = [
  { label: 'React', icon: Code2 },
  { label: 'Node.js', icon: Server },
  { label: 'TypeScript', icon: Layers },
  { label: 'Clean Code', icon: TerminalSquare },
]

export function HomePage() {
  usePageMeta(SITE.name, SITE.tagline)
  const featuredProjects = useFeaturedProjects()

  return (
    <>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-16 pt-32 sm:px-8">
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
            className="font-sora text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
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
              <Link to={PATHS.about}>En savoir plus</Link>
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
        </div>

        <Sparkles className="pointer-events-none absolute right-[12%] top-[18%] hidden size-6 animate-pulse text-primary/40 lg:block" />
        <Sparkles className="pointer-events-none absolute left-[14%] bottom-[24%] hidden size-4 animate-pulse text-accent/30 lg:block" />
      </section>

      <Marquee items={MARQUEE_TECH} className="border-y border-white/5 bg-background/40" />

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <PortraitCard />

          <div>
            <Reveal>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_#00C2FF]" />
                Qui suis-je
              </span>
              <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Passionné par le code et <span className="text-gradient">l’expérience utilisateur</span>
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4">
              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <Reveal key={paragraph} delay={0.1 + index * 0.1}>
                  <p className="text-base leading-relaxed text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {TECH.map((tech) => (
                  <span
                    key={tech.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-muted transition-colors duration-300 hover:border-primary/40 hover:text-accent"
                  >
                    <tech.icon className="size-3.5 text-primary" />
                    {tech.label}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <Button asChild variant="outline">
                  <Link to={PATHS.about}>
                    Découvrir mon parcours
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projets sélectionnés"
          description="Une sélection de réalisations récentes, mêlant interface soignée et architecture solide."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <Reveal className="mt-12 text-center" delay={0.2}>
          <Button asChild variant="ghost" size="lg">
            <Link to={PATHS.projects} className="text-accent">
              Voir tous les projets
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </Reveal>
      </section>

      <CtaBanner />
    </>
  )
}
