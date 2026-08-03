import { cloneElement, forwardRef, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110',
  outline:
    'border border-white/15 bg-white/5 text-foreground backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10',
  ghost: 'text-muted hover:bg-white/5 hover:text-foreground',
  danger: 'bg-gradient-to-r from-danger to-danger/80 text-white shadow-lg shadow-danger/25 hover:brightness-110',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { asChild = false, variant = 'primary', size = 'md', className, children, ...props },
  ref,
) {
  const classes = cn(baseClasses, variants[variant], sizes[size], className)

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>
    return cloneElement(child, {
      className: cn(child.props.className, classes),
    })
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {children}
    </button>
  )
})
