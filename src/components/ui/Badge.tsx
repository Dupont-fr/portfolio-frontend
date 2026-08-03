import { type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'success' | 'warning' | 'danger'
}

const tones = {
  default: 'border-primary/30 bg-primary/10 text-accent',
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  danger: 'border-danger/30 bg-danger/10 text-danger',
}

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-wide backdrop-blur-sm',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
