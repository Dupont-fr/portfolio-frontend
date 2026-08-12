import { motion } from 'framer-motion'
import { Award, ExternalLink, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { Certification } from '@/constants/certifications'

interface CertificationCardProps {
  certification: Certification
  index?: number
}

function formatIssuedAt(value: string): string {
  const [year, month] = value.split('-')
  if (!month) return year
  const label = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(
    new Date(Date.UTC(Number(year), Number(month) - 1, 1)),
  )
  return `${label} ${year}`
}

export function CertificationCard({ certification, index = 0 }: CertificationCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full"
    >
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
        <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between gap-4 p-6 pb-0">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary shadow-lg shadow-primary/10">
            <Award className="size-6" strokeWidth={1.5} />
          </span>
          <Badge>{formatIssuedAt(certification.issuedAt)}</Badge>
        </div>

        <div className="relative flex flex-1 flex-col p-6">
          <h3 className="font-sora text-lg font-semibold tracking-tight text-foreground">
            {certification.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-primary">{certification.issuer}</p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {certification.description}
          </p>

          {certification.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {certification.tags.map((tag) => (
                <li key={tag}>
                  <Badge className="px-2.5 py-1 text-[11px]">{tag}</Badge>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
            {certification.credentialId ? (
              <span className="truncate font-mono text-xs text-muted/70">
                {certification.credentialId}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted/70">
                <ShieldCheck className="size-3.5 text-success" />
                Certification vérifiable
              </span>
            )}
            {certification.url && (
              <a
                href={certification.url}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-secondary"
              >
                Vérifier
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
