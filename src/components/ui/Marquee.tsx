import { cn } from '@/utils/cn'

interface MarqueeProps {
  items: readonly string[]
  className?: string
}

export function Marquee({ items, className }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-4 pr-4"
    >
      {items.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-muted transition-colors duration-300 hover:border-primary/40 hover:text-accent"
        >
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={cn(
        'relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]',
        className,
      )}
    >
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
