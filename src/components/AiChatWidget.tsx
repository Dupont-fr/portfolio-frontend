import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Loader2, Send, Trash2, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { sendAiChat, type ChatTurn } from '@/services/public'

const STORAGE_KEY = 'dupont-ai-history'
const MAX_STORED_TURNS = 20

const GREETING: ChatTurn = {
  role: 'assistant',
  content:
    "Bonjour ! Je suis **Dupont AI**, l'assistant du portfolio de **Dupont Djeague**. Posez-moi vos questions sur son profil, ses compétences, ses projets, ses services ou sa disponibilité. Comment puis-je vous aider ?",
}

const QUICK_PROMPTS = [
  'Que proposez-vous ?',
  'Quelles sont vos compétences ?',
  'Présentez-moi un projet',
  'Comment vous contacter ?',
]

function renderInline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const token = match[0]
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      )
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={key++}
          className="rounded-md border border-white/10 bg-background/60 px-1.5 py-0.5 font-mono text-[0.9em] text-accent"
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('[')) {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if (link) {
        nodes.push(
          <a
            key={key++}
            href={link[2]}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-accent underline-offset-4 transition-colors hover:text-secondary hover:underline"
          >
            {link[1]}
          </a>,
        )
      }
    }
    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function MessageContent({ content }: { content: string }) {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  if (lines.length <= 1) {
    return <p className="whitespace-pre-wrap">{renderInline(content.trim())}</p>
  }

  const blocks: ReactNode[] = []
  let bullets: string[] = []
  let key = 0

  const flushBullets = () => {
    if (bullets.length === 0) return
    blocks.push(
      <ul key={key++} className="mt-1.5 space-y-1.5">
        {bullets.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start gap-2.5">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_#00C2FF]" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>,
    )
    bullets = []
  }

  for (const line of lines) {
    if (/^[-*•]\s+/.test(line)) {
      bullets.push(line.replace(/^[-*•]\s+/, ''))
      continue
    }
    flushBullets()
    if (/^#{1,6}\s/.test(line)) {
      blocks.push(
        <p key={key++} className="mt-1.5 font-sora font-semibold text-foreground">
          {renderInline(line.replace(/^#{1,6}\s+/, ''))}
        </p>,
      )
      continue
    }
    blocks.push(
      <p key={key++} className="whitespace-pre-wrap">
        {renderInline(line)}
      </p>,
    )
  }
  flushBullets()

  return <>{blocks}</>
}

function loadHistory(): ChatTurn[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [GREETING]
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return [GREETING]
    const turns = parsed
      .filter(
        (item): item is ChatTurn =>
          item !== null &&
          typeof item === 'object' &&
          'role' in item &&
          'content' in item &&
          ((item as ChatTurn).role === 'user' || (item as ChatTurn).role === 'assistant') &&
          typeof (item as ChatTurn).content === 'string',
      )
      .slice(-MAX_STORED_TURNS)
    if (turns.length === 0) return [GREETING]
    return turns
  } catch {
    return [GREETING]
  }
}

export function AiChatWidget() {
  const [open, setOpen] = useState(false)
  const [turns, setTurns] = useState<ChatTurn[]>(() => loadHistory())
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(turns.slice(-MAX_STORED_TURNS)))
    } catch {
      // stockage indisponible (navigation privée…), on ignore
    }
  }, [turns])

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [turns, loading, open])

  function handleError(err: unknown): string {
    if (err && typeof err === 'object' && 'message' in err) {
      const raw = (err as { message: unknown }).message
      if (typeof raw === 'string' && raw) return raw
    }
    return 'Oups, je n\u2019ai pas pu répondre. Réessayez dans un instant.'
  }

  async function handleSend(prefill?: string) {
    const content = (prefill ?? input).trim()
    if (!content || loading) return
    const nextTurns: ChatTurn[] = [...turns, { role: 'user', content }]
    setTurns(nextTurns)
    setInput('')
    setError(null)
    setLoading(true)
    try {
      const reply = await sendAiChat(nextTurns)
      setTurns((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(handleError(err))
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
    setTurns([GREETING])
    setError(null)
    setInput('')
  }

  const showQuickPrompts = turns.length <= 1 && !loading

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-50 flex items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Chat Dupont AI"
            className="fixed inset-0 z-50 flex h-svh flex-col overflow-hidden bg-background sm:left-auto sm:top-auto sm:bottom-24 sm:right-5 sm:h-[min(620px,calc(100dvh-8rem))] sm:w-[390px] sm:rounded-3xl sm:border sm:border-white/10 sm:bg-background/95 sm:shadow-2xl sm:shadow-black/60 sm:backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3.5 sm:pt-3.5">
              <span className="relative grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-background shadow-lg shadow-primary/25">
                <Bot className="size-5.5" />
                <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-success ring-2 ring-background" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sora text-sm font-semibold text-foreground">Dupont AI</p>
                <p className="truncate text-xs text-muted">Assistant du portfolio · en ligne</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                aria-label="Réinitialiser la conversation"
                title="Réinitialiser"
                className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition-colors hover:border-danger/40 hover:bg-danger/10 hover:text-danger"
              >
                <Trash2 className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le chat"
                className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={messagesRef}
              className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4 [scrollbar-width:thin]"
            >
              {turns.map((turn, index) =>
                turn.role === 'user' ? (
                  <div key={index} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-r from-primary to-secondary px-3.5 py-2.5 text-sm text-background shadow-lg shadow-primary/20">
                      <p className="whitespace-pre-wrap break-words">{turn.content}</p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 text-accent">
                      <Bot className="size-4" />
                    </span>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm leading-relaxed text-muted shadow-lg shadow-black/10">
                      <MessageContent content={turn.content} />
                    </div>
                  </div>
                ),
              )}

              {loading && (
                <div className="flex items-start gap-2.5" aria-label="Dupont AI écrit…">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/30 to-secondary/20 text-accent">
                    <Bot className="size-4" />
                  </span>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-white/10 bg-white/[0.04] px-4 py-3.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="size-1.5 rounded-full bg-accent"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: dot * 0.18,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {showQuickPrompts && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void handleSend(prompt)}
                    className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-primary/20"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form
              className="border-t border-white/10 bg-white/[0.03] px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
              onSubmit={(event) => {
                event.preventDefault()
                void handleSend()
              }}
            >
              {error && <p className="mb-2 px-1 text-xs text-danger">{error}</p>}
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Posez votre question…"
                  maxLength={500}
                  aria-label="Votre question"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-primary/60 focus:bg-background/80"
                />
                <button
                  type="submit"
                  aria-label="Envoyer"
                  className={cn(
                    'grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/25 transition-all duration-300',
                    loading || !input.trim()
                      ? 'opacity-40'
                      : 'hover:brightness-110',
                  )}
                  disabled={loading || !input.trim()}
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </div>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>

      {!open && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-background/85 px-4 py-2.5 text-sm font-medium text-foreground shadow-xl shadow-black/40 backdrop-blur-xl sm:flex"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          Dupont AI · Posez-moi une question
        </motion.span>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Fermer le chat Dupont AI' : 'Ouvrir le chat Dupont AI'}
        title="Discuter avec Dupont AI"
        className={cn(
          'group grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-background shadow-2xl shadow-primary/30 ring-1 ring-white/20 transition-all duration-300 hover:scale-105 hover:brightness-110',
          open && 'hidden sm:grid',
        )}
      >
        {open ? <X className="size-5.5" /> : <Bot className="size-5.5" />}
      </button>
    </div>
  )
}