import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, Loader2, Newspaper } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BlogContent } from '@/components/blog/BlogContent'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { fetchPublicBlogPostBySlug } from '@/services/public'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PATHS } from '@/routes/paths'

const EASE = [0.22, 1, 0.36, 1] as const

function formatPostDate(value?: string | null): string {
  if (!value) return ''
  const iso = value.length === 10 ? `${value}T00:00:00Z` : value
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>()

  const { data: post, isLoading, isError } = useQuery({
    queryKey: ['public', 'blog', slug],
    queryFn: () => fetchPublicBlogPostBySlug(slug ?? ''),
    enabled: Boolean(slug),
    retry: false,
  })

  usePageMeta(post?.title ?? 'Article', post?.excerpt, { path: slug ? `/blog/${slug}` : '/blog' })

  if (isLoading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </section>
    )
  }

  if (isError || !post) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center px-5 pt-32 text-center sm:px-8">
        <Newspaper className="size-10 text-primary/50" />
        <h1 className="mt-6 font-sora text-3xl font-bold text-foreground sm:text-4xl">
          Article introuvable
        </h1>
        <p className="mt-3 max-w-md text-muted">
          Cet article n’existe pas, n’est pas encore publié ou a été retiré.
        </p>
        <Button asChild variant="primary" className="mt-8">
          <Link to={PATHS.blog}>
            <ArrowLeft className="size-4" />
            Retour au blog
          </Link>
        </Button>
      </section>
    )
  }

  return (
    <>
      <section className="mx-auto max-w-5xl px-5 pb-12 pt-32 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Link
            to={PATHS.blog}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" />
            Tous les articles
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
          className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent"
        >
          {post.coverImage && (
            <>
              <img
                src={post.coverImage}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/80" />
            </>
          )}
          <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
          <div className="absolute -left-20 -top-20 size-64 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 size-64 rounded-full bg-secondary/20 blur-[100px]" />
          <div className="relative flex min-h-72 flex-col items-center justify-center p-10 text-center sm:p-16">
            <span className="grid size-16 place-items-center rounded-3xl border border-white/15 bg-background/50 shadow-xl shadow-black/30 backdrop-blur-md">
              <Newspaper className="size-8 text-primary" strokeWidth={1.5} />
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} className="px-3 py-1 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <h1 className="mt-5 max-w-3xl font-sora text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <CalendarDays className="size-4 text-primary" />
              {formatPostDate(post.publishedAt)}
            </p>
          </div>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <p className="mb-12 border-l-2 border-primary/40 pl-5 text-lg italic leading-relaxed text-muted">
            {post.excerpt}
          </p>
          <BlogContent content={post.content} />
        </motion.article>
      </section>

      <CtaBanner />
    </>
  )
}
