import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/routes/paths'

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent p-10 text-center shadow-2xl shadow-primary/10 sm:p-16"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        </div>

        <div className="relative">
          <Sparkles className="mx-auto mb-6 size-8 text-primary" />
          <h2 className="font-sora text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Un projet en tête ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Discutons de votre idée. Je réponds rapidement et vous accompagne de la conception
            jusqu’au déploiement.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link to={PATHS.contact}>
                Me contacter
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
