import { useRef, useState, type ChangeEvent } from 'react'
import { AlertTriangle, ImagePlus, Loader2, RefreshCw, Trash2 } from 'lucide-react'
import { uploadImageToCloudinary } from '@/services/cloudinary'

interface ImageUploadFieldProps {
  label: string
  required?: boolean
  hint?: string
  value: string | null | undefined
  onChange: (url: string | null) => void
  onUploadStateChange: (uploading: boolean) => void
}

const MAX_SIZE_MB = 8

export function ImageUploadField({
  label,
  required,
  hint,
  value,
  onChange,
  onUploadStateChange,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Le fichier sélectionné n’est pas une image.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`L’image dépasse ${MAX_SIZE_MB} Mo.`)
      return
    }

    setError(null)
    setUploading(true)
    onUploadStateChange(true)
    try {
      const result = await uploadImageToCloudinary(file)
      onChange(result.secure_url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l’envoi de l’image.')
    } finally {
      setUploading(false)
      onUploadStateChange(false)
    }
  }

  return (
    <div className="space-y-2 sm:col-span-2">
      <label className="block text-xs font-medium uppercase tracking-wider text-muted">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
        {value ? (
          <div>
            <div className="relative h-44 w-full overflow-hidden bg-black/30">
              <img src={value} alt={label} className="h-full w-full object-cover" />
              {uploading && (
                <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-sm">
                  <Loader2 className="size-6 animate-spin text-primary" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 p-3">
              <p className="min-w-0 truncate text-xs text-muted">{value}</p>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 disabled:opacity-50"
                >
                  <RefreshCw className="size-3.5" />
                  Remplacer
                </button>
                <button
                  type="button"
                  onClick={() => onChange(null)}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 rounded-full border border-danger/20 bg-danger/5 px-4 py-2 text-xs font-medium text-danger/80 transition-colors hover:bg-danger/15 hover:text-danger disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" />
                  Retirer
                </button>
              </div>
            </div>
          </div>
        ) : uploading ? (
          <div className="flex h-40 flex-col items-center justify-center gap-3">
            <Loader2 className="size-6 animate-spin text-primary" />
            <p className="text-sm text-muted">Envoi en cours…</p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-40 w-full flex-col items-center justify-center gap-3 transition-colors hover:bg-white/[0.02]"
          >
            <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-primary">
              <ImagePlus className="size-6" />
            </span>
            <span className="text-sm font-medium text-foreground">Choisir une image</span>
            <span className="text-xs text-muted">PNG, JPG ou WebP — max {MAX_SIZE_MB} Mo</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {hint && <p className="text-xs text-muted/60">{hint}</p>}
    </div>
  )
}
