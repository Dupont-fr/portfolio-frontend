import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const API_BASE = 'https://dupont.de5.net/api'
const SITE_URL = 'https://dupontdjeague.de5.net'
const DEFAULT_IMAGE = `${SITE_URL}/logoPF.png`

const BOT_AGENTS = [
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  'WhatsApp',
  'Googlebot',
  'Slackbot',
  'Discordbot',
]

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return BOT_AGENTS.some((bot) => ua.includes(bot.toLowerCase()))
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildHtml(opts: {
  title: string
  description: string
  image: string
  url: string
}): string {
  const t = escapeHtml(opts.title)
  const d = escapeHtml(opts.description)
  const i = escapeHtml(opts.image)
  const u = escapeHtml(opts.url)
  return `<!doctype html>
<html lang="fr" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/logoPF.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#050F2C" />
    <meta name="description" content="${d}" />
    <title>${t}</title>
    <link rel="canonical" href="${u}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Dupont Djeague" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:url" content="${u}" />
    <meta property="og:title" content="${t}" />
    <meta property="og:description" content="${d}" />
    <meta property="og:image" content="${i}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${t}" />
    <meta name="twitter:description" content="${d}" />
    <meta name="twitter:image" content="${i}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
}

export default async function middleware(request: NextRequest): Promise<NextResponse | Response> {
  const userAgent = request.headers.get('user-agent') || ''

  if (!isBot(userAgent)) {
    return NextResponse.next()
  }

  const path = new URL(request.url).pathname

  let title = 'Portfolio — Dupont Djeague | Développeur Full Stack JavaScript'
  let description =
    'Je conçois et développe des expériences web premium, performantes et accessibles.'
  let image = DEFAULT_IMAGE
  const pageUrl = `${SITE_URL}${path}`

  try {
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '').split('?')[0]
      const res = await fetch(`${API_BASE}/blog/${slug}`)
      const json = await res.json()
      const blog = json.data?.blog
      if (blog) {
        title = `${blog.title} · Dupont Djeague`
        description = blog.excerpt || description
        image = blog.coverImage || DEFAULT_IMAGE
      }
    } else if (path.startsWith('/projets/')) {
      const slug = path.replace('/projets/', '').split('?')[0]
      const res = await fetch(`${API_BASE}/projects/${slug}`)
      const json = await res.json()
      const project = json.data?.project
      if (project) {
        title = `${project.title} · Dupont Djeague`
        description = project.description || description
        image = project.coverImage || DEFAULT_IMAGE
      }
    }
  } catch {
    // Fallback to default OG tags
  }

  return new Response(buildHtml({ title, description, image, url: pageUrl }), {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=300',
    },
  })
}

export const config = {
  matcher: ['/blog/:slug', '/projets/:slug'],
}
