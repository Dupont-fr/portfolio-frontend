import { useState } from 'react'
import {
  AlertTriangle,
  Check,
  Loader2,
  Sparkles,
  Tag as TagIcon,
  Wand2,
  X,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import {
  generateArticleWithAi,
  generateProjectWithAi,
  rewriteWithAi,
  suggestTagsWithAi,
} from '@/services/ai'

export type AiAssistantMode = 'article' | 'project'

interface AiAssistantPanelProps {
  mode: AiAssistantMode
  open: boolean
  onClose: () => void
  form: Record<string, unknown>
  onApply: (patch: Record<string, unknown>) => void
}

type TabId = 'generate' | 'improve' | 'tags'

function errorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'message' in err) {
    const raw = (err as { message: unknown }).message
    if (typeof raw === 'string' && raw) return raw
  }
  return 'Échec de la génération. Réessayez.'
}

export function AiAssistantPanel({ mode, open, onClose, form, onApply }: AiAssistantPanelProps) {
  const [tab, setTab] = useState<TabId>('generate')
  const [topic, setTopic] = useState('')
  const [tone, setTone] = useState('Professionnel et accessible')
  const [language, setLanguage] = useState('français')
  const [projectDescription, setProjectDescription] = useState('')
  const [rewriteTarget, setRewriteTarget] = useState('content')
  const [rewriteText, setRewriteText] = useState('')
  const [rewriteInstructions, setRewriteInstructions] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generated, setGenerated] = useState<Record<string, unknown> | null>(null)
  const [rewritten, setRewritten] = useState<string | null>(null)
  const [suggestedTags, setSuggestedTags] = useState<string[] | null>(null)

  const isArticle = mode === 'article'

  function syncRewriteTarget(target: string) {
    setRewriteTarget(target)
    setRewriteText(String(form[target] ?? ''))
  }

  async function handleGenerate() {
    setError(null)
    setGenerated(null)
    if (isArticle && topic.trim().length < 5) {
      setError('Décris le thème de l’article en quelques mots (min. 5 caractères).')
      return
    }
    if (!isArticle && projectDescription.trim().length < 5) {
      setError('Décris le projet en quelques mots (min. 5 caractères).')
      return
    }
    setLoading(true)
    try {
      const result = isArticle
        ? await generateArticleWithAi({ topic: topic.trim(), tone, language })
        : await generateProjectWithAi(projectDescription.trim())
      setGenerated(result as unknown as Record<string, unknown>)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleRewrite() {
    setError(null)
    setRewritten(null)
    if (rewriteText.trim().length < 20) {
      setError('Le texte à améliorer est trop court (min. 20 caractères).')
      return
    }
    setLoading(true)
    try {
      const text = await rewriteWithAi(rewriteText.trim(), rewriteInstructions.trim() || undefined)
      setRewritten(text)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  async function handleSuggestTags() {
    setError(null)
    setSuggestedTags(null)
    const source = String(form.content ?? '') || String(form.excerpt ?? '')
    if (source.trim().length < 20) {
      setError('Remplis d’abord le contenu ou l’extrait pour que je puisse suggérer des tags.')
      return
    }
    setLoading(true)
    try {
      const tags = await suggestTagsWithAi(source)
      setSuggestedTags(tags)
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  function applyAll() {
    if (!generated) return
    const patch: Record<string, unknown> = { ...generated }
    if (Array.isArray(patch.tags)) {
      const tags = patch.tags as string[]
      patch.tags = tags.length > 0 ? tags.join('\n') : ''
    }
    if (Array.isArray(patch.stack)) {
      const stack = patch.stack as string[]
      patch.stack = stack.length > 0 ? stack.join('\n') : ''
    }
    if (Array.isArray(patch.features)) {
      const features = patch.features as string[]
      patch.features = features.length > 0 ? features.join('\n') : ''
    }
    if (Array.isArray(patch.outcomes)) {
      const outcomes = patch.outcomes as string[]
      patch.outcomes = outcomes.length > 0 ? outcomes.join('\n') : ''
    }
    onApply(patch)
    setGenerated(null)
  }

  function applyRewrite() {
    if (rewritten === null) return
    onApply({ [rewriteTarget]: rewritten })
    setRewritten(null)
  }

  function applyTags() {
    if (!suggestedTags) return
    onApply({ tags: suggestedTags.join('\n') })
    setSuggestedTags(null)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <aside
        className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-background/95 shadow-2xl shadow-black/60 backdrop-blur-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 p-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/25 text-accent">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h2 className="font-sora text-base font-semibold">Assistant IA</h2>
              <p className="text-xs text-muted">
                {isArticle ? 'Rédigez vos articles' : 'Concevez vos projets'} avec Gemini
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

        <div className="flex border-b border-white/10">
          {(
            [
              { id: 'generate', label: isArticle ? 'Générer article' : 'Générer projet', icon: Wand2 },
              { id: 'improve', label: 'Améliorer', icon: Sparkles },
              ...(isArticle ? [{ id: 'tags', label: 'Tags', icon: TagIcon }] : []),
            ] as { id: TabId; label: string; icon: typeof Wand2 }[]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-3 text-xs font-medium transition-colors',
                tab === item.id
                  ? 'border-primary bg-primary/5 text-accent'
                  : 'border-transparent text-muted hover:text-foreground',
              )}
            >
              <item.icon className="size-3.5" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {tab === 'generate' && (
            <>
              {isArticle ? (
                <>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                      Thème de l’article
                    </span>
                    <textarea
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                      rows={3}
                      placeholder="Ex : Pourquoi les tests sont essentiels dans une équipe développement…"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-primary/60 focus:bg-primary/5"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                        Tonalité
                      </span>
                      <select
                        value={tone}
                        onChange={(event) => setTone(event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                      >
                        <option>Professionnel et accessible</option>
                        <option>Décontracté et chaleureux</option>
                        <option>Pédagogique et structuré</option>
                        <option>Inspirant</option>
                        <option>Technique et précis</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                        Langue
                      </span>
                      <select
                        value={language}
                        onChange={(event) => setLanguage(event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                      >
                        <option>français</option>
                        <option>anglais</option>
                        <option>espagnol</option>
                      </select>
                    </label>
                  </div>
                </>
              ) : (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                    Décris le projet
                  </span>
                  <textarea
                    value={projectDescription}
                    onChange={(event) => setProjectDescription(event.target.value)}
                    rows={3}
                    placeholder="Ex : une application web de gestion de tâches avec temps réel et collaboration…"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-primary/60 focus:bg-primary/5"
                  />
                </label>
              )}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-medium text-background shadow-lg shadow-primary/25 transition-all duration-300 hover:brightness-110 disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
                {loading ? 'Génération en cours…' : 'Générer'}
              </button>

              {generated && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="mb-2 text-sm font-semibold text-accent">
                    {String(generated.title ?? '')}
                  </p>
                  <p className="mb-3 line-clamp-3 text-xs text-muted">
                    {String(generated.excerpt ?? generated.description ?? '')}
                  </p>
                  <button
                    type="button"
                    onClick={applyAll}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:brightness-110"
                  >
                    <Check className="size-4" />
                    Remplir le formulaire
                  </button>
                </div>
              )}
            </>
          )}

          {tab === 'improve' && (
            <>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                  Qu’améliorer ?
                </span>
                <select
                  value={rewriteTarget}
                  onChange={(event) => syncRewriteTarget(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary/60"
                >
                  {isArticle ? (
                    <>
                      <option value="content">Contenu de l’article</option>
                      <option value="excerpt">Extrait</option>
                    </>
                  ) : (
                    <>
                      <option value="longDescription">Description longue</option>
                      <option value="description">Description courte</option>
                    </>
                  )}
                </select>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                  Texte à améliorer
                </span>
                <textarea
                  value={rewriteText}
                  onChange={(event) => setRewriteText(event.target.value)}
                  rows={6}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-primary/60 focus:bg-primary/5"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted">
                  Consignes (optionnel)
                </span>
                <input
                  value={rewriteInstructions}
                  onChange={(event) => setRewriteInstructions(event.target.value)}
                  placeholder="Ex : plus concis, plus percutant"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors focus:border-primary/60 focus:bg-primary/5"
                />
              </label>

              <button
                type="button"
                onClick={handleRewrite}
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-medium text-background shadow-lg shadow-primary/25 transition-all duration-300 hover:brightness-110 disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                {loading ? 'Réécriture en cours…' : 'Réécrire'}
              </button>

              {rewritten && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="mb-3 max-h-40 overflow-y-auto whitespace-pre-wrap text-xs text-muted">
                    {rewritten}
                  </div>
                  <button
                    type="button"
                    onClick={applyRewrite}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:brightness-110"
                  >
                    <Check className="size-4" />
                    Appliquer
                  </button>
                </div>
              )}
            </>
          )}

          {tab === 'tags' && (
            <>
              <p className="text-sm text-muted">
                L’IA analyse le contenu et l’extrait actuels de l’article pour proposer des tags
                pertinents.
              </p>

              <button
                type="button"
                onClick={handleSuggestTags}
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-medium text-background shadow-lg shadow-primary/25 transition-all duration-300 hover:brightness-110 disabled:opacity-50"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <TagIcon className="size-4" />}
                {loading ? 'Analyse en cours…' : 'Suggérer des tags'}
              </button>

              {suggestedTags && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={applyTags}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-background transition-all duration-300 hover:brightness-110"
                  >
                    <Check className="size-4" />
                    Appliquer les tags
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  )
}