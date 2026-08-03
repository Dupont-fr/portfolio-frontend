import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Compass, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PATHS } from '@/routes/paths'

const EASE = [0.22, 1, 0.36, 1] as const

export function NotFoundPage() {
  usePageMeta('Page introuvable', 'La page demandée n’existe pas.')

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center px-5 py-24 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="font-sora text-[8rem] font-bold leading-none text-gradient sm:text-[10rem]"
        >
          404
        </motion.p>

        <div className="mx-auto mt-2 mb-6 grid size-14 place-items-center rounded-2xl border border-primary/25 bg-primary/10">
          <Compass className="size-7 text-primary" />
        </div>

        <h1 className="font-sora text-2xl font-bold tracking-tight sm:text-3xl">
          Cette page s’est perdue dans le code
        </h1>
        <p className="mt-3 text-muted">
          La page que vous cherchez n’existe pas ou a été déplacée.
        </p>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="primary" size="lg">
            <Link to={PATHS.home}>
              <ArrowLeft className="size-4" />
              Retour à l’accueil
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
