import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useAuth } from '@/context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATHS } from '@/routes/paths'

const EASE = [0.22, 1, 0.36, 1] as const

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors duration-300 focus:border-primary/60 focus:bg-primary/5'

export function AdminLoginPage() {
  usePageMeta('Connexion Admin', 'Espace d’administration')

  const { login, user } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to={PATHS.admin.dashboard} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(PATHS.admin.dashboard, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de la connexion. Réessayez.')
    } finally {
      setSubmitting(false)
    }
  }

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

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulaire de connexion">
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted/60" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
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
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className={`${inputClasses} px-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/60 transition-colors hover:text-accent"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
              {submitting ? <Loader2 className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}
              {submitting ? 'Connexion…' : 'Se connecter'}
              {!submitting && <ArrowRight className="size-4" />}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
