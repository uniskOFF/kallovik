'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Globe, Bot, Cog, Brain, Rocket, Sparkles, ArrowRight, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const ICONS: LucideIcon[] = [Globe, Bot, Cog, Brain, Rocket, Sparkles]

const IconWithAnimation = ({
  icon: Icon,
  isExpanded,
}: {
  icon: LucideIcon,
  isExpanded: boolean,
}) => {
  const iconSize = "h-5 w-5"

  if (Icon === Rocket) {
    return (
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-white/80 overflow-visible transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]">
        <motion.div
          className="flex items-center justify-center"
          initial={{ y: 0, opacity: 1 }}
          animate={isExpanded ? { y: -40, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Icon className={iconSize} />
        </motion.div>
      </div>
    )
  }

  if (Icon === Cog) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]">
        <motion.div
          className="flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={isExpanded ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, ease: "linear", repeat: isExpanded ? Infinity : 0 }}
        >
          <Icon className={iconSize} />
        </motion.div>
      </div>
    )
  }

  if (Icon === Brain) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]">
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={isExpanded ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], repeat: isExpanded ? Infinity : 0 }}
        >
          <Icon className={iconSize} />
        </motion.div>
      </div>
    )
  }

  if (Icon === Globe) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]">
        <motion.div
          className="flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={isExpanded ? { rotate: [0, 8, -8, 5, -5, 0] } : { rotate: 0 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], repeat: isExpanded ? Infinity : 0 }}
        >
          <Icon className={iconSize} />
        </motion.div>
      </div>
    )
  }

  if (Icon === Bot) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]">
        <motion.div
          className="flex items-center justify-center"
          initial={{ rotate: 0 }}
          animate={isExpanded ? { rotate: [0, 12, -10, 8, -6, 0] } : { rotate: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], repeat: isExpanded ? Infinity : 0 }}
        >
          <Icon className={iconSize} />
        </motion.div>
      </div>
    )
  }

  if (Icon === Sparkles) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]">
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 1, rotate: 0 }}
          animate={isExpanded ? { scale: [1, 1.12, 0.88, 1], rotate: [0, 15, -15, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], repeat: isExpanded ? Infinity : 0 }}
        >
          <Icon className={iconSize} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm text-white/80 transition-all duration-500 group-hover:bg-white/10 group-hover:shadow-[0_0_30px_-8px_rgba(59,130,246,0.15)]">
      <Icon className={iconSize} />
    </div>
  )
}

export function Services() {
  const { t } = useLanguage()
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="services" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-accent/5 blur-[180px]" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/4 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
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
                {t.services.label}
              </span>
            </div>
            <h2 className="text-4xl font-light leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {t.services.title}
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-white/40 sm:text-lg">
              {t.services.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i]
            const isExpanded = expandedIndex === i
            const isOdd = i % 2 === 1

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1]
                }}
                viewport={{ once: true }}
                className={`relative ${isOdd ? 'lg:mt-12' : ''}`}
              >
                <motion.div
                  className="group relative flex h-full min-h-[280px] flex-col rounded-3xl border border-white/[0.06] bg-white/[0.025] p-8 backdrop-blur-sm transition-all duration-700 hover:-translate-y-2 hover:border-accent/30 hover:bg-white/[0.04] hover:shadow-[0_20px_80px_-20px_rgba(59,130,246,0.08)] sm:p-10"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4 }}
                  onMouseLeave={() => {
                    if (isExpanded) toggleExpand(i)
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/0 via-accent/0 to-purple-500/0 opacity-0 transition-opacity duration-700 group-hover:from-accent/5 group-hover:to-purple-500/5 group-hover:opacity-100" />

                  <div className="absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06), rgba(34,211,238,0.03))',
                  }} />

                  <div className="relative flex flex-1 flex-col">
                    <div className="flex items-start justify-between">
                      <IconWithAnimation
                        icon={Icon}
                        isExpanded={isExpanded}
                      />
                      <span className="text-7xl font-light text-white/5 transition-colors duration-700 group-hover:text-white/10">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-light tracking-[-0.02em] text-white/90 transition-colors duration-700 group-hover:text-white sm:text-2xl">
                      {item.title}
                    </h3>

                    <div className="mt-3 h-px w-10 bg-white/10 transition-all duration-700 group-hover:w-14 group-hover:bg-accent/30" />

                    <div className="mt-4 flex-1">
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            key="tip"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                              {item.tip}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="desc"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <p className="text-sm leading-relaxed text-white/45 transition-colors duration-700 group-hover:text-white/60 sm:text-base">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => toggleExpand(i)}
                      className={`mt-6 flex items-center gap-2 text-sm font-light transition-all duration-500 sm:mt-8 ${
                        isExpanded
                          ? 'text-white/30 hover:text-white/60'
                          : 'text-white/40 hover:text-white/80'
                      }`}
                      whileHover={{ x: isExpanded ? 0 : 4 }}
                    >
                      {isExpanded ? (
                        'Свернуть'
                      ) : (
                        <>
                          Узнать больше
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>

                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/5 blur-[100px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}