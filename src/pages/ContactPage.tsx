import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, Mail, MapPin, Send, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Reveal } from '@/components/ui/Reveal'
import { PageHero } from '@/components/PageHero'
import { CONTACT_INFOS, SITE, SOCIAL_LINKS } from '@/constants/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { sendContactMessage, type ContactPayload } from '@/services/contact'

const EASE = [0.22, 1, 0.36, 1] as const

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors duration-300 focus:border-primary/60 focus:bg-primary/5'

const inputErrorClasses =
  'border-danger/50 focus:border-danger/60 focus:bg-danger/5'

const initialForm: ContactPayload = { name: '', email: '', subject: '', message: '' }

export function ContactPage() {
  usePageMeta('Contact', 'Discutons de votre projet. Je réponds rapidement à chaque message.')

  const [form, setForm] = useState<ContactPayload>(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const isSending = status === 'sending'

  function updateField<K extends keyof ContactPayload>(field: K, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    setFieldErrors({})

    const result = await sendContactMessage(form)

    if (result) {
      setStatus('error')
      setError(result.message)
      if (result.details) {
        const mapped: Record<string, string> = {}
        for (const [key, messages] of Object.entries(result.details)) {
          if (messages.length > 0) mapped[key] = messages[0]
        }
        setFieldErrors(mapped)
      }
      return
    }

    setStatus('success')
    setForm(initialForm)
  }

  const fieldError = (key: string) => fieldErrors[key] ?? null

  const errorInput = (key: string) =>
    fieldErrors[key] ? `${inputClasses} ${inputErrorClasses}` : inputClasses

  return (
    <>
      <PageHero
        eyebrow="Parlons de votre projet"
        icon={<Send className="size-3.5" />}
        title={
          <>
            Contact
            <span className="text-gradient">.</span>
          </>
        }
        description="Une idée, un projet ou une question ? Envoyez-moi un message, je vous réponds rapidement."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-5">
            {CONTACT_INFOS.map((info, index) => (
              <Reveal key={info.label} delay={index * 0.08}>
                <a
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  className="glass group flex items-center gap-4 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary transition-colors duration-300 group-hover:text-accent">
                    <info.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">
                      {info.label}
                    </span>
                    <span className="block text-sm font-medium text-foreground">{info.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <div className="glass flex items-center gap-4 rounded-2xl px-6 py-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-medium uppercase tracking-wider text-muted">
                    Localisation
                  </span>
                  <span className="block text-sm font-medium text-foreground">{SITE.location}</span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  <h2 className="font-sora text-sm font-semibold text-foreground">Réseaux sociaux</h2>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      title={social.label}
                      className="grid size-11 place-items-center rounded-xl text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                      style={{ backgroundColor: social.color }}
                    >
                      <social.icon className="size-5" />
                    </a>
                  ))}
                </div>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl p-8 shadow-2xl shadow-black/30 sm:p-10">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-96 flex-col items-center justify-center text-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-success/15 text-success">
                    <CheckCircle2 className="size-8" />
                  </span>
                  <h2 className="mt-6 font-sora text-2xl font-bold text-foreground">
                    Message envoyé !
                  </h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                    Merci pour votre message. Je vous réponds dans les plus brefs délais.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-8"
                    onClick={() => setStatus('idle')}
                  >
                    Envoyer un autre message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted"
                      >
                        Nom
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={form.name}
                        onChange={(event) => updateField('name', event.target.value)}
                        placeholder="Votre nom"
                        required
                        minLength={2}
                        maxLength={80}
                        pattern="[a-zA-ZÀ-ÿ\u00C0-\u024F].*"
                        title="Le nom doit contenir au moins une lettre"
                        className={errorInput('name')}
                      />
                      {fieldError('name') && (
                        <p className="mt-1.5 text-xs text-danger">{fieldError('name')}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        placeholder="vous@exemple.com"
                        required
                        maxLength={160}
                        className={errorInput('email')}
                      />
                      {fieldError('email') && (
                        <p className="mt-1.5 text-xs text-danger">{fieldError('email')}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted"
                    >
                      Sujet
                    </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={form.subject}
                        onChange={(event) => updateField('subject', event.target.value)}
                        placeholder="Objet de votre message"
                        required
                        minLength={2}
                        maxLength={150}
                        className={errorInput('subject')}
                      />
                      {fieldError('subject') && (
                        <p className="mt-1.5 text-xs text-danger">{fieldError('subject')}</p>
                      )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted"
                    >
                      Message
                    </label>
                      <textarea
                        id="contact-message"
                        value={form.message}
                        onChange={(event) => updateField('message', event.target.value)}
                        placeholder="Décrivez votre projet..."
                        required
                        minLength={10}
                        maxLength={5000}
                        rows={6}
                        className={`${errorInput('message')} resize-none`}
                      />
                      {fieldError('message') && (
                        <p className="mt-1.5 text-xs text-danger">{fieldError('message')}</p>
                      )}
                  </div>

                  {status === 'error' && (
                    <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
                      {error || 'Une erreur est survenue. Veuillez réessayer.'}
                    </p>
                  )}

                  <Button type="submit" variant="primary" size="lg" disabled={isSending} className="w-full">
                    {isSending ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="size-4" />
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <Badge tone="success">
                      <Mail className="size-3.5" />
                      Réponse rapide garantie
                    </Badge>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
