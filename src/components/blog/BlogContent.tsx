import type { ReactNode } from 'react'
import { isVideoUrl } from '@/utils/media'
import { VideoPlayer } from '@/components/ui/VideoPlayer'

interface BlogContentProps {
  content: string
}

function renderInline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const token = match[0]
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {token.slice(2, -2)}
        </strong>,
      )
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={key++}
          className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.9em] text-accent"
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('[')) {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token)
      if (link) {
        nodes.push(
          <a
            key={key++}
            href={link[2]}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-accent underline-offset-4 transition-colors hover:text-secondary hover:underline"
          >
            {link[1]}
          </a>,
        )
      }
    }
    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

export function BlogContent({ content }: BlogContentProps) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block === '---') {
          return <hr key={index} className="border-white/10" />
        }

        const imageMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(block)
        if (imageMatch) {
          const [, alt, url] = imageMatch
          if (isVideoUrl(url)) {
            return (
              <div key={index} className="my-8">
                <VideoPlayer src={url} />
                {alt && (
                  <p className="mt-2 text-center text-sm text-muted">{alt}</p>
                )}
              </div>
            )
          }
          return (
            <figure key={index} className="my-8">
              <img
                src={url}
                alt={alt || ''}
                loading="lazy"
                className="w-full rounded-2xl border border-white/10"
              />
              {alt && (
                <figcaption className="mt-2 text-center text-sm text-muted">{alt}</figcaption>
              )}
            </figure>
          )
        }

        const videoMatch = /^\[video\]\(([^)]+)\)$/.exec(block)
        if (videoMatch) {
          const [, url] = videoMatch
          return (
            <div key={index} className="my-8">
              <VideoPlayer src={url} />
            </div>
          )
        }

        if (/^#{1,3}\s/.test(block)) {
          const Heading: 'h2' | 'h3' = block.startsWith('### ') ? 'h3' : 'h2'
          const text = block.replace(/^#{1,3}\s+/, '')
          return (
            <Heading
              key={index}
              className={
                Heading === 'h2'
                  ? 'pt-2 font-sora text-2xl font-bold tracking-tight text-foreground sm:text-3xl'
                  : 'pt-2 font-sora text-xl font-semibold tracking-tight text-foreground'
              }
            >
              {renderInline(text)}
            </Heading>
          )
        }

        if (/^[-*]\s/.test(block)) {
          const items = block
            .split('\n')
            .map((line) => line.replace(/^[-*]\s+/, '').trim())
            .filter(Boolean)
          return (
            <ul key={index} className="space-y-2.5">
              {items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3 leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_#00C2FF]" />
                  <span>{renderInline(item)}</span>
                </li>
              ))}
            </ul>
          )
        }

        if (/^\d+\.\s/.test(block)) {
          const items = block
            .split('\n')
            .map((line) => line.replace(/^\d+\.\s+/, '').trim())
            .filter(Boolean)
          return (
            <ol key={index} className="list-decimal space-y-2 pl-5 leading-relaxed text-muted">
              {items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item)}</li>
              ))}
            </ol>
          )
        }

        return (
          <p key={index} className="leading-relaxed text-muted">
            {renderInline(block)}
          </p>
        )
      })}
    </div>
  )
}
