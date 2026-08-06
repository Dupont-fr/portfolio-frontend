import { History } from 'lucide-react'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PageHero } from '@/components/PageHero'
import { Timeline } from '@/components/Timeline'
import { EDUCATIONS, EXPERIENCES } from '@/constants/journey'
import { usePageMeta } from '@/hooks/usePageMeta'

export function JourneyPage() {
  usePageMeta('Parcours', 'Mon expérience professionnelle et mes formations, racontées en timeline.')

  return (
    <>
      <PageHero
        eyebrow="Expériences & formations"
        icon={<History className="size-3.5" />}
        title={
          <>
            Mon parcours
            <span className="text-gradient">.</span>
          </>
        }
        description="Quelques années de pratique, d’apprentissage continu et de projets livrés — au service de votre réussite."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Expériences"
              title="Mon parcours professionnel"
              description="Les étapes qui ont forgé ma façon de développer."
            />
            <div className="mt-12">
              <Timeline items={EXPERIENCES} />
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Formations"
              title="Ma formation"
              description="Un apprentissage continu, académique et pratique."
            />
            <div className="mt-12">
              <Timeline items={EDUCATIONS} />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
