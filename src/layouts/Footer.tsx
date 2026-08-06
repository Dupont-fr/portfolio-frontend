import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { FOOTER_LINKS } from '@/constants/navigation'
import { PATHS } from '@/routes/paths'
import { SITE, SOCIAL_LINKS } from '@/constants/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{SITE.tagline}</p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  title={social.label}
                  className="group grid size-10 place-items-center rounded-xl text-white shadow-lg shadow-black/20 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{ backgroundColor: social.color }}
                >
                  <social.icon className="size-4.5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sora text-sm font-semibold uppercase tracking-widest text-foreground">
              Navigation
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-1 text-sm text-muted transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sora text-sm font-semibold uppercase tracking-widest text-foreground">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>{SITE.location}</li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors duration-300 hover:text-accent"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors duration-300 hover:text-accent"
                >
                  {SITE.phone}
                </a>
              </li>
              <li>
                <Link
                  to={PATHS.admin.login}
                  className="inline-flex items-center gap-1 text-xs text-muted/70 transition-colors duration-300 hover:text-accent"
                >
                  Espace admin
                  <ArrowUpRight className="size-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-muted/70">
            © {year} {SITE.brand}. Tous droits réservés.
          </p>
          <p className="font-mono text-xs text-muted/50">
            Construit avec React, TypeScript &amp; beaucoup de café
          </p>
        </div>
      </div>
    </footer>
  )
}
