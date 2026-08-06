import { Rocket } from 'lucide-react'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PageHero } from '@/components/PageHero'
import { ServiceCard } from '@/components/ServiceCard'
import { PROCESS, SERVICES } from '@/constants/services'
import { usePageMeta } from '@/hooks/usePageMeta'

export function ServicesPage() {
  usePageMeta('Services', 'Développement frontend et backend, applications full stack, e-commerce, refonte et maintenance.')

  return (
    <>
      <PageHero
        eyebrow="Ce que je propose"
        icon={<Rocket className="size-3.5" />}
        title={
          <>
            Services
            <span className="text-gradient">.</span>
          </>
        }
        description="Des services complets et sur mesure pour transformer votre idée en produit web performant, sécurisé et élégant."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 0.08}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <SectionHeading
          eyebrow="Méthodologie"
          title="Un processus simple et efficace"
          description="Quatre étapes claires pour aller de l’idée au produit livré, en toute transparence."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, index) => (
            <Reveal key={step.step} delay={index * 0.1}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-7 shadow-2xl shadow-black/20 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30">
                <span className="relative grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-sora text-sm font-bold text-background">
                  {step.step}
                </span>
                <h3 className="relative mt-5 font-sora text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-2 select-none font-sora text-7xl font-bold text-white/[0.04]"
                >
                  {step.step}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
