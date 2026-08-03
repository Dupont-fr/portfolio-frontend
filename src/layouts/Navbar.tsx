import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/Button'
import { NAV_LINKS } from '@/constants/navigation'
import { SITE } from '@/constants/site'
import { PATHS } from '@/routes/paths'
import { cn } from '@/utils/cn'

const EASE = [0.22, 1, 0.36, 1] as const

function DesktopLink({ to, label, isLast }: { to: string; label: string; isLast: boolean }) {
  return (
    <li>
      <NavLink
        to={to}
        end={to === PATHS.home}
        className={({ isActive }) =>
          cn(
            'group relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors duration-300',
            isActive ? 'text-accent' : 'text-muted hover:text-foreground',
          )
        }
      >
        {({ isActive }) => (
          <>
            {label}
            <span
              className={cn(
                'absolute inset-x-4 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-primary to-secondary transition-transform duration-300 group-hover:scale-x-100',
                isActive && 'scale-x-100',
              )}
            />
            {isLast && <ArrowUpRight className="ml-1 size-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}
          </>
        )}
      </NavLink>
    </li>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/5 bg-background/70 shadow-lg shadow-black/10 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link, index) => (
            <DesktopLink
              key={link.to}
              to={link.to}
              label={link.label}
              isLast={index === NAV_LINKS.length - 1}
            />
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild variant="primary" size="sm">
            <NavLink to={PATHS.contact}>
              Contact
              <ArrowUpRight className="size-4" />
            </NavLink>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground backdrop-blur-sm transition-colors hover:border-primary/40 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden border-b border-white/5 bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <ul className="space-y-1 px-6 py-6">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.35, ease: EASE }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-xl px-4 py-3 font-sora text-base font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-accent'
                          : 'text-muted hover:bg-white/5 hover:text-foreground',
                      )
                    }
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 opacity-40" />
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.35 }}
                className="pt-4"
              >
                <Button asChild variant="primary" className="w-full">
                  <NavLink to={PATHS.contact} onClick={() => setOpen(false)}>
                    Me contacter
                    <ArrowUpRight className="size-4" />
                  </NavLink>
                </Button>
              </motion.li>
            </ul>
            <div className="border-t border-white/5 px-8 py-5">
              <p className="text-xs text-muted">{SITE.availability}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
