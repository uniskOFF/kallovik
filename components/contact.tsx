'use client'

import { useState } from 'react'
import { Send, Check, Mail, MessageCircle, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { motion, AnimatePresence } from 'motion/react'

type ContactMethod = 'telegram' | 'whatsapp' | 'email' | null

const contactMethods = [
  { id: 'telegram', label: 'Telegram', icon: Send, placeholder: '@username или номер телефона' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, placeholder: '+7 (___) ___-__-__' },
  { id: 'email', label: 'Email', icon: Mail, placeholder: 'Email' },
]

export function Contact() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod>(null)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    project: '',
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setFormData({ name: '', contact: '', project: '' })
      setSelectedMethod(null)
    }, 4000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === 'contact' && selectedMethod === 'whatsapp') {
      const cleaned = value.replace(/[^0-9+\s\-()]/g, '')
      setFormData({ ...formData, [name]: cleaned })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const selectedMethodData = contactMethods.find(m => m.id === selectedMethod)

  const inputClass =
    'w-full rounded-xl border border-border bg-glass px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30'

  const isFormValid = selectedMethod && formData.name.trim() && formData.contact.trim()

  return (
    <section id="contacts" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[140px]" />
      
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Имя */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  className={inputClass}
                />
              </div>

              {/* Выбор способа связи */}
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Выберите способ связи
                </label>
                <div className="flex flex-wrap gap-2">
                  {contactMethods.map((method) => {
                    const Icon = method.icon
                    const isSelected = selectedMethod === method.id
                    return (
                      <motion.button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id as ContactMethod)}
                        className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                          isSelected
                            ? 'border-accent bg-accent/10 text-accent shadow-[0_0_20px_-8px_rgba(59,130,246,0.2)]'
                            : 'border-border bg-glass text-muted-foreground hover:border-accent/40 hover:text-foreground'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{method.label}</span>
                        {isSelected && (
                          <Check className="h-3 w-3 text-accent" />
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Динамическое поле для контакта */}
              <AnimatePresence mode="wait">
                {selectedMethod && selectedMethodData && (
                  <motion.div
                    key={selectedMethod}
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                      {selectedMethod === 'email' ? 'Email' : 
                       selectedMethod === 'telegram' ? 'Telegram' : 
                       'WhatsApp'}
                    </label>
                    <input
                      type={selectedMethod === 'email' ? 'email' : 'text'}
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder={selectedMethodData.placeholder}
                      className={inputClass}
                      inputMode={selectedMethod === 'whatsapp' ? 'tel' : 'text'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Проект */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
                  {t.contact.project}
                </label>
                <textarea
                  name="project"
                  rows={4}
                  value={formData.project}
                  onChange={handleChange}
                  placeholder="Расскажите подробнее о вашем проекте или задаче"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Кнопка отправки с усиленной пульсацией */}
              <motion.button
                type="submit"
                className={`group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent to-accent-hover px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:shadow-[0_12px_40px_-8px_rgba(59,130,246,0.7)] ${
                  !isFormValid ? 'opacity-50 cursor-not-allowed shadow-none' : ''
                }`}
                whileHover={isFormValid ? { scale: 1.02 } : {}}
                whileTap={isFormValid ? { scale: 0.97 } : {}}
                disabled={!isFormValid}
                animate={
                  isFormValid && !sent
                    ? {
                        scale: [1, 1.03, 1, 1.02, 1],
                        boxShadow: [
                          '0 8px 30px -8px rgba(59,130,246,0.4)',
                          '0 8px 50px -4px rgba(59,130,246,0.7)',
                          '0 8px 30px -8px rgba(59,130,246,0.4)',
                          '0 8px 45px -4px rgba(59,130,246,0.6)',
                          '0 8px 30px -8px rgba(59,130,246,0.4)',
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2.2,
                  repeat: isFormValid && !sent ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <span className="relative flex items-center justify-center gap-2">
                  {sent ? (
                    <>
                      <Check className="h-4 w-4" /> {t.contact.success}
                    </>
                  ) : (
                    <>
                      {t.contact.submit}
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </motion.button>

              {!selectedMethod && (
                <p className="text-center text-xs text-muted-foreground">
                  Выберите способ связи
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}