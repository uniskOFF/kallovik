'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { UserCog, GitBranch, MessageCircle, LineChart, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const ICONS: LucideIcon[] = [UserCog, GitBranch, MessageCircle, LineChart]

const stats = [
  { value: '120+', label: 'Проектов' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '24/7', label: 'Поддержка' },
  { value: '4+', label: 'Года на рынке' },
]

export function About() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#05080f] py-32 sm:py-40"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[180px]" />
        <div className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[160px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[400px] w-[400px] rounded-full bg-cyan-500/4 blur-[160px]" />
        <div className="absolute left-[40%] top-[5%] h-[200px] w-[200px] rounded-full bg-indigo-500/6 blur-[120px]" />
        <div className="absolute right-[35%] bottom-[5%] h-[200px] w-[200px] rounded-full bg-blue-500/6 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs font-light tracking-[0.3em] text-white/30 uppercase">
                {t.about.label}
              </span>
            </div>
            <h2 className="max-w-3xl text-4xl font-light leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {t.about.title}
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="absolute -top-8 -left-4 text-8xl font-light text-white/5">
                "
              </span>
              <p className="relative text-2xl font-light leading-[1.4] tracking-[-0.01em] text-white/70 sm:text-3xl lg:text-4xl">
                {t.about.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p className="text-base leading-relaxed text-white/40 sm:text-lg">
                {t.about.subtitle}
              </p>
            </motion.div>
          </div>

          <div className="space-y-8">
            {t.about.items.map((item, i) => {
              const Icon = ICONS[i]
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-5 rounded-2xl border border-white/[0.04] p-6 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.02]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/40 transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white/80">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light tracking-[-0.01em] text-white/90">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/40">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 gap-8 border-t border-white/5 pt-16 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-light tracking-tight text-white sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-light tracking-wide text-white/30">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}