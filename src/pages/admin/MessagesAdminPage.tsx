import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  MessageSquare,
  MailCheck,
  Trash2,
  MailOpen,
  Loader2,
  AlertTriangle,
  Inbox,
  ArrowDown,
  Reply,
} from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import {
  deleteMessage,
  fetchMessages,
  formatDate,
  markMessageAsRead,
  type AdminMessage,
} from '@/services/admin'
import { cn } from '@/utils/cn'
import { ReplyComposer } from '@/components/admin/ReplyComposer'

export function MessagesAdminPage() {
  usePageMeta('Messages', 'Gestion des messages du portfolio')

  const queryClient = useQueryClient()
  const [selected, setSelected] = useState<AdminMessage | null>(null)
  const [replyingTo, setReplyingTo] = useState<AdminMessage | null>(null)

  const { data: messages = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-messages'],
    queryFn: fetchMessages,
  })

  const readMutation = useMutation({
    mutationFn: markMessageAsRead,
    onSuccess: (updated) => {
      queryClient.setQueryData<AdminMessage[]>(['admin-messages'], (current) =>
        current?.map((message) => (message.id === updated.id ? updated : message)),
      )
      setSelected((current) => (current && current.id === updated.id ? updated : current))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: (_result, id) => {
      queryClient.setQueryData<AdminMessage[]>(['admin-messages'], (current) =>
        current?.filter((message) => message.id !== id),
      )
      setSelected((current) => (current && current.id === id ? null : current))
      setReplyingTo((current) => (current && current.id === id ? null : current))
    },
  })

  function handleReplySent(updated: AdminMessage) {
    queryClient.setQueryData<AdminMessage[]>(['admin-messages'], (current) =>
      current?.map((message) => (message.id === updated.id ? updated : message)),
    )
    setSelected(updated)
    setReplyingTo(null)
  }

  const unreadCount = messages.filter((message) => !message.isRead).length

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-sora text-2xl font-bold tracking-tight">Messages</h1>
          <p className="mt-1 text-sm text-muted">
            {messages.length > 0 ? (
              <>
                {messages.length} message{messages.length > 1 ? 's' : ''} ·{' '}
                <span className="text-accent">{unreadCount} non lu{unreadCount > 1 ? 's' : ''}</span>
              </>
            ) : (
              'Boîte de réception du formulaire de contact.'
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refetch()}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
        >
          <ArrowDown className="size-4" />
          Actualiser
        </button>
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

      {!isLoading && !isError && messages.length === 0 && (
        <div className="glass flex h-64 flex-col items-center justify-center gap-3 text-center">
          <span className="grid size-16 place-items-center rounded-2xl bg-white/5">
            <Inbox className="size-8 text-muted/60" />
          </span>
          <p className="text-sm text-muted">Aucun message reçu pour le moment.</p>
        </div>
      )}

      {!isLoading && !isError && messages.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <ul className="space-y-3">
            {messages.map((message) => (
              <li key={message.id}>
                <button
                  type="button"
                  onClick={() => setSelected(message)}
                  className={cn(
                    'w-full rounded-2xl border p-5 text-left transition-all duration-300',
                    selected?.id === message.id
                      ? 'border-primary/40 bg-primary/10'
                      : 'border-white/8 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]',
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          'size-2.5 shrink-0 rounded-full',
                          message.isRead
                            ? 'bg-white/15'
                            : 'bg-primary shadow-[0_0_12px] shadow-primary',
                        )}
                      />
                      <p
                        className={cn(
                          'truncate text-sm',
                          message.isRead ? 'font-medium text-muted' : 'font-semibold text-foreground',
                        )}
                      >
                        {message.subject}
                      </p>
                      {message.repliedAt && (
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                          <MailCheck className="size-3" />
                          Répondu
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 text-xs text-muted/70">{formatDate(message.createdAt)}</span>
                  </div>
                  <p className="mt-2 truncate pl-5.5 text-xs text-muted">
                    {message.name} · {message.email}
                  </p>
                </button>
              </li>
            ))}
          </ul>

          <aside className="lg:sticky lg:top-10 lg:self-start">
            {selected ? (
              <div className="glass rounded-2xl p-6">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-sora text-base font-semibold text-foreground">{selected.subject}</h2>
                    <p className="mt-1 text-xs text-muted">
                      {selected.name} ·{' '}
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-accent transition-colors hover:text-secondary"
                      >
                        {selected.email}
                      </a>
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted/70">{formatDate(selected.createdAt)}</span>
                </div>

                <p className="whitespace-pre-wrap rounded-xl bg-white/[0.04] p-4 text-sm leading-relaxed text-muted">
                  {selected.message}
                </p>

                {selected.reply && (
                  <div className="mt-4 rounded-xl border border-success/20 bg-success/5 p-4">
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-success">
                      <MailCheck className="size-3.5" />
                      Votre réponse envoyée{selected.repliedAt ? ` · ${formatDate(selected.repliedAt)}` : ''}
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
                      {selected.reply}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setReplyingTo(selected)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:brightness-110"
                  >
                    <Reply className="size-4" />
                    Répondre
                  </button>
                  {!selected.isRead && (
                    <button
                      type="button"
                      onClick={() => readMutation.mutate(selected.id)}
                      disabled={readMutation.isPending}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-sm font-medium text-accent transition-all duration-300 hover:bg-primary/20 disabled:opacity-50"
                    >
                      {readMutation.isPending ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <MailOpen className="size-4" />
                      )}
                      Marquer comme lu
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteMutation.mutate(selected.id)}
                    disabled={deleteMutation.isPending}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-danger/40 bg-danger/10 px-5 py-2.5 text-sm font-medium text-danger transition-all duration-300 hover:bg-danger/20 disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Trash2 className="size-4" />
                    )}
                    Supprimer
                  </button>
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
                  >
                    <MailCheck className="size-4" />
                    Ouvrir dans mon client mail
                  </a>
                </div>
              </div>
            ) : (
              <div className="glass flex h-full min-h-48 flex-col items-center justify-center gap-3 rounded-2xl p-6 text-center">
                <span className="grid size-12 place-items-center rounded-xl bg-white/5">
                  <MessageSquare className="size-6 text-muted/60" />
                </span>
                <p className="text-sm text-muted">Sélectionnez un message pour le lire.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      <ReplyComposer
        message={replyingTo}
        open={replyingTo !== null}
        onClose={() => setReplyingTo(null)}
        onSent={handleReplySent}
      />
    </div>
  )
}
