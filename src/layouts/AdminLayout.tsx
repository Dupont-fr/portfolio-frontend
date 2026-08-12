import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  ArrowLeft,
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Newspaper,
  Award,
  Settings,
  LogOut,
} from 'lucide-react'
import { PATHS } from '@/routes/paths'
import { cn } from '@/utils/cn'
import { useAuth } from '@/context/AuthContext'

const ADMIN_NAV = [
  { label: 'Dashboard', to: PATHS.admin.dashboard, icon: LayoutDashboard },
  { label: 'Projets', to: PATHS.admin.projects, icon: FolderKanban },
  { label: 'Compétences', to: PATHS.admin.skills, icon: BarChart3 },
  { label: 'Formations', to: PATHS.admin.educations, icon: GraduationCap },
  { label: 'Expériences', to: PATHS.admin.experiences, icon: Briefcase },
  { label: 'Blog', to: PATHS.admin.blog, icon: Newspaper },
  { label: 'Certifications', to: PATHS.admin.certifications, icon: Award },
  { label: 'Messages', to: PATHS.admin.messages, icon: MessageSquare },
  { label: 'Paramètres', to: PATHS.admin.settings, icon: Settings },
]

export function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="relative flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-16 flex-col border-r border-white/5 bg-background/70 backdrop-blur-xl lg:w-64">
        <div className="flex h-20 items-center justify-center lg:justify-start lg:px-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-sora text-xs font-bold text-background">
            {'</>'}
          </span>
          <span className="ml-3 hidden font-sora text-sm font-semibold lg:block">
            Admin<span className="text-primary">.</span>
          </span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 lg:justify-start',
                  isActive
                    ? 'bg-primary/15 text-accent shadow-inner shadow-primary/10'
                    : 'text-muted hover:bg-white/5 hover:text-foreground',
                )
              }
            >
              <item.icon className="size-5 shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="space-y-3 border-t border-white/5 p-3">
          {user && (
            <div className="hidden items-center gap-3 rounded-xl bg-white/5 px-3 py-3 lg:flex">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-background">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.role.toLowerCase()}</p>
              </div>
            </div>
          )}

          <Link
            to={PATHS.home}
            className="flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground lg:justify-start"
          >
            <ArrowLeft className="size-5 shrink-0" />
            <span className="hidden lg:block">Retour au site</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-danger/90 transition-colors hover:bg-danger/10 hover:text-danger lg:justify-start"
          >
            <LogOut className="size-5 shrink-0" />
            <span className="hidden lg:block">Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="ml-16 flex-1 px-5 py-10 sm:px-8 lg:ml-64">
        <Outlet />
      </main>
    </div>
  )
}
