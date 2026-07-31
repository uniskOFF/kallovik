'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Globe, Bot, Cog, Brain, Rocket, Sparkles, Info, X, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

const ICONS: LucideIcon[] = [Globe, Bot, Cog, Brain, Rocket, Sparkles]

// Компонент иконки с анимацией
const IconWithAnimation = ({ 
  icon: Icon, 
  isExpanded,
  index
}: { 
  icon: LucideIcon, 
  isExpanded: boolean,
  index: number 
}) => {
  // Анимации для разных иконок
  const getAnimation = () => {
    // Globe — лёгкое покачивание
    if (Icon === Globe) {
      return {
        animate: isExpanded ? { 
          rotate: [0, 5, -5, 0],
          transition: { duration: 2, ease: "easeInOut", repeat: Infinity }
        } : { rotate: 0 }
      }
    }
    
    // Bot — шевеление антенной
    if (Icon === Bot) {
      return {
        animate: isExpanded ? { 
          rotate: [0, 8, -8, 5, -5, 0],
          transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity }
        } : { rotate: 0 }
      }
    }
    
    // Cog — вращение шестерёнки
    if (Icon === Cog) {
      return {
        animate: isExpanded ? { 
          rotate: 360,
          transition: { duration: 3, ease: "linear", repeat: Infinity }
        } : { rotate: 0 }
      }
    }
    
    // Brain — увеличение мозга внутри кружка
    if (Icon === Brain) {
      return {
        animate: isExpanded ? { 
          scale: [1, 1.2, 1],
          transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity }
        } : { scale: 1 }
      }
    }
    
    // Rocket — просто улетает вверх
    if (Icon === Rocket) {
      return {
        animate: isExpanded ? { 
          y: [0, -50],
          opacity: [1, 0],
          transition: { duration: 1.5, ease: "easeOut" }
        } : { y: 0, opacity: 1 }
      }
    }
    
    // Sparkles — премиальное мерцание
    if (Icon === Sparkles) {
      return {
        animate: isExpanded ? { 
          scale: [1, 1.1, 0.9, 1],
          rotate: [0, 10, -10, 0],
          transition: { duration: 2, ease: "easeInOut", repeat: Infinity }
        } : { scale: 1, rotate: 0 }
      }
    }
    
    return {}
  }

  // Ракета — просто улетает
  if (Icon === Rocket) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent overflow-hidden">
        <motion.div
          className="flex items-center justify-center"
          animate={isExpanded ? {
            y: [0, -50],
            opacity: [1, 0],
            transition: { duration: 1.5, ease: "easeOut" }
          } : { y: 0, opacity: 1 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
    )
  }

  // Планета — простая иконка
  if (Icon === Globe) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <motion.div
          className="flex items-center justify-center"
          animate={isExpanded ? { 
            rotate: [0, 5, -5, 0],
            transition: { duration: 2, ease: "easeInOut", repeat: Infinity }
          } : { rotate: 0 }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
    )
  }

  // Стандартная иконка
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
      <motion.div
        className="flex items-center justify-center"
        {...getAnimation()}
      >
        <Icon className="h-6 w-6" />
      </motion.div>
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
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t.services.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i]
            const isExpanded = expandedIndex === i

            return (
              <Reveal key={item.title} delay={(i % 3) * 0.08}>
                <motion.div
                  className={`group relative h-full overflow-hidden rounded-2xl border transition-all duration-500 ${
                    isExpanded
                      ? 'border-accent/60 bg-accent/5 shadow-[0_0_40px_-12px_rgba(59,130,246,0.3)]'
                      : 'border-border bg-glass hover:-translate-y-1 hover:border-accent/40'
                  }`}
                  layout
                  transition={{ duration: 0.4 }}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative p-6">
                    <div className="flex items-start justify-between">
                      <IconWithAnimation 
                        icon={Icon} 
                        isExpanded={isExpanded}
                        index={i}
                      />

                      <button
                        type="button"
                        onClick={() => toggleExpand(i)}
                        className="relative flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
                        aria-label={isExpanded ? 'Свернуть' : 'Подробнее'}
                      >
                        {isExpanded ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Info className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <h3 className="relative mt-5 text-lg font-semibold transition-colors duration-500">
                      {item.title}
                    </h3>

                    <div className="relative mt-2 min-h-[4rem] overflow-hidden">
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <motion.div
                            key="tip"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-sm leading-relaxed text-white/80">
                              {item.tip}
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="desc"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {item.desc}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => toggleExpand(i)}
                      className={`mt-4 flex items-center gap-1 text-xs font-medium transition-all duration-300 ${
                        isExpanded 
                          ? 'text-muted-foreground hover:text-white' 
                          : 'text-accent hover:text-accent-hover'
                      }`}
                      whileHover={{ x: isExpanded ? 0 : 4 }}
                    >
                      {isExpanded ? (
                        'Свернуть'
                      ) : (
                        <>
                          Подробнее
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}