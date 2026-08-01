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
    const onScroll = () => setScrolled(window.scrollY > 20)
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={`relative flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3.5 transition-all duration-700 sm:px-7 ${
          scrolled
            ? 'bg-[#070b14]/70 backdrop-blur-2xl shadow-[0_8px_40px_-16px_rgba(0,0,0,0.9)] border border-white/[0.06]'
            : 'bg-[#070b14]/40 backdrop-blur-xl border border-white/[0.04] shadow-[0_4px_30px_-12px_rgba(0,0,0,0.3)]'
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5 group">
          <Logo className="h-8 w-8 transition-transform duration-700 group-hover:scale-105" />
          <span className="text-base font-light tracking-tight text-white/90">
            AESBAU <span className="text-white/40">Labs</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => {
            const isActive = activeSection === l.id
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative block px-4 py-2 text-sm font-light tracking-wide transition-all duration-500 ${
                    isActive
                      ? 'text-white/90'
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute -bottom-0.5 left-1/2 h-[1.5px] w-5 -translate-x-1/2 rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
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
            className="relative flex items-center rounded-lg border border-white/8 px-1 py-1 text-xs font-light tracking-wide overflow-hidden hover:border-white/20 transition-colors duration-300"
            aria-label="Switch language"
          >
            <motion.div
              className="absolute inset-0 rounded-lg bg-white/8"
              layoutId="langActive"
              transition={{ type: 'spring', duration: 0.5 }}
            />
            <span
              className={`relative z-10 rounded-md px-2.5 py-1.5 transition-colors duration-300 ${
                lang === 'ru' ? 'text-white/90' : 'text-white/30'
              }`}
            >
              RU
            </span>
            <span
              className={`relative z-10 rounded-md px-2.5 py-1.5 transition-colors duration-300 ${
                lang === 'en' ? 'text-white/90' : 'text-white/30'
              }`}
            >
              EN
            </span>
          </button>

          <a
            href="#contacts"
            className="hidden rounded-full bg-white/10 px-5 py-2.5 text-sm font-light text-white/90 transition-all duration-500 hover:bg-white/20 hover:shadow-[0_0_40px_-12px_rgba(255,255,255,0.08)] sm:inline-block"
          >
            {t.nav.cta}
          </a>

          <button
            onClick={() => setOpen((p) => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 lg:hidden transition-colors hover:border-white/20 hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-x-4 top-20 rounded-2xl border border-white/8 bg-[#070b14]/92 backdrop-blur-2xl p-5 shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((l) => {
                const isActive = activeSection === l.id
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-sm font-light tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'bg-white/5 text-white/90'
                          : 'text-white/40 hover:text-white/80 hover:bg-white/5'
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
                  className="mt-2 block rounded-full bg-white/10 px-4 py-3 text-center text-sm font-light text-white/90 transition-all duration-300 hover:bg-white/20"
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