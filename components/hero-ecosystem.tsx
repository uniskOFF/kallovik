'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Globe, Bot, Cog, Brain, Rocket, Sparkles, BarChart3, Cloud, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

type FloatCard = {
  icon: LucideIcon
  key: 'websites' | 'bots' | 'automation' | 'ai' | 'cloud' | 'analytics'
  x: number
  y: number
  duration: number
  delay: number
  distance: number
  label: string
}

const CARDS: FloatCard[] = [
  { icon: Globe, key: 'websites', x: 8, y: 18, duration: 7, delay: 0, distance: 16, label: 'Websites' },
  { icon: Bot, key: 'bots', x: 1, y: 48, duration: 8, delay: 1.2, distance: 12, label: 'Bots' },
  { icon: Cog, key: 'automation', x: 10, y: 78, duration: 6.5, delay: 0.6, distance: 14, label: 'Automation' },
  { icon: Brain, key: 'ai', x: 92, y: 18, duration: 7.5, delay: 0.9, distance: 16, label: 'AI' },
  { icon: Cloud, key: 'cloud', x: 99, y: 48, duration: 8.5, delay: 0.3, distance: 12, label: 'Cloud' },
  { icon: BarChart3, key: 'analytics', x: 90, y: 78, duration: 6.8, delay: 1.5, distance: 14, label: 'Analytics' },
]

const CENTER = { x: 50, y: 50 }

export function HeroEcosystem() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { stiffness: 25, damping: 18, mass: 1.2 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(springY, [-1, 1], [8, -8])
  const rotateY = useTransform(springX, [-1, 1], [-8, 8])
  const scale = useTransform(springX, [-1, 1], [1, 1.03])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x * 2 - 1)
      mouseY.set(y * 2 - 1)
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => {
      setIsHovered(false)
      mouseX.set(0)
      mouseY.set(0)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-visible"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        className="relative mx-auto aspect-[4/3] w-full max-w-2xl"
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/8 blur-[120px]" />
          <div className="absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/6 blur-[100px]" />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.12" />
              </linearGradient>
              <linearGradient id="ringGrad2" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            <motion.circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="0.4"
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="url(#ringGrad2)"
              strokeWidth="0.3"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="22"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="0.2"
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />

            {CARDS.map((c) => (
              <motion.line
                key={c.key}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={c.x}
                y2={c.y}
                stroke="url(#ringGrad)"
                strokeWidth="0.15"
                strokeDasharray="1 2"
                initial={{ opacity: 0.05 }}
                animate={{ opacity: [0.05, 0.3, 0.05] }}
                transition={{
                  duration: 4 + c.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-accent/15 blur-3xl" />
              <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-2xl" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-light tracking-[0.2em] text-white/50">
                  AESBAU
                </span>
              </div>
            </div>
          </motion.div>

          {CARDS.map((c) => {
            const Icon = c.icon
            const isLeft = c.x < 50
            return (
              <motion.div
                key={c.key}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                animate={{
                  y: [
                    0,
                    -(c.distance / 2),
                    0,
                    c.distance / 2,
                    0,
                  ],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                whileHover={{
                  scale: 1.12,
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="group relative overflow-visible"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `perspective(800px) rotateY(${isLeft ? '10deg' : '-10deg'})`,
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-6 rounded-2xl bg-accent/15 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute -inset-4 rounded-2xl bg-purple-500/10 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
                    <div className="glass relative flex items-center gap-2.5 rounded-2xl border border-white/[0.06] px-4 py-3 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.15)]">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-500 group-hover:bg-accent/20 group-hover:text-white">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="whitespace-nowrap text-sm font-light text-white/80">
                        {t.hero.cards[c.key]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <div className="mt-8 lg:hidden">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CARDS.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.key}
                className="glass flex items-center gap-2 rounded-2xl border border-white/[0.04] px-3 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-light leading-tight text-white/70">
                  {t.hero.cards[c.key]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}