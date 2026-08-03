import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_12px_#00C2FF]" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base leading-relaxed text-muted', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
