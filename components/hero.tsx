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
  const glowRadius = useMotionValue(500)
  const glowPosition = useMotionTemplate`radial-gradient(circle ${glowRadius}px at ${mouseX}px ${mouseY}px, rgba(59, 130, 246, 0.05) 0%, transparent 60%)`

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

      const particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = []
      const count = 60

      for (let i = 0; i < count; i++) {
        const x = (i * 137.5) % width
        const y = (i * 97.3) % height
        const size = 1 + (i % 3) * 0.5
        const speed = 0.2 + (i % 5) * 0.1
        const opacity = 0.1 + (i % 10) * 0.03
        particles.push({ x, y, size, speed, opacity })
      }

      particles.forEach((p, i) => {
        const x = p.x + Math.sin(time * p.speed + i) * 2
        const y = p.y + Math.cos(time * p.speed * 0.7 + i * 0.5) * 2
        const opacity = p.opacity + Math.sin(time * p.speed + i * 0.3) * 0.03

        ctx.beginPath()
        ctx.arc(x, y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity) * 0.4)})`
        ctx.fill()
      })

      time += 0.005
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
              'radial-gradient(ellipse 60% 40% at 20% 30%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 80% 70%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse 40% 20% at 50% 100%, rgba(59,130,246,0.04) 0%, transparent 40%)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.03) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139,92,246,0.02) 0%, transparent 50%)',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 70% 50% at 50% 30%, black 20%, transparent 60%)',
          }}
        />

        <motion.div
          className="absolute inset-0"
          style={{ background: glowPosition }}
        />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[160px]" />
        <div className="absolute left-[5%] top-[15%] h-[300px] w-[300px] rounded-full bg-purple-500/8 blur-[180px]" />
        <div className="absolute right-[5%] bottom-[15%] h-[300px] w-[300px] rounded-full bg-blue-500/8 blur-[180px]" />
        <div className="absolute left-[30%] top-[5%] h-[150px] w-[150px] rounded-full bg-indigo-500/6 blur-[100px]" />
        <div className="absolute right-[25%] bottom-[8%] h-[200px] w-[200px] rounded-full bg-cyan-500/6 blur-[120px]" />

        <div className="absolute top-[10%] right-[15%] h-px w-24 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-[20%] left-[10%] h-px w-20 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute top-[30%] left-[5%] h-12 w-px bg-gradient-to-b from-transparent via-white/6 to-transparent" />
        <div className="absolute bottom-[35%] right-[8%] h-16 w-px bg-gradient-to-b from-transparent via-white/6 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-6xl flex-col justify-center px-6 py-20 sm:px-10 lg:px-14">
        <div className="flex flex-col items-start justify-center">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="relative w-full max-w-4xl"
          >
            <motion.div
              className="absolute -left-6 top-0 h-24 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
              initial={{ height: 0, opacity: 0 }}
              animate={isInView ? { height: 96, opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            />

            <div className="relative space-y-1">
              <motion.div
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                transition={{ duration: 1.2, delay: 0, ease: "easeOut" }}
                className="text-[clamp(2.8rem,8vw,5.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white"
              >
                {t.hero.title1}
              </motion.div>

              <motion.div
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
                transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                className="text-[clamp(2.8rem,8vw,5.5rem)] font-light leading-[1.05] tracking-[-0.03em]"
              >
                <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] bg-[length:300%_300%] bg-clip-text text-transparent animate-gradient-shine">
                  {t.hero.title2}
                </span>
                <motion.span
                  className="absolute inset-0 blur-3xl opacity-15 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] animate-gradient-shine"
                  style={{ backgroundSize: '300% 300%' }}
                  animate={{
                    opacity: [0.08, 0.2, 0.08],
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
                transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                className="text-[clamp(2.2rem,6vw,4.2rem)] font-light leading-[1.05] tracking-[-0.03em] text-white/50"
              >
                {t.hero.title3}
              </motion.div>
            </div>

            <motion.div
              variants={subtitleVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="mt-6 max-w-lg"
            >
              <p className="text-pretty text-base leading-relaxed text-white/40 sm:text-lg">
                {t.hero.subtitle}
              </p>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#contacts"
                className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-medium text-[#05080f] transition-all duration-500 hover:shadow-[0_0_60px_-12px_rgba(255,255,255,0.15)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  {t.hero.primary}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <motion.span
                  className="absolute inset-0 -z-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>

              <motion.a
                href="#cases"
                className="group flex items-center gap-3 rounded-full border border-white/10 px-7 py-3.5 text-sm font-medium text-white/60 transition-all duration-500 hover:border-white/30 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.hero.secondary}
                <motion.span
                  className="h-px w-6 bg-white/20 transition-all duration-300 group-hover:w-10 group-hover:bg-white/60"
                  initial={{ width: 24 }}
                  whileHover={{ width: 40 }}
                />
              </motion.a>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate={isInView ? 'show' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="mt-14 flex items-center gap-12 border-t border-white/5 pt-8"
            >
              {t.hero.stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="group"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: "easeOut" }}
                >
                  <div className="text-2xl font-light tracking-tight text-white sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[10px] tracking-[0.15em] text-white/20 uppercase">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-32 bg-gradient-to-t from-[#05080f] to-transparent"
        style={{ opacity }}
      />

      <motion.div
        className="pointer-events-none absolute right-10 bottom-10 z-20 hidden text-[10px] tracking-[0.2em] text-white/10 uppercase lg:block"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <MousePointer2 className="mx-auto mb-2 h-3.5 w-3.5 opacity-30" />
        Scroll
      </motion.div>
    </section>
  )
}