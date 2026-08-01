'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const items = t.portfolio.items.map((it, i) => ({ ...it, img: IMAGES[i] }))
  const filters = t.portfolio.filters
  const filtered = active === 0 ? items : items.filter((it) => it.cat === filters[active])

  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-accent/5 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs font-light tracking-[0.3em] text-white/30 uppercase">
                Portfolio
              </span>
            </div>
            <h2 className="text-4xl font-light leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {t.portfolio.title}
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-white/40 sm:text-lg">
              {t.portfolio.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-2 border-b border-white/5 pb-6"
        >
          {filters.map((f, i) => (
            <button
              key={f}
              onClick={() => setActive(i)}
              className={`group relative px-5 py-2.5 text-sm font-light tracking-wide transition-all duration-500 ${
                active === i
                  ? 'text-white'
                  : 'text-white/30 hover:text-white/60'
              }`}
            >
              {f}
              {active === i && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 -z-0 rounded-full bg-white/5"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`group relative overflow-hidden rounded-3xl ${
                  i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0f1a]">
                  <Image
                    src={item.img || '/placeholder.svg'}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-[#05080f]/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                  
                  <div className="absolute inset-0 bg-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <motion.div
                    className="absolute inset-0 border border-white/0 rounded-3xl transition-all duration-700 group-hover:border-white/10"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-2 inline-block rounded-full border border-white/10 px-3 py-1 text-xs font-light text-white/50 backdrop-blur-sm">
                          {item.tag}
                        </div>
                        <h3 className="text-2xl font-light tracking-[-0.02em] text-white">
                          {item.title}
                        </h3>
                      </div>
                      <motion.div
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-white/60 transition-colors duration-500 group-hover:text-white" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-3xl border border-white/0 transition-all duration-700 group-hover:border-white/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}