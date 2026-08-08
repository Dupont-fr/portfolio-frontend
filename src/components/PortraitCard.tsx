import { motion } from 'framer-motion'
import { BadgeCheck, MapPin } from 'lucide-react'
import { SITE } from '@/constants/site'

interface PortraitCardProps {
  className?: string
}

export function PortraitCard({ className }: PortraitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/30 to-secondary/20 opacity-60 blur-2xl" />

        <div className="relative flex h-full flex-col items-center justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

          <span className="relative rounded-full border border-white/15 bg-background/50 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur-md">
            {SITE.role}
          </span>

          <div className="relative size-44 overflow-hidden rounded-full border border-white/15 bg-background/50 shadow-2xl shadow-primary/30 ring-2 ring-primary/40">
            <img
              src="/portrait.jpg"
              alt={`Portrait de ${SITE.brand}`}
              className="size-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>

          <div className="relative text-center">
            <p className="font-sora text-lg font-semibold text-foreground">{SITE.brand}</p>
            <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-3.5 text-primary" />
              {SITE.location}
            </p>
          </div>

          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success backdrop-blur-md">
            <BadgeCheck className="size-3.5" />
            Disponible
          </span>
        </div>
      </div>
    </motion.div>
  )
}
