import { ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import type { TimelineItem as TimelineItemType } from '@/constants/journey'

interface TimelineProps {
  items: readonly TimelineItemType[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute bottom-4 left-[7px] top-2 w-[2px] rounded-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"
      />
      <div className="space-y-12">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.1}>
            <div className="relative pl-10">
              <span className="absolute left-0 top-1.5 grid size-4 place-items-center rounded-full border border-primary/40 bg-background">
                <span className="size-2 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_10px_#00C2FF]" />
              </span>
              {item.current && (
                <span aria-hidden="true" className="absolute left-0 top-1.5 size-4 animate-ping rounded-full bg-primary/20" />
              )}
              <Badge>{item.period}</Badge>
              <div className="mt-3 flex items-center gap-3">
                {item.logo && (
                  <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white p-1 shadow-lg shadow-black/20">
                    <img
                      src={item.logo}
                      alt={`Logo ${item.title}`}
                      className="h-8 w-auto max-w-8 object-contain"
                      loading="lazy"
                    />
                  </span>
                )}
                <h3 className="font-sora text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
                >
                  {item.subtitle}
                  <ExternalLink className="size-3.5" />
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-primary">{item.subtitle}</p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
