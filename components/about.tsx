'use client'

import { UserCog, GitBranch, MessageCircle, LineChart, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'

const ICONS: LucideIcon[] = [UserCog, GitBranch, MessageCircle, LineChart]

export function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.about.title}
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            {t.about.subtitle}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.about.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-secondary/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                  <div className="mb-5 text-4xl font-semibold text-white/10 transition-colors group-hover:text-accent/30">
                    0{i + 1}
                  </div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
