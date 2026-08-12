import { useQuery } from '@tanstack/react-query'
import { Loader2, Newspaper } from 'lucide-react'
import { BlogCard } from '@/components/blog/BlogCard'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { PageHero } from '@/components/PageHero'
import { fetchPublicBlogPosts } from '@/services/public'
import { usePageMeta } from '@/hooks/usePageMeta'

export function BlogPage() {
  usePageMeta(
    'Blog',
    'Mes articles et retours d’expérience autour du développement web, de l’architecture et des bonnes pratiques.',
  )

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['public', 'blog'],
    queryFn: fetchPublicBlogPosts,
    staleTime: 60_000,
  })

  return (
    <>
      <PageHero
        eyebrow="Articles"
        icon={<Newspaper className="size-3.5" />}
        title={
          <>
            Blog
            <span className="text-gradient">.</span>
          </>
        }
        description="Mes réflexions et retours d’expérience autour du développement web, de l’architecture et des bonnes pratiques."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="glass flex h-64 flex-col items-center justify-center gap-4 text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-white/5">
              <Newspaper className="size-8 text-muted/60" />
            </span>
            <p className="max-w-sm text-sm text-muted">
              Aucun article publié pour le moment. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </section>

      <CtaBanner />
    </>
  )
}
