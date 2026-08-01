'use client'

import { motion, useInView, type Variants } from 'motion/react'
import { useRef, type ReactNode, useEffect, useState } from 'react'

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
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const shouldAnimate = once ? isInView : isInView

  const getVariants = (): Variants => {
    const baseHidden = {
      opacity: 0,
      filter: `blur(${blur}px)`,
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }

    const baseVisible = {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }

    const distanceMap = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
      scale: { scale: 0.85 },
      blur: { scale: 0.92 },
    }

    const springConfig = {
      type: 'spring',
      stiffness: 60,
      damping: 25,
      mass: 1,
      delay,
    }

    const tweenConfig = {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }

    const transitionConfig = type === 'spring' ? springConfig : tweenConfig

    const hidden = {
      ...baseHidden,
      ...distanceMap[direction as keyof typeof distanceMap],
      transition: transitionConfig,
    }

    const visible = {
      ...baseVisible,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        ...transitionConfig,
        staggerChildren,
        staggerDirection: staggerDirection === 'forward' ? 1 : -1,
        delayChildren: delay,
      },
    }

    return {
      hidden,
      visible,
    }
  }

  const variants = getVariants()

  const springVariants = {
    hidden: {
      opacity: 0,
      y: distance,
      scale: 0.95,
      filter: `blur(${blur}px)`,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.2,
        delay,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.2,
        delay,
        staggerChildren,
        staggerDirection: staggerDirection === 'forward' ? 1 : -1,
        delayChildren: delay,
      },
    },
  }

  const finalVariants = type === 'spring' ? springVariants : variants

  const shouldStagger = staggerChildren > 0

  if (shouldStagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={shouldAnimate ? 'visible' : 'hidden'}
        variants={finalVariants}
        style={{ willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
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