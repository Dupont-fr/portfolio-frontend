import { motion } from 'framer-motion'
import { useState } from 'react'
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Badge } from '@/components/ui/Badge'

const EASE = [0.22, 1, 0.36, 1] as const

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors duration-300 focus:border-primary/60 focus:bg-primary/5'

export function AdminLoginPage() {
  usePageMeta('Connexion Admin', 'Espace d’administration')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-16 sm:px-8">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 size-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-black/30 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-background shadow-lg shadow-primary/30">
              <Lock className="size-7" />
            </div>
            <h1 className="font-sora text-2xl font-bold tracking-tight">Espace Admin</h1>
            <p className="mt-2 text-sm text-muted">Connectez-vous pour gérer le contenu du portfolio.</p>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="space-y-4"
            aria-label="Formulaire de connexion"
          >
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@portfolio.com"
                  className={`${inputClasses} pl-11`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted/60" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className={`${inputClasses} pl-11`}
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Se connecter
              <ArrowRight className="size-4" />
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2">
            <Badge tone="warning">
              <ShieldCheck className="size-3.5" />
              Authentification disponible au Sprint 6
            </Badge>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
