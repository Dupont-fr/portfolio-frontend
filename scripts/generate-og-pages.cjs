const fs = require('node:fs')
const path = require('node:path')

const API_BASE = process.env.API_BASE_URL || 'https://dupont.de5.net/api'
const SITE_URL = process.env.SITE_URL || 'https://dupontdjeague.de5.net'
const DEFAULT_IMAGE = `${SITE_URL}/logoPF.png`
const SITE_NAME = 'Dupont Djeague'

const distDir = path.join(__dirname, '..', 'dist')

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function setMeta(html, attrs, content) {
  const escaped = escapeHtml(content)
  const re = new RegExp('(<meta\\s+' + attrs + ')[^>]*>')
  return html.replace(re, (match, prefix) => `${prefix} content="${escaped}" />`)
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
  return res.json()
}

function buildArticleHtml(baseHtml, { title, description, image, url }) {
  let html = baseHtml
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = setMeta(html, 'name="description"', description)
  html = html.replace(
    /<link\s+rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${escapeHtml(url)}" />`
  )
  html = setMeta(html, 'property="og:type"', 'article')
  html = setMeta(html, 'property="og:url"', url)
  html = setMeta(html, 'property="og:title"', title)
  html = setMeta(html, 'property="og:description"', description)
  html = setMeta(html, 'property="og:image"', image)
  html = setMeta(html, 'name="twitter:title"', title)
  html = setMeta(html, 'name="twitter:description"', description)
  html = setMeta(html, 'name="twitter:image"', image)
  return html
}

function writePage(relativePath, content) {
  const filePath = path.join(distDir, relativePath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, content)
  console.log(`  ✓ ${relativePath}`)
}

async function main() {
  const baseHtmlPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('[og-pages] dist/index.html introuvable, skip de la generation')
    return
  }
  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf-8')

  let blogPosts = []
  let projects = []
  try {
    const [blogRes, projectRes] = await Promise.all([
      fetchJson(`${API_BASE}/blog`),
      fetchJson(`${API_BASE}/projects`),
    ])
    blogPosts = blogRes?.data?.blogs ?? []
    projects = projectRes?.data?.projects ?? []
  } catch (err) {
    console.warn("[og-pages] API injoignable, pages OG non generees:", err.message)
    return
  }

  let count = 0

  for (const post of blogPosts) {
    if (!post.slug) continue
    const html = buildArticleHtml(baseHtml, {
      title: `${post.title} · ${SITE_NAME}`,
      description: post.excerpt || 'Article de ' + SITE_NAME + '.',
      image: post.coverImage || DEFAULT_IMAGE,
      url: `${SITE_URL}/blog/${post.slug}`,
    })
    writePage(path.join('blog', post.slug, 'index.html'), html)
    count++
  }

  for (const project of projects) {
    if (!project.slug) continue
    const html = buildArticleHtml(baseHtml, {
      title: `${project.title} · ${SITE_NAME}`,
      description: project.description || 'Projet de ' + SITE_NAME + '.',
      image: project.coverImage || DEFAULT_IMAGE,
      url: `${SITE_URL}/projets/${project.slug}`,
    })
    writePage(path.join('projets', project.slug, 'index.html'), html)
    count++
  }

  console.log(`[og-pages] ${count} pages OG generees dans dist/`)
}

main().catch((err) => {
  console.warn('[og-pages] Erreur:', err.message)
  process.exit(0)
})