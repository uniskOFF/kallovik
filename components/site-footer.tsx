'use client'

import { useLanguage } from '@/components/language-provider'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  const { t } = useLanguage()

  const nav = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.cases, href: '#cases' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contacts, href: '#contacts' },
  ]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="text-base font-semibold tracking-tight">
                AESBAU <span className="text-muted-foreground">Labs</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.nav}</h4>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">{t.footer.contacts}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>+7 (999) 123-45-67</li>
              <li>hello@aesbau.dev</li>
              <li>@aesbau_labs</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} AESBAU Labs. {t.footer.rights}</span>
          <span>Made with precision · Dark UI · Premium</span>
        </div>
      </div>
    </footer>
  )
}
