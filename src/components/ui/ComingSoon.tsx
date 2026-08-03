import { motion } from 'framer-motion'
import { Construction, type LucideIcon } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Badge } from '@/components/ui/Badge'

interface ComingSoonProps {
  title: string
  description: string
  eyebrow?: string
  icon?: LucideIcon
}

export function ComingSoon({ title, description, eyebrow, icon: Icon = Construction }: ComingSoonProps) {
  usePageMeta(title, description)

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 grid size-20 place-items-center rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/15 to-secondary/10 shadow-lg shadow-primary/10"
        >
          <Icon className="size-9 text-primary" strokeWidth={1.5} />
        </motion.div>

        <Badge className="mb-6">{eyebrow ?? 'En cours de construction'}</Badge>
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
        <div className="mx-auto mt-10 h-px w-40 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </motion.div>
    </section>
  )
}
