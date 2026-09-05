import { useState } from 'react'
import { AlertTriangle, Loader2, Send, Sparkles, X } from 'lucide-react'
import { draftReplyWithAi } from '@/services/ai'
import { replyToMessage, type AdminMessage } from '@/services/admin'
import { cn } from '@/utils/cn'

interface ReplyComposerProps {
  message: AdminMessage | null
  open: boolean
  onClose: () => void
  onSent: (updated: AdminMessage) => void
}

const SELECT_CLASSES =
  'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60 [&>option]:bg-background [&>option]:text-foreground'

function errorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err) {
    const raw = (err as { message: unknown }).message
    if (typeof raw === 'string' && raw) return raw
  }
  return 'Une erreur est survenue. Réessayez.'
}

export function ReplyComposer({ message, open, onClose, onSent }: ReplyComposerProps) {
  const [reply, setReply] = useState('')
  const [tone, setTone] = useState('Chaleureux et professionnel')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open || !message) return null

  const msg = message

  async function handleAiDraft() {
    setError(null)
    setLoading(true)
    try {
      const drafted = await draftReplyWithAi({
        name: msg.name,
        originalSubject: msg.subject,
        originalMessage: msg.message,
        tone: tone.toLowerCase(),
      })
      setReply(drafted)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleSend() {
    if (reply.trim().length < 5) {
      setError('Votre réponse est trop courte (min. 5 caractères).')
      return
    }
    setError(null)
    setLoading(true)
    try {
      const updated = await replyToMessage(msg.id, reply.trim())
      setReply('')
      onSent(updated)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl shadow-black/60"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/25 text-accent">
              <Send className="size-5" />
            </span>
            <div>
              <h2 className="font-sora text-base font-semibold">Répondre à {msg.name}</h2>
              <p className="text-xs text-muted">
                {msg.email} · Envoyé via Brevo, sans quitter l’admin
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
              Message d’origine
            </div>
            <div className="mb-1 text-sm font-semibold text-foreground">{msg.subject}</div>
            <p className="max-h-32 whitespace-pre-wrap overflow-y-auto text-sm leading-relaxed text-muted">
              {msg.message}
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
              Votre réponse
            </span>
            <textarea
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              rows={8}
              placeholder="Rédigez votre réponse... ou utilisez l’assistant IA ci-dessous."
              className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-primary/60"
            />
          </label>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <label className="block flex-1">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                Ton de la réponse IA
              </span>
              <select value={tone} onChange={(event) => setTone(event.target.value)} className={SELECT_CLASSES}>
                <option value="Chaleureux et professionnel">Chaleureux et professionnel</option>
                <option value="Formel et concis">Formel et concis</option>
                <option value="Détendu et amical">Détendu et amical</option>
                <option value="Pédagogue et détaillé">Pédagogue et détaillé</option>
              </select>
            </label>
            <button
              type="button"
              onClick={() => void handleAiDraft()}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-medium text-accent transition-all duration-300 hover:bg-primary/20 disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Rédiger avec l’IA
            </button>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-foreground transition-all duration-300 hover:border-white/30"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => void handleSend()}
            disabled={loading || reply.trim().length === 0}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all duration-300',
              'bg-gradient-to-r from-primary to-secondary hover:brightness-110 disabled:opacity-50',
            )}
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Envoyer la réponse
          </button>
        </div>
      </div>
    </div>
  )
}