import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { PATHS } from '@/routes/paths'
import type { ReactNode } from 'react'

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm text-muted">Chargement de la session…</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={PATHS.admin.login} replace state={{ from: location.pathname }} />
  }

  return <>{children}</>
}
