'use client'

import { motion } from 'motion/react'

export function Logo({ className }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="12"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      
      <motion.rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="11"
        fill="url(#logoGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      <motion.path
        d="M20 9L29 28H24.5L20 18L15.5 28H11L20 9Z"
        fill="#ffffff"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      />

      <motion.circle
        cx="20"
        cy="26.5"
        r="2.2"
        fill="#60A5FA"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.3,
          boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
          transition: { duration: 0.3 },
        }}
      />

      <motion.circle
        cx="20"
        cy="26.5"
        r="8"
        fill="rgba(96, 165, 250, 0.08)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          scale: 1.4,
          opacity: 0.5,
          transition: { duration: 0.4 },
        }}
      />

      <defs>
        <radialGradient id="logoGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#1a2332" />
          <stop offset="100%" stopColor="#0f1728" />
        </radialGradient>
      </defs>
    </motion.svg>
  )
}