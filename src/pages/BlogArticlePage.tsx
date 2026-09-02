import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowLeft, CalendarDays, Loader2, Newspaper } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { BlogContent } from '@/components/blog/BlogContent'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { fetchPublicBlogPostBySlug } from '@/services/public'
import { usePageMeta } from '@/hooks/usePageMeta'
import { PATHS } from '@/routes/paths'
import { SITE } from '@/constants/site'
import { isVideoUrl } from '@/utils/media'

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

  usePageMeta(post?.title ?? 'Article', post?.excerpt, { path: slug ? `/blog/${slug}` : '/blog', image: post?.coverImage ?? undefined })

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
            Retour aux actualités
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
          className="mt-8"
        >
          <div className="flex flex-col items-center text-center">
            <span className="grid size-16 place-items-center rounded-3xl border border-white/15 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-md">
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

          {post.coverImage && (
            <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black/30 shadow-2xl shadow-black/40">
              {isVideoUrl(post.coverImage) ? (
                <video
                  src={post.coverImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="mx-auto max-h-[30rem] w-full object-contain"
                />
              ) : (
                <img
                  src={post.coverImage}
                  alt=""
                  loading="lazy"
                  className="mx-auto max-h-[30rem] w-full object-contain"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-primary/20 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <div className="flex w-max animate-marquee-slow items-center bg-background/80 backdrop-blur-md sm:animate-marquee">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      aria-hidden={i === 1}
                      className="flex shrink-0 items-center gap-8 py-3 pr-8 text-sm font-medium text-muted"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{post.excerpt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <BlogContent content={post.content} />
          <ShareButtons
            url={`${SITE.url}/blog/${slug}`}
            title={post.title}
          />
        </motion.article>
      </section>

      <CtaBanner />
    </>
  )
}
