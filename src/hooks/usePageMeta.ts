import { useEffect } from 'react'
import { SITE } from '@/constants/site'

function setMeta(property: string, content: string, attribute: 'name' | 'property' = 'property') {
  let el = document.querySelector(`meta[${attribute}="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attribute, property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

export function usePageMeta(
  title?: string,
  description?: string,
  options?: { path?: string; image?: string },
) {
  const pageTitle = title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.role}`
  const pageDescription = description ?? SITE.tagline
  const pageUrl = options?.path ? `${SITE.url}${options.path}` : SITE.url
  const pageImage = options?.image ?? `${SITE.url}/logoPF.png`

  useEffect(() => {
    document.title = pageTitle

    setMeta('description', pageDescription, 'name')
    setCanonical(pageUrl)

    setMeta('og:type', 'website')
    setMeta('og:site_name', SITE.name)
    setMeta('og:locale', 'fr_FR')
    setMeta('og:url', pageUrl)
    setMeta('og:title', pageTitle)
    setMeta('og:description', pageDescription)
    setMeta('og:image', pageImage)

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', pageTitle)
    setMeta('twitter:description', pageDescription)
    setMeta('twitter:image', pageImage)
  }, [pageTitle, pageDescription, pageUrl, pageImage])
}
