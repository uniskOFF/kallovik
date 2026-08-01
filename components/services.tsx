'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Globe, Bot, Cog, Brain, Rocket, Sparkles, ArrowRight, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

const ICONS: LucideIcon[] = [Globe, Bot, Cog, Brain, Rocket, Sparkles]

// Компонент иконки с анимацией — все строго одинакового размера
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80 overflow-visible">
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80">
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80">
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80">
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80">
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80">
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
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/80">
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

  const handleMouseLeave = () => {
    setExpandedIndex(null)
  }

  return (
    <section id="services" className="relative py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-accent/5 blur-[180px]" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[160px]" />
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
                Services
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  className={`group relative h-full overflow-hidden rounded-3xl border transition-all duration-700 ${
                    isExpanded
                      ? 'border-white/20 bg-white/[0.04] shadow-[0_0_80px_-20px_rgba(255,255,255,0.04)]'
                      : 'border-white/[0.04] bg-white/[0.02] hover:border-white/10 hover:shadow-[0_0_60px_-20px_rgba(255,255,255,0.03)]'
                  }`}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative flex h-full flex-col p-8 sm:p-10">
                    <div className="flex items-start justify-between">
                      <IconWithAnimation 
                        icon={Icon} 
                        isExpanded={isExpanded}
                      />
                    </div>

                    <h3 className="relative mt-6 text-2xl font-light tracking-[-0.02em] text-white/90">
                      {item.title}
                    </h3>

                    <div className="relative mt-4 flex-1 min-h-[4.5rem] overflow-hidden">
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            key="tip"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0"
                          >
                            <p className="text-base leading-relaxed text-white/60">
                              {item.tip}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="desc"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <p className="text-base leading-relaxed text-white/40">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => toggleExpand(i)}
                      className={`mt-6 flex items-center gap-2 text-sm font-light transition-all duration-500 ${
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