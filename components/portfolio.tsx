'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

const IMAGES = [
  '/cases/portal.png',
  '/cases/bot.png',
  '/cases/crm.png',
  '/cases/ai.png',
  '/cases/shop.png',
  '/cases/analytics.png',
]

export function Portfolio() {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)

  const items = t.portfolio.items.map((it, i) => ({ ...it, img: IMAGES[i] }))
  const filters = t.portfolio.filters
  const filtered =
    active === 0 ? items : items.filter((it) => it.cat === filters[active])

  return (
    <section id="cases" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.portfolio.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.portfolio.subtitle}
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active === i
                  ? 'bg-accent text-white'
                  : 'border border-border bg-glass text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-secondary/50"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.img || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-70" />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <div className="text-xs font-medium text-accent">{item.tag}</div>
                    <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
