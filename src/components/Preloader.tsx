import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useUIStore } from '@/store/ui-store'

const EASE = [0.22, 1, 0.36, 1] as const

export function Preloader() {
  const isPreloaderDone = useUIStore((state) => state.isPreloaderDone)

  useEffect(() => {
    if (!isPreloaderDone) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isPreloaderDone])

  return (
    <AnimatePresence>
      {!isPreloaderDone && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-sora text-sm font-bold text-background shadow-2xl shadow-primary/40"
            >
              {'</>'}
            </motion.div>

            <div className="h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-sora text-xs font-medium uppercase tracking-[0.35em] text-muted"
            >
              Chargement
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
