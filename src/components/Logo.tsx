import { Link } from 'react-router-dom'
import { PATHS } from '@/routes/paths'
import { SITE } from '@/constants/site'
import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to={PATHS.home}
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label={SITE.name}
    >
      <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary font-sora text-xs font-bold text-background shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
        {'DD'}
      </span>
      <span className="font-sora text-lg font-semibold tracking-tight text-foreground">
        {SITE.brand}
        <span className="text-primary">.</span>
      </span>
    </Link>
  )
}
