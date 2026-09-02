import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CalendarDays, Newspaper } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { BlogItem } from '@/services/admin'
import { PATHS } from '@/routes/paths'
import { isVideoUrl } from '@/utils/media'

interface BlogCardProps {
  post: BlogItem
  index?: number
}

function formatPostDate(value?: string | null): string {
  if (!value) return ''
  const iso = value.length === 10 ? `${value}T00:00:00Z` : value
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(iso),
  )
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link
        to={PATHS.article(post.slug)}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="glass relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10">
          {post.coverImage ? (
            <div className="relative h-44 overflow-hidden">
              {isVideoUrl(post.coverImage) ? (
                <video
                  src={post.coverImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={post.coverImage}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>
          ) : (
            <div className="relative grid h-44 place-items-center overflow-hidden bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent">
              <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
              <div className="relative grid size-16 place-items-center rounded-2xl border border-white/15 bg-background/50 shadow-xl shadow-black/30 backdrop-blur-md transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                <Newspaper className="size-8 text-primary" strokeWidth={1.5} />
              </div>
            </div>
          )}

          <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/15 bg-background/50 text-muted opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="size-4 text-accent" />
          </span>

          <div className="flex flex-1 flex-col p-6">
            <div className="flex items-center gap-2 text-xs text-muted">
              <CalendarDays className="size-3.5 text-primary" />
              <span>{formatPostDate(post.publishedAt)}</span>
            </div>
            <h3 className="mt-3 font-sora text-lg font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
            {post.tags && post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <li key={tag}>
                    <Badge className="px-2.5 py-1 text-[11px]">{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
