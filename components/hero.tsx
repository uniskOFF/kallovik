'use client'

import { motion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { HeroEcosystem } from '@/components/hero-ecosystem'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20 sm:pt-32 lg:pt-36">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left */}
        <div className="text-center lg:text-left">
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground lg:mx-0"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            {t.hero.badge}
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            {t.hero.title1}{' '}
            <span className="inline-block bg-gradient-to-r from-accent via-indigo-400 to-purple-400 bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-shine">
              {t.hero.title2}
            </span>{' '}
            {t.hero.title3}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <a
              href="#contacts"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-hover px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(59,130,246,0.5)] transition-all duration-500 hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.7)] hover:scale-[1.02] sm:w-auto"
            >
              {t.hero.primary}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#cases"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-glass px-6 py-3.5 text-sm font-medium text-foreground transition-all duration-500 hover:border-white/30 hover:bg-white/[0.08] hover:shadow-[0_4px_20px_-8px_rgba(255,255,255,0.05)] sm:w-auto"
            >
              {t.hero.secondary}
            </a>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 grid grid-cols-3 gap-4 border-t border-white/5 pt-8"
          >
            {t.hero.stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — старый добрый ноутбук */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroEcosystem />
        </motion.div>
      </div>
    </section>
  )
}