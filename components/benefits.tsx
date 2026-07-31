'use client'

import { TrendingUp, Award, Clock, Maximize2, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { motion } from 'motion/react'

const ICONS: LucideIcon[] = [TrendingUp, Award, Clock, Maximize2]

// Компонент с анимациями для иконок
const AnimatedIcon = ({ 
  icon: Icon, 
  index 
}: { 
  icon: LucideIcon, 
  index: number 
}) => {
  // Анимация для иконки "Рост продаж" (TrendingUp)
  if (Icon === TrendingUp) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent overflow-hidden">
        <motion.div
          className="flex items-center justify-center"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
    )
  }

  // Анимация для иконки "Репутация" (Award)
  if (Icon === Award) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <motion.div
          className="flex items-center justify-center"
          animate={{
            rotate: [0, 8, -6, 4, -2, 0],
          }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
    )
  }

  // Анимация для иконки "Экономия времени" (Clock)
  if (Icon === Clock) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
        <motion.div
          className="flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
    )
  }

  // Анимация для иконки "Масштабирование" (Maximize2)
  if (Icon === Maximize2) {
    return (
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent overflow-visible"
        animate={{
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <motion.div
          className="flex items-center justify-center"
          animate={{
            rotate: [0, 0, 0],
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </motion.div>
    )
  }

  // По умолчанию
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
      <Icon className="h-6 w-6" />
    </div>
  )
}

export function Benefits() {
  const { t } = useLanguage()

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {t.benefits.title}
            </h2>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {t.benefits.subtitle}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.benefits.items.map((item, i) => {
              const Icon = ICONS[i]
              return (
                <Reveal key={item.title} delay={(i % 2) * 0.1}>
                  <div className="h-full rounded-2xl border border-border bg-glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                    <AnimatedIcon icon={Icon} index={i} />
                    <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}