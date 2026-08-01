'use client'

import { motion, useInView } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur'
  staggerChildren?: number
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
  staggerChildren = 0,
  once = true,
  amount = 0.15,
  blur = 12,
  distance = 40,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const getTransform = () => {
    if (direction === 'up') return `translateY(${distance}px)`
    if (direction === 'down') return `translateY(-${distance}px)`
    if (direction === 'left') return `translateX(${distance}px)`
    if (direction === 'right') return `translateX(-${distance}px)`
    if (direction === 'scale' || direction === 'blur') return `scale(0.92)`
    return 'none'
  }

  const hiddenStyles = {
    opacity: 0,
    transform: getTransform(),
    filter: direction === 'blur' ? `blur(${blur}px)` : 'none',
  }

  const visibleStyles = {
    opacity: 1,
    transform: 'none',
    filter: 'none',
  }

  const variants = {
    hidden: hiddenStyles,
    visible: visibleStyles,
  }

  const transition = {
    duration,
    delay,
    ease: [0.16, 1, 0.3, 1],
    staggerChildren,
    delayChildren: delay,
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}

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
  >
    {children}
  </Reveal>
)

export default Reveal