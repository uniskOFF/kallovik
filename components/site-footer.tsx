'use client'

import { motion } from 'motion/react'
import { useLanguage } from '@/components/language-provider'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  const { t } = useLanguage()

  const nav = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.cases, href: '#cases' },
    { label: t.nav.contacts, href: '#contacts' },
  ]

  const contactItems = [
    { label: 'Телефон', value: '+7 (999) 123-45-67' },
    { label: 'Email', value: 'hello@aesbau.dev' },
    { label: 'Telegram', value: '@aesbau_labs' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.04] bg-[#05080f]">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[180px]" />
        <div className="absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[160px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[300px] w-[300px] rounded-full bg-cyan-500/4 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <span className="text-lg font-light tracking-tight text-white/90">
                AESBAU <span className="text-white/40">Labs</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/40">
              {t.footer.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-sm font-light tracking-[0.2em] text-white/30 uppercase">
              {t.footer.nav}
            </h4>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm font-light text-white/40 transition-all duration-300 hover:text-white/80 hover:pl-1"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-sm font-light tracking-[0.2em] text-white/30 uppercase">
              {t.footer.contacts}
            </h4>
            <ul className="space-y-3">
              {contactItems.map((item) => (
                <li key={item.label}>
                  <span className="text-sm font-light text-white/30">
                    {item.label}
                  </span>
                  <span className="ml-2 text-sm font-light text-white/60">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-sm font-light tracking-[0.2em] text-white/30 uppercase">
              Связаться
            </h4>
            <motion.a
              href="#contacts"
              className="group inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-3 text-sm font-light text-white/60 transition-all duration-500 hover:border-white/30 hover:bg-white/5 hover:text-white/90 hover:shadow-[0_0_40px_-12px_rgba(255,255,255,0.05)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Оставить заявку
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-8 sm:flex-row"
        >
          <span className="text-xs font-light text-white/20">
            © {new Date().getFullYear()} AESBAU Labs. {t.footer.rights}
          </span>
          <div className="flex items-center gap-6">
            <span className="text-xs font-light text-white/20">
              Made with precision
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-xs font-light text-white/20">
              Dark UI · Premium
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}