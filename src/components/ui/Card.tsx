import { type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'glass rounded-3xl shadow-2xl shadow-black/20 transition-all duration-500',
        hover &&
          'hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-primary/10 hover:shadow-2xl',
        className,
      )}
      {...props}
    />
  )
}
