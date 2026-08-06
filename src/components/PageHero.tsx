import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'

const EASE = [0.22, 1, 0.36, 1] as const

interface PageHeroProps {
  eyebrow: string
  icon: ReactNode
  title: ReactNode
  description: string
}

export function PageHero({ eyebrow, icon, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-36 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Badge className="mb-6">
            {icon}
            {eyebrow}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
          className="font-sora text-4xl font-bold tracking-tight sm:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.8, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
