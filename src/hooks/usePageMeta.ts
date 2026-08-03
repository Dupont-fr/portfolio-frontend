import { useEffect } from 'react'
import { SITE } from '@/constants/site'

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.role}`
    if (description) {
      const meta = document.querySelector('meta[name="description"]')
      if (meta) meta.setAttribute('content', description)
    }
  }, [title, description])
}
