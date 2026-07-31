'use client'

import { Globe, Bot, Cog, Brain, Cloud, BarChart3, type LucideIcon } from 'lucide-react'
import { MacBook } from '@/components/macbook'
import { useLanguage } from '@/components/language-provider'

type FloatCard = {
  icon: LucideIcon
  key: 'websites' | 'bots' | 'automation' | 'ai' | 'cloud' | 'analytics'
  x: number
  y: number
  duration: number
  delay: number
  distance: number
}

// Symmetric composition: 3 anchors on the left, 3 on the right of the laptop.
const CARDS: FloatCard[] = [
  { icon: Globe, key: 'websites', x: 9, y: 20, duration: 7, delay: 0, distance: -12 },
  { icon: Bot, key: 'bots', x: 2, y: 50, duration: 8, delay: 1.2, distance: -9 },
  { icon: Cog, key: 'automation', x: 11, y: 80, duration: 6.5, delay: 0.6, distance: -11 },
  { icon: Brain, key: 'ai', x: 91, y: 20, duration: 7.5, delay: 0.9, distance: -12 },
  { icon: Cloud, key: 'cloud', x: 98, y: 50, duration: 8.5, delay: 0.3, distance: -8 },
  { icon: BarChart3, key: 'analytics', x: 89, y: 80, duration: 6.8, delay: 1.5, distance: -10 },
]

const CENTER = { x: 50, y: 50 }

export function HeroEcosystem() {
  const { t } = useLanguage()

  return (
    <div className="relative w-full">
      {/* ---------- Desktop ecosystem ---------- */}
      <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-2xl lg:block">
        {/* connecting lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {CARDS.map((c) => (
            <line
              key={c.key}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={c.x}
              y2={c.y}
              stroke="url(#lineGrad)"
              strokeWidth="0.25"
              strokeDasharray="1.2 2"
              className="animate-pulse-line"
              style={{ animationDelay: `${c.delay}s` }}
            />
          ))}
        </svg>

        {/* ambient accent glow behind laptop */}
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]" />

        {/* laptop centered */}
        <div className="absolute left-1/2 top-1/2 w-[62%] -translate-x-1/2 -translate-y-1/2 animate-float [--float-distance:-7px] [--float-duration:8s]">
          <MacBook />
        </div>

        {/* floating cards */}
        {CARDS.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.key}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
            >
              <div
                className="animate-float"
                style={
                  {
                    '--float-duration': `${c.duration}s`,
                    '--float-delay': `${c.delay}s`,
                    '--float-distance': `${c.distance}px`,
                  } as React.CSSProperties
                }
              >
                <div className="glass flex items-center gap-2.5 rounded-2xl px-4 py-3 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:scale-[1.05]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="whitespace-nowrap text-sm font-medium">
                    {t.hero.cards[c.key]}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        <div className="relative mx-auto max-w-md">
          <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[90px]" />
          <div className="relative animate-float [--float-distance:-6px]">
            <MacBook />
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-3 sm:grid-cols-3">
          {CARDS.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.key}
                className="glass flex items-center gap-2 rounded-2xl px-3 py-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium leading-tight">{t.hero.cards[c.key]}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
