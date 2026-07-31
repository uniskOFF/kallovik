'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Logo } from '@/components/logo'

export function SiteHeader() {
  const { t, lang, toggle } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'services', 'about', 'cases', 'contacts']
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -80px 0px' }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const links = [
    { label: t.nav.home, href: '#home', id: 'home' },
    { label: t.nav.services, href: '#services', id: 'services' },
    { label: t.nav.about, href: '#about', id: 'about' },
    { label: t.nav.cases, href: '#cases', id: 'cases' },
    { label: t.nav.contacts, href: '#contacts', id: 'contacts' },
  ]

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`flex w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-all duration-700 sm:px-6 ${
          scrolled
            ? 'bg-[#070b14]/85 backdrop-blur-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] border border-white/[0.08]'
            : 'bg-[#070b14]/60 backdrop-blur-xl border border-white/[0.04] shadow-[0_4px_30px_-8px_rgba(0,0,0,0.4)]'
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 group">
          <Logo className="h-8 w-8 transition-transform duration-500 group-hover:scale-105" />
          <span className="text-base font-semibold tracking-tight">
            AESBAU <span className="text-muted-foreground">Labs</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => {
            const isActive = activeSection === l.id
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative block px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/90'
                  }`}
                >
                  <span className="relative z-10 tracking-wide">
                    {l.label}
                  </span>
                  
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute -bottom-0.5 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(59,130,246,0.6)]"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="relative flex items-center rounded-lg border border-white/10 px-1 py-1 text-xs font-medium overflow-hidden"
            aria-label="Switch language"
          >
            <motion.div
              className="absolute inset-0 rounded-lg bg-accent/20"
              layoutId="langActive"
              transition={{ type: 'spring', duration: 0.4 }}
            />
            <span
              className={`relative z-10 rounded-md px-2 py-1 transition-colors duration-300 ${
                lang === 'ru' ? 'text-white' : 'text-white/40'
              }`}
            >
              RU
            </span>
            <span
              className={`relative z-10 rounded-md px-2 py-1 transition-colors duration-300 ${
                lang === 'en' ? 'text-white' : 'text-white/40'
              }`}
            >
              EN
            </span>
          </button>

          <a
            href="#contacts"
            className="hidden rounded-xl bg-gradient-to-r from-accent to-accent-hover px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(59,130,246,0.4)] transition-all duration-500 hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.6)] hover:scale-[1.02] sm:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            onClick={() => setOpen((p) => !p)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 lg:hidden transition-colors hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-4 top-20 rounded-2xl border border-white/10 bg-[#070b14]/95 backdrop-blur-2xl p-4 shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => {
                const isActive = activeSection === l.id
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-accent/20 to-transparent text-white'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  href="#contacts"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-xl bg-gradient-to-r from-accent to-accent-hover px-4 py-3 text-center text-sm font-medium text-white"
                >
                  {t.nav.cta}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}