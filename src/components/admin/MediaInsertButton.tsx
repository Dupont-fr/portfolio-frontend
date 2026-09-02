import { useRef, useState, type ChangeEvent } from 'react'
import { AlertTriangle, ImagePlus, Loader2 } from 'lucide-react'
import imageCompression from 'browser-image-compression'
import { uploadImageToCloudinary } from '@/services/cloudinary'

interface MediaInsertButtonProps {
  onInserted: (markdown: string) => void
}

const MAX_SIZE_MB = 8
const COMPRESS_THRESHOLD_MB = 2

function isVideoFile(file: File) {
  return file.type.startsWith('video/')
}

function isImageFile(file: File) {
  return file.type.startsWith('image/')
}

export function MediaInsertButton({ onInserted }: MediaInsertButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!isImageFile(file) && !isVideoFile(file)) {
      setError('Fichier non supporté. Images (PNG, JPG, WebP) ou vidéos (MP4, WebM) uniquement.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`Le fichier dépasse ${MAX_SIZE_MB} Mo.`)
      return
    }

    setError(null)
    setUploading(true)
    try {
      let fileToUpload = file
      if (isImageFile(file) && file.size > COMPRESS_THRESHOLD_MB * 1024 * 1024) {
        fileToUpload = await imageCompression(file, {
          maxSizeMB: COMPRESS_THRESHOLD_MB,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })
      }

      const result = await uploadImageToCloudinary(fileToUpload)
      const url = result.secure_url
      const name = file.name.replace(/\.[^.]+$/, '')

      if (isVideoFile(file)) {
        onInserted(`\n\n[video](${url})\n\n`)
      } else {
        onInserted(`\n\n![${name}](${url})\n\n`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'envoi.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-accent disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <ImagePlus className="size-3.5" />
        )}
        {uploading ? 'Envoi en cours…' : 'Insérer une image ou vidéo'}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFile}
      />
    </>
  )
}
