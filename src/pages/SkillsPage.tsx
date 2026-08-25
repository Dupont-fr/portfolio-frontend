import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Braces } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/PageHero'
import { SkillBar } from '@/components/SkillBar'
import { useSkills } from '@/hooks/usePublicContent'
import { usePageMeta } from '@/hooks/usePageMeta'

function SkillCategory({ category, delay }: { category: ReturnType<typeof useSkills>[number]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useInView(ref, { once: true, margin: '-40px' })

  return (
    <Reveal delay={delay}>
      <div ref={ref}>
        <Card className="h-full p-7 sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary">
              <category.icon className="size-6" strokeWidth={1.75} />
            </span>
            <h2 className="font-sora text-xl font-semibold text-foreground">{category.title}</h2>
          </div>
          <div className="mt-7 space-y-5">
            {category.skills.map((skill, skillIndex) => (
              <SkillBar key={skill.name} skill={skill} index={skillIndex} isVisible={isVisible} />
            ))}
          </div>
        </Card>
      </div>
    </Reveal>
  )
}

export function SkillsPage() {
  usePageMeta('Compétences', 'Les technologies et outils que je maîtrise pour développer des applications web premium.', { path: '/competences' })

  const categories = useSkills()

  return (
    <>
      <PageHero
        eyebrow="Stack technique"
        icon={<Braces className="size-3.5" />}
        title={
          <>
            Compétences
            <span className="text-gradient">.</span>
          </>
        }
        description="Un savoir-faire complet, du design d'interface à l'infrastructure, pour livrer des applications solides de bout en bout."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {categories.map((category, index) => (
            <SkillCategory key={category.title} category={category} delay={index * 0.1} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
