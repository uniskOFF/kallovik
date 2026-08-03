'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, useInView } from 'motion/react'
import { ArrowRight, MousePointer2 } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { useRef, useEffect, useState } from 'react'

export function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 50, damping: 30, mass: 0.8 }
  const scrollY = useSpring(scrollYProgress, springConfig)
  const y = useTransform(scrollY, [0, 1], [0, 200])
  const opacity = useTransform(scrollY, [0, 0.4], [1, 0])
  const scale = useTransform(scrollY, [0, 0.4], [1, 0.95])
  const blur = useTransform(scrollY, [0, 0.4], [0, 6])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowRadius = useMotionValue(600)
  const glowPosition = useMotionTemplate`radial-gradient(circle ${glowRadius}px at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.04) 30%, transparent 70%)`

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        mouseX.set(x)
        mouseY.set(y)
        setMousePosition({ x: x / rect.width, y: y / rect.height })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * devicePixelRatio
        canvas.height = rect.height * devicePixelRatio
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
        ctx.scale(devicePixelRatio, devicePixelRatio)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    const drawParticles = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const width = rect.width
      const height = rect.height

      ctx.clearRect(0, 0, width, height)

      const particles: { x: number; y: number; size: number; speed: number; opacity: number; color: string }[] = []
      const count = 60

      const colors = [
        'rgba(59, 130, 246, 0.3)',
        'rgba(139, 92, 246, 0.2)',
        'rgba(34, 211, 238, 0.15)',
        'rgba(96, 165, 250, 0.2)',
      ]

      for (let i = 0; i < count; i++) {
        const x = (i * 137.5 + Math.random() * 20) % width
        const y = (i * 97.3 + Math.random() * 20) % height
        const size = 0.5 + (i % 4) * 0.5
        const speed = 0.08 + (i % 5) * 0.05
        const opacity = 0.03 + (i % 10) * 0.03
        const color = colors[i % colors.length]
        particles.push({ x, y, size, speed, opacity, color })
      }

      particles.forEach((p, i) => {
        const x = p.x + Math.sin(time * p.speed + i * 0.7) * 3
        const y = p.y + Math.cos(time * p.speed * 0.7 + i * 0.5) * 3
        const opacity = p.opacity + Math.sin(time * p.speed + i * 0.3) * 0.02

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('0.', `${Math.max(0.01, Math.min(0.3, opacity))}.`)
        ctx.fill()
      })

      time += 0.002
      animationId = requestAnimationFrame(drawParticles)
    }

    drawParticles()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0 },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 40, rotateX: 15 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#05080f]"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <motion.div
        style={{ opacity, scale, y, filter: `blur(${blur}px)` }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[#05080f]" />

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 40% 20%, rgba(59,130,246,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 70% 80%, rgba(139,92,246,0.08) 0%, transparent 50%), radial-gradient(ellipse 40% 20% at 50% 100%, rgba(34,211,238,0.04) 0%, transparent 40%)',
          }}
        />

        <motion.div
          className="absolute inset-0"
          style={{ background: glowPosition }}
        />

        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-[200px]" />
        <div className="absolute left-[10%] top-[15%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[200px]" />
        <div className="absolute right-[10%] bottom-[15%] h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[200px]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-14">
        <div className="flex flex-col items-start justify-center max-w-4xl">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full"
          >
            <motion.div
              className="absolute -left-6 top-0 h-20 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
              initial={{ height: 0, opacity: 0 }}
              animate={isInView ? { height: 80, opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="relative space-y-2">
              <motion.div
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                transition={{ duration: 1.2, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,9vw,6.5rem)] font-light leading-[1.05] tracking-[-0.04em] text-white"
              >
                {t.hero.title1}
              </motion.div>

              <motion.div
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3rem,9vw,6.5rem)] font-light leading-[1.05] tracking-[-0.04em]"
              >
                <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22d3ee] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-shine">
                  {t.hero.title2}
                </span>
                <motion.span
                  className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#22d3ee] animate-gradient-shine"
                  style={{ backgroundSize: '300% 300%' }}
                  animate={{
                    opacity: [0.08, 0.25, 0.08],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              <motion.div
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(2.4rem,7vw,5rem)] font-light leading-[1.05] tracking-[-0.04em] text-white/40"
              >
                {t.hero.title3}
              </motion.div>
            </div>

            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-md"
            >
              <p className="text-base font-light leading-relaxed text-white/35 sm:text-lg">
                {t.hero.subtitle}
              </p>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#contacts"
                className="group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium text-white bg-accent transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.4)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {t.hero.primary}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <motion.span
                  className="absolute inset-0 -z-0 bg-gradient-to-r from-accent/0 via-white/15 to-accent/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>

              <motion.a
                href="#cases"
                className="group flex items-center gap-3 text-sm font-light text-white/40 transition-all duration-500 hover:text-white/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.hero.secondary}
                <motion.span
                  className="h-px w-6 bg-white/15 transition-all duration-300 group-hover:w-10 group-hover:bg-white/40"
                  initial={{ width: 24 }}
                  whileHover={{ width: 40 }}
                />
              </motion.a>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 flex items-center gap-12 border-t border-white/5 pt-8"
            >
              {t.hero.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <span className="text-2xl font-light tracking-tight text-white sm:text-3xl">
                    {s.value}
                  </span>
                  <span className="mt-0.5 text-[10px] font-light tracking-[0.1em] text-white/20 uppercase">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-48 bg-gradient-to-t from-[#05080f] via-[#05080f]/80 to-transparent"
        style={{ opacity }}
      />

      <motion.div
        className="pointer-events-none absolute right-10 bottom-10 z-20 hidden text-[10px] font-light tracking-[0.2em] text-white/8 uppercase lg:block"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <MousePointer2 className="mx-auto mb-2 h-3 w-3 opacity-30" />
        Scroll
      </motion.div>
    </section>
  )
}