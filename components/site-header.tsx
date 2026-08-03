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
        className={`relative flex w-full max-w-6xl items-center justify-between rounded-xl px-4 py-2.5 transition-all duration-700 sm:px-6 ${
          scrolled
            ? 'bg-[#070b14]/60 backdrop-blur-2xl shadow-[0_8px_40px_-16px_rgba(0,0,0,0.8)] border border-white/[0.05]'
            : 'bg-[#070b14]/30 backdrop-blur-xl border border-white/[0.03]'
        }`}
      >
        <a href="#home" className="flex items-center gap-2 group">
          <Logo className="h-6 w-6 transition-transform duration-700 group-hover:scale-105" />
          <span className="text-sm font-light tracking-tight text-white/70">
            AESBAU <span className="text-white/30">Labs</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => {
            const isActive = activeSection === l.id
            return (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  className={`relative block px-3.5 py-1.5 text-xs font-light tracking-wide transition-all duration-500 ${
                    isActive
                      ? 'text-white/80'
                      : 'text-white/25 hover:text-white/60'
                  }`}
                >
                  <span className="relative z-10">{l.label}</span>
                  
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute -bottom-0.5 left-1/2 h-[1px] w-4 -translate-x-1/2 rounded-full bg-white/60 shadow-[0_0_12px_rgba(255,255,255,0.08)]"
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
            className="relative flex items-center rounded-md border border-white/8 px-1.5 py-1 text-[10px] font-light tracking-wide overflow-hidden hover:border-white/15 transition-colors duration-300"
            aria-label="Switch language"
          >
            <motion.div
              className="absolute inset-0 rounded-md bg-white/6"
              layoutId="langActive"
              transition={{ type: 'spring', duration: 0.5 }}
            />
            <span
              className={`relative z-10 rounded px-2 py-1 transition-colors duration-300 ${
                lang === 'ru' ? 'text-white/80' : 'text-white/20'
              }`}
            >
              RU
            </span>
            <span
              className={`relative z-10 rounded px-2 py-1 transition-colors duration-300 ${
                lang === 'en' ? 'text-white/80' : 'text-white/20'
              }`}
            >
              EN
            </span>
          </button>

          <a
            href="#contacts"
            className="hidden rounded-full bg-white/8 px-4 py-1.5 text-xs font-light text-white/70 transition-all duration-500 hover:bg-white/15 hover:text-white/90 sm:inline-block"
          >
            Оставить заявку
          </a>

          <button
            onClick={() => setOpen((p) => !p)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/8 lg:hidden transition-colors hover:border-white/15 hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-16 rounded-xl border border-white/6 bg-[#070b14]/92 backdrop-blur-2xl p-4 shadow-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-0.5">
              {links.map((l) => {
                const isActive = activeSection === l.id
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-4 py-2.5 text-xs font-light tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'bg-white/6 text-white/80'
                          : 'text-white/25 hover:text-white/60 hover:bg-white/5'
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
                  className="mt-1.5 block rounded-full bg-white/8 px-4 py-2.5 text-center text-xs font-light text-white/70 transition-all duration-300 hover:bg-white/15"
                >
                  Оставить заявку
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}