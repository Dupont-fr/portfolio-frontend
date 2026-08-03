import { motion } from 'framer-motion'

export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      <motion.div
        className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-secondary/25 blur-[130px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-40 top-1/4 size-[30rem] rounded-full bg-primary/20 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-48 left-1/3 size-[28rem] rounded-full bg-secondary/15 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
    </div>
  )
}
