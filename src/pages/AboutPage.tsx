import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BadgeCheck, Quote } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PortraitCard } from '@/components/PortraitCard'
import { BIO_PARAGRAPHS, STATS, VALUES } from '@/constants/about'
import { CONTACT_INFOS, SITE } from '@/constants/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PATHS } from '@/routes/paths'

const EASE = [0.22, 1, 0.36, 1] as const

export function AboutPage() {
  usePageMeta('À propos', "Mon parcours, mes valeurs et ma vision du développement web.", { path: '/a-propos' })

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Badge className="mb-6">
              <BadgeCheck className="size-3.5" />
              Qui suis-je
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
            className="font-sora text-4xl font-bold tracking-tight sm:text-6xl"
          >
            {SITE.brand}
            <span className="text-gradient">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.8, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Développeur Full Stack JavaScript basé dans l’Ouest Cameroun. {SITE.tagline}
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <div className="space-y-4">
              {BIO_PARAGRAPHS.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.1}>
                  <p className="text-base leading-relaxed text-muted">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.25}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {CONTACT_INFOS.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="glass group flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary transition-colors duration-300 group-hover:text-accent">
                      <info.icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">
                        {info.label}
                      </span>
                      <span className="block text-sm font-medium text-foreground">{info.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild variant="primary" size="lg">
                  <Link to={PATHS.contact}>
                    Me contacter
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={PATHS.projects}>
                    Voir mes projets
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2">
            <PortraitCard />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1}>
              <Card hover className="px-6 py-6 text-center">
                <p className="font-sora text-3xl font-bold text-gradient">{stat.value}</p>
                <p className="mt-1 text-sm text-muted">{stat.label}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <SectionHeading
          eyebrow="Valeurs"
          title="Ce qui guide mon travail"
          description="Des principes simples qui structurent chacune de mes décisions techniques."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.1}>
              <Card hover className="group h-full p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <value.icon className="size-6" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-sora text-base font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl p-10 sm:p-14">
            <Quote className="absolute right-8 top-8 size-16 text-primary/10" />
            <blockquote className="relative">
              <p className="font-sora text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                « Le meilleur code est celui que l’on écrit avec soin, pour que d’autres
                puissent le maintenir aussi bien qu’on l’a conçu. »
              </p>
              <footer className="mt-6 flex items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary font-sora text-sm font-bold text-background">
                  DD
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{SITE.brand}</p>
                  <p className="text-xs text-muted">{SITE.role}</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </section>

      <CtaBanner />
    </>
  )
}
