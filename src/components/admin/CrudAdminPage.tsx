import { useState, type FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  AlertTriangle,
  Check,
  Inbox,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { CrudApi, CrudItem } from '@/services/admin'

export interface CrudField {
  key: string
  label: string
  type?: 'text' | 'textarea' | 'number' | 'checkbox' | 'url' | 'date'
  required?: boolean
  placeholder?: string
  hint?: string
  min?: number
  max?: number
  step?: number
  defaultValue?: unknown
  spanFull?: boolean
}

export interface CrudConfig<T extends CrudItem> {
  title: string
  description: string
  icon: LucideIcon
  queryKey: string
  api: CrudApi<T>
  fields: CrudField[]
  columns: { key: string; label: string }[]
  identify: (item: T) => string
  emptyMessage: string
  createLabel: string
}

const inputClasses =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-colors duration-300 focus:border-primary/60 focus:bg-primary/5'

function formatColumnValue(value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non'
  if (value === null || value === undefined || value === '') return '—'
  return String(value)
}

export function CrudAdminPage<T extends CrudItem>({ config }: { config: CrudConfig<T> }) {
  const { api, fields, columns } = config
  const queryClient = useQueryClient()

  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)
  const [form, setForm] = useState<Record<string, unknown>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<T | null>(null)

  const { data: items = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: [config.queryKey],
    queryFn: api.list,
  })

  const saveMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      editing ? api.update(editing.id, payload) : api.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] })
      setEditorOpen(false)
      setEditing(null)
    },
    onError: (err) => {
      setFormError(err instanceof Error ? err.message : 'Échec de l’enregistrement.')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: api.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.queryKey] })
      setConfirmDelete(null)
    },
  })

  function buildDefaults(item: T | null): Record<string, unknown> {
    const defaults: Record<string, unknown> = {}
    for (const field of fields) {
      defaults[field.key] =
        item?.[field.key] ??
        field.defaultValue ??
        (field.type === 'checkbox' ? false : '')
    }
    return defaults
  }

  function openCreate() {
    setEditing(null)
    setForm(buildDefaults(null))
    setFormError(null)
    setEditorOpen(true)
  }

  function openEdit(item: T) {
    setEditing(item)
    setForm(buildDefaults(item))
    setFormError(null)
    setEditorOpen(true)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const payload: Record<string, unknown> = {}
    for (const field of fields) {
      let value = form[field.key]
      if (field.type === 'number') {
        value = Number(value)
      } else if (typeof value === 'string') {
        value = value.trim()
      }
      if (value === '') {
        value = field.required ? '' : null
      }
      payload[field.key] = value
    }

    if (fields.some((field) => field.required && (payload[field.key] === '' || payload[field.key] == null))) {
      setFormError('Veuillez remplir tous les champs obligatoires.')
      return
    }

    saveMutation.mutate(payload)
  }

  function renderField(field: CrudField) {
    const value = form[field.key]

    if (field.type === 'checkbox') {
      return (
        <label
          key={field.key}
          className={cn('flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3', field.spanFull && 'sm:col-span-2')}
        >
          <button
            type="button"
            role="switch"
            aria-checked={Boolean(value)}
            onClick={() => setForm((current) => ({ ...current, [field.key]: !current[field.key] }))}
            className={cn(
              'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300',
              value ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-white/10',
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 size-5 rounded-full bg-white transition-all duration-300',
                value ? 'left-[22px]' : 'left-0.5',
              )}
            />
          </button>
          <span className="text-sm text-foreground">{field.label}</span>
        </label>
      )
    }

    return (
      <div key={field.key} className={cn('space-y-2', field.spanFull && 'sm:col-span-2')}>
        <label htmlFor={`field-${field.key}`} className="block text-xs font-medium uppercase tracking-wider text-muted">
          {field.label}
          {field.required && <span className="ml-1 text-primary">*</span>}
        </label>
        {field.type === 'textarea' ? (
          <textarea
            id={`field-${field.key}`}
            required={field.required}
            value={String(value ?? '')}
            onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
            placeholder={field.placeholder}
            rows={4}
            className={cn(inputClasses, 'resize-y')}
          />
        ) : (
          <input
            id={`field-${field.key}`}
            required={field.required}
            type={field.type === 'number' ? 'number' : field.type === 'url' ? 'url' : field.type === 'date' ? 'date' : 'text'}
            min={field.min}
            max={field.max}
            step={field.step}
            value={String(value ?? '')}
            onChange={(event) => setForm((current) => ({ ...current, [field.key]: event.target.value }))}
            placeholder={field.placeholder}
            className={inputClasses}
          />
        )}
        {field.hint && <p className="text-xs text-muted/60">{field.hint}</p>}
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-accent">
            <config.icon className="size-6" />
          </span>
          <div>
            <h1 className="font-sora text-2xl font-bold tracking-tight">{config.title}</h1>
            <p className="mt-1 text-sm text-muted">{config.description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-medium text-background shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110"
        >
          <Plus className="size-4" />
          {config.createLabel}
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

      {!isLoading && !isError && items.length === 0 && (
        <div className="glass flex h-64 flex-col items-center justify-center gap-3 text-center">
          <span className="grid size-16 place-items-center rounded-2xl bg-white/5">
            <Inbox className="size-8 text-muted/60" />
          </span>
          <p className="text-sm text-muted">{config.emptyMessage}</p>
        </div>
      )}

      {!isLoading && !isError && items.length > 0 && (
        <ul className="glass divide-y divide-white/5 rounded-2xl">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 p-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{config.identify(item)}</p>
                <p className="mt-1 truncate text-xs text-muted">
                  {columns.map((column) => (
                    <span key={column.key} className="mr-3">
                      <span className="text-muted/50">{column.label} :</span>{' '}
                      {formatColumnValue(item[column.key])}
                    </span>
                  ))}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  aria-label={`Modifier ${config.identify(item)}`}
                  className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-accent"
                >
                  <Pencil className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(item)}
                  aria-label={`Supprimer ${config.identify(item)}`}
                  className="grid size-10 place-items-center rounded-xl border border-danger/20 bg-danger/5 text-danger/80 transition-colors hover:bg-danger/15 hover:text-danger"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editorOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setEditorOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-background p-6 shadow-2xl shadow-black/50 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="font-sora text-xl font-semibold">
                {editing ? 'Modifier' : 'Nouveau'} {config.createLabel.toLowerCase()}
              </h2>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                aria-label="Fermer"
                className="grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition-colors hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {formError && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
                <AlertTriangle className="mt-0.5 size-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              {fields.map(renderField)}
              <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-foreground transition-colors hover:bg-white/10"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-2.5 text-sm font-medium text-background shadow-lg shadow-primary/25 transition-all duration-300 hover:brightness-110 disabled:opacity-50"
                >
                  {saveMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                  {saveMutation.isPending ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setConfirmDelete(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-white/10 bg-background p-8 text-center shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-danger/10 text-danger">
              <Trash2 className="size-7" />
            </span>
            <h2 className="font-sora text-lg font-semibold">Supprimer cet élément ?</h2>
            <p className="mt-2 text-sm text-muted">
              « {config.identify(confirmDelete)} » sera définitivement supprimé. Cette action est irréversible.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmDelete(null)}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-foreground transition-colors hover:bg-white/10"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => deleteMutation.mutate(confirmDelete.id)}
                disabled={deleteMutation.isPending}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-danger to-danger/80 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-danger/25 transition-all duration-300 hover:brightness-110 disabled:opacity-50"
              >
                {deleteMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                {deleteMutation.isPending ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
