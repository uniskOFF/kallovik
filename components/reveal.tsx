'use client'

import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'
  type?: 'spring' | 'tween'
  staggerChildren?: number
  staggerDirection?: 'forward' | 'reverse'
  once?: boolean
  amount?: number
  blur?: number
  distance?: number
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  direction = 'up',
  type = 'tween',
  staggerChildren = 0,
  staggerDirection = 'forward',
  once = true,
  amount = 0.15,
  blur = 12,
  distance = 40,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      scale: direction === 'scale' || direction === 'blur' ? 0.92 : 1,
      filter: direction === 'blur' ? `blur(${blur}px)` : 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren,
        staggerDirection: staggerDirection === 'forward' ? 1 : -1,
        delayChildren: delay,
      },
    },
  }

  const springVariants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      scale: direction === 'scale' || direction === 'blur' ? 0.95 : 1,
      filter: direction === 'blur' ? `blur(${blur}px)` : 'blur(0px)',
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren,
        staggerDirection: staggerDirection === 'forward' ? 1 : -1,
        delayChildren: delay,
      },
    },
  }

  const finalVariants = type === 'spring' ? springVariants : variants

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={finalVariants}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

export const Slide = Reveal

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode
  delay?: number
  duration?: number
}) => (
  <Reveal
    direction="blur"
    delay={delay}
    duration={duration}
    blur={8}
    distance={0}
  >
    {children}
  </Reveal>
)

export const ScaleIn = ({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) => (
  <Reveal
    direction="scale"
    delay={delay}
    type="spring"
    duration={0.8}
  >
    {children}
  </Reveal>
)

export const Stagger = ({
  children,
  stagger = 0.1,
  direction = 'up',
  delay = 0,
}: {
  children: ReactNode
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'
  delay?: number
}) => (
  <Reveal
    direction={direction}
    staggerChildren={stagger}
    delay={delay}
    type="spring"
  >
    {children}
  </Reveal>
)

export default Reveal