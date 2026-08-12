import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  MessageSquare,
  MailOpen,
  FolderKanban,
  BarChart3,
  GraduationCap,
  Briefcase,
  FileText,
  Eye,
  Award,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Globe,
  MousePointerClick,
  TrendingUp,
} from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { fetchDashboardStats, fetchVisitStats, formatDate } from '@/services/admin'
import { PATHS } from '@/routes/paths'
import { cn } from '@/utils/cn'

const STAT_CARDS = [
  { key: 'messages', label: 'Messages', suffix: '' },
  { key: 'unreadMessages', label: 'Non lus', suffix: '' },
  { key: 'project', label: 'Projets', suffix: '' },
  { key: 'skill', label: 'Compétences', suffix: '' },
  { key: 'experience', label: 'Expériences', suffix: '' },
  { key: 'education', label: 'Formations', suffix: '' },
  { key: 'blog', label: 'Articles', suffix: '' },
  { key: 'certification', label: 'Certifications', suffix: '' },
  { key: 'visitor', label: 'Visiteurs', suffix: '' },
] as const

export function DashboardPage() {
  usePageMeta('Dashboard', 'Tableau de bord de l’administration')

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  })

  const {
    data: visitStats,
    isLoading: visitStatsLoading,
    isError: visitStatsError,
  } = useQuery({
    queryKey: ['admin', 'visit-stats'],
    queryFn: fetchVisitStats,
  })

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-sora text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Vue d’ensemble de votre portfolio.</p>
        </div>
        <Link
          to={PATHS.admin.messages}
          className="inline-flex items-center gap-2 self-start rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-accent transition-all duration-300 hover:bg-primary/20"
        >
          <MessageSquare className="size-4" />
          Gérer les messages
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {isLoading && (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      )}

      {isError && (
        <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 text-danger">
            <AlertTriangle className="size-5" />
            <span className="text-sm">{error instanceof Error ? error.message : 'Erreur de chargement'}</span>
          </div>
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
          >
            Réessayer
          </button>
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STAT_CARDS.map((card) => {
              const Icon =
                card.key === 'messages'
                  ? MessageSquare
                  : card.key === 'unreadMessages'
                    ? MailOpen
                    : card.key === 'project'
                      ? FolderKanban
                      : card.key === 'skill'
                        ? BarChart3
                        : card.key === 'experience'
                          ? Briefcase
                          : card.key === 'education'
                            ? GraduationCap
                      : card.key === 'blog'
                        ? FileText
                        : card.key === 'certification'
                          ? Award
                          : Eye
              const value = data[card.key]
              const highlight = card.key === 'unreadMessages' && value > 0
              return (
                <div
                  key={card.key}
                  className={cn(
                    'glass rounded-2xl p-5 transition-all duration-300',
                    highlight && 'ring-1 ring-primary/40',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        'grid size-10 place-items-center rounded-xl',
                        highlight ? 'bg-primary/15 text-accent' : 'bg-white/5 text-muted',
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span
                      className={cn(
                        'font-sora text-3xl font-bold tabular-nums',
                        highlight ? 'text-accent' : 'text-foreground',
                      )}
                    >
                      {value}
                      {card.suffix}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted">{card.label}</p>
                </div>
              )
            })}
          </div>

          <div className="glass mt-8 rounded-2xl p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-sora text-lg font-semibold">
                Messages récents
                <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-accent">
                  <LayoutDashboard className="size-3.5" />
                  {data.recentMessages.length}
                </span>
              </h2>
              <Link
                to={PATHS.admin.messages}
                className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-secondary"
              >
                Tout voir
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {data.recentMessages.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">
                Aucun message pour le moment. Les visiteurs passeront par la page Contact.
              </p>
            ) : (
              <ul className="divide-y divide-white/5">
                {data.recentMessages.map((message) => (
                  <li key={message.id} className="flex items-center gap-4 py-4">
                    <span
                      className={cn(
                        'size-2.5 shrink-0 rounded-full',
                        message.isRead ? 'bg-white/15' : 'bg-primary shadow-[0_0_12px] shadow-primary',
                      )}
                      title={message.isRead ? 'Lu' : 'Non lu'}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {message.subject}
                        {!message.isRead && (
                          <span className="ml-2 rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
                            Nouveau
                          </span>
                        )}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {message.name} · {message.email}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted/70">{formatDate(message.createdAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="glass mt-8 rounded-2xl p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-sora text-lg font-semibold">
                Statistiques de visite
                <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-accent">
                  <TrendingUp className="size-3.5" />
                  {visitStats ? `${visitStats.totalPageViews} vues` : '…'}
                </span>
              </h2>
              {visitStats && (
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                    <Globe className="size-3.5 text-primary" />
                    {visitStats.totalVisitors} visiteurs uniques
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                    <MousePointerClick className="size-3.5 text-primary" />
                    {visitStats.recentVisits.length} dernières visites
                  </span>
                </div>
              )}
            </div>

            {visitStatsLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="size-6 animate-spin text-primary" />
              </div>
            ) : visitStatsError ? (
              <p className="py-10 text-center text-sm text-muted">
                Les statistiques de visite sont momentanément indisponibles.
              </p>
            ) : !visitStats ? null : visitStats.totalPageViews === 0 ? (
              <p className="py-10 text-center text-sm text-muted">
                Aucune visite enregistrée pour le moment. Les visites sont comptées dès qu’un
                visiteur navigue sur le site.
              </p>
            ) : (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <p className="mb-4 text-xs uppercase tracking-wider text-muted">
                    Vues · 14 derniers jours
                  </p>
                  <div className="flex h-40 items-end gap-1.5">
                    {visitStats.last14Days.map((day) => {
                      const max = Math.max(1, ...visitStats.last14Days.map((item) => item.count))
                      const height =
                        day.count === 0
                          ? 4
                          : Math.max(8, Math.round((day.count / max) * 100))
                      return (
                        <div key={day.date} className="group relative flex h-full flex-1 flex-col justify-end">
                          {day.count > 0 && (
                            <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                              {day.count}
                            </span>
                          )}
                          <div
                            className="w-full rounded-t-md bg-gradient-to-t from-primary/40 to-secondary transition-all duration-300 group-hover:from-primary/60 group-hover:to-secondary"
                            style={{ height: `${height}%` }}
                          />
                          <span className="mt-1.5 block text-center text-[10px] text-muted/60">
                            {new Date(`${day.date}T00:00:00Z`).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                            })}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-4 text-xs uppercase tracking-wider text-muted">
                    Pages les plus visitées
                  </p>
                  {visitStats.topPages.length === 0 ? (
                    <p className="py-4 text-sm text-muted">Aucune donnée pour le moment.</p>
                  ) : (
                    <ul className="space-y-3">
                      {visitStats.topPages.map((page) => (
                        <li key={page.path} className="flex items-center justify-between gap-3">
                          <span className="truncate font-mono text-sm text-muted">{page.path}</span>
                          <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                            {page.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
