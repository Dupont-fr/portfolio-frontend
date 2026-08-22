import { Award } from 'lucide-react'
import { CertificationCard } from '@/components/certifications/CertificationCard'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { PageHero } from '@/components/PageHero'
import { useCertifications } from '@/hooks/usePublicContent'
import { usePageMeta } from '@/hooks/usePageMeta'

export function CertificationsPage() {
  usePageMeta(
    'Certifications',
    "Mes certifications et accréditations professionnelles et techniques, validées par des organismes reconnus.",
    { path: '/certifications' },
  )

  const certifications = useCertifications()

  return (
    <>
      <PageHero
        eyebrow="Accréditations"
        icon={<Award className="size-3.5" />}
        title={
          <>
            Certifications
            <span className="text-gradient">.</span>
          </>
        }
        description="Des compétences validées par des organismes de formation et reconnues dans l'écosystème du développement web."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={`${certification.title}-${certification.issuer}`}
              certification={certification}
              index={index}
            />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
