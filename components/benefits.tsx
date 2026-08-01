'use client'

import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { TrendingUp, Award, Clock, Maximize2, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const ICONS: LucideIcon[] = [TrendingUp, Award, Clock, Maximize2]

const AnimatedIcon = ({ 
  icon: Icon, 
  index 
}: { 
  icon: LucideIcon, 
  index: number 
}) => {
  if (Icon === TrendingUp) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white/90">
        <motion.div
          className="flex items-center justify-center"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
    )
  }

  if (Icon === Award) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white/90">
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

  if (Icon === Clock) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white/90">
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

  if (Icon === Maximize2) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white/90">
        <motion.div
          className="flex items-center justify-center"
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/60">
      <Icon className="h-6 w-6" />
    </div>
  )
}

export function Benefits() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative overflow-hidden bg-[#05080f] py-32 sm:py-40"
    >
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[180px]" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/4 blur-[160px]" />
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
                {t.benefits.label}
              </span>
            </div>
            <h2 className="max-w-3xl text-4xl font-light leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {t.benefits.title}
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.benefits.items.map((item, i) => {
            const Icon = ICONS[i]
            const isOdd = i % 2 === 1

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className={`relative ${isOdd ? 'lg:mt-12' : ''}`}
              >
                <motion.div
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.04] bg-white/[0.02] p-8 transition-all duration-700 hover:border-white/10 hover:bg-white/[0.04] hover:shadow-[0_0_60px_-20px_rgba(255,255,255,0.03)]"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/5 blur-[100px] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06), rgba(34,211,238,0.03))',
                  }} />

                  <div className="relative flex flex-col">
                    <div className="flex items-start justify-between">
                      <AnimatedIcon icon={Icon} index={i} />
                      <span className="text-6xl font-light text-white/5 transition-colors duration-500 group-hover:text-white/10">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-light tracking-[-0.02em] text-white/90">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-white/40">
                      {item.desc}
                    </p>
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