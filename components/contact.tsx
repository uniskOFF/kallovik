'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, Check, Mail, MessageCircle, Sparkles, type LucideIcon } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

type ContactMethod = 'telegram' | 'whatsapp' | 'email' | null

const contactMethods = [
  { id: 'telegram', label: 'Telegram', icon: Send, placeholder: '@username' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, placeholder: '+7 (___) ___-__-__' },
  { id: 'email', label: 'Email', icon: Mail, placeholder: 'Email' },
]

export function Contact() {
  const { t, lang } = useLanguage()
  const [sent, setSent] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<ContactMethod>(null)
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    project: '',
  })
  const [focused, setFocused] = useState<string | null>(null)

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
  const isFormValid = selectedMethod && formData.name.trim() && formData.contact.trim()

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/20 transition-all duration-300 focus:outline-none ${
      focused === field
        ? 'border-white/30 shadow-[0_0_30px_-12px_rgba(255,255,255,0.05)]'
        : 'border-white/10 hover:border-white/20'
    }`

  return (
    <section id="contacts" className="relative overflow-hidden bg-[#05080f] py-32 sm:py-40">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[180px]" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/4 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-white/20" />
              <span className="text-xs font-light tracking-[0.3em] text-white/30 uppercase">
                {t.contact.label}
              </span>
            </div>
            <h2 className="max-w-3xl text-4xl font-light leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {t.contact.title}
            </h2>
            <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-white/40 sm:text-lg">
              {t.contact.subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm sm:p-12">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/5 blur-[120px]" />
            <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-purple-500/5 blur-[120px]" />
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/4 blur-[120px]" />

            <form onSubmit={onSubmit} className="relative space-y-6">
              <div>
                <label className="mb-2 block text-sm font-light text-white/40">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder={t.contact.namePlaceholder}
                  className={inputClass('name')}
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-light text-white/40">
                  {t.contact.selectMethod}
                </label>
                <div className="flex flex-wrap gap-3">
                  {contactMethods.map((method) => {
                    const Icon = method.icon
                    const isSelected = selectedMethod === method.id
                    return (
                      <motion.button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id as ContactMethod)}
                        className={`relative flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm font-light transition-all duration-500 ${
                          isSelected
                            ? 'border-white/30 bg-white/10 text-white shadow-[0_0_40px_-12px_rgba(255,255,255,0.05)]'
                            : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{method.label}</span>
                        {isSelected && (
                          <motion.span
                            layoutId="contactMethodIndicator"
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#05080f]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.4 }}
                          >
                            <Check className="h-3 w-3" />
                          </motion.span>
                        )}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {selectedMethod && selectedMethodData && (
                  <motion.div
                    key={selectedMethod}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <label className="mb-2 block text-sm font-light text-white/40">
                      {selectedMethod === 'email' ? t.contact.email : 
                       selectedMethod === 'telegram' ? t.contact.telegram : 
                       t.contact.whatsapp}
                    </label>
                    <input
                      type={selectedMethod === 'email' ? 'email' : 'text'}
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      onFocus={() => setFocused('contact')}
                      onBlur={() => setFocused(null)}
                      placeholder={t.contact.contactPlaceholder}
                      className={inputClass('contact')}
                      inputMode={selectedMethod === 'whatsapp' ? 'tel' : 'text'}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="mb-2 block text-sm font-light text-white/40">
                  {t.contact.project}
                </label>
                <textarea
                  name="project"
                  rows={5}
                  value={formData.project}
                  onChange={handleChange}
                  onFocus={() => setFocused('project')}
                  onBlur={() => setFocused(null)}
                  placeholder={t.contact.projectPlaceholder}
                  className={`${inputClass('project')} resize-none`}
                />
              </div>

              <motion.button
                type="submit"
                className={`group relative w-full overflow-hidden rounded-full px-8 py-4 text-sm font-light tracking-wide text-white transition-all duration-500 ${
                  isFormValid && !sent
                    ? 'bg-white/10 hover:bg-white/15 hover:shadow-[0_0_60px_-12px_rgba(255,255,255,0.05)]'
                    : 'cursor-not-allowed bg-white/5 text-white/20'
                }`}
                whileHover={isFormValid && !sent ? { scale: 1.01 } : {}}
                whileTap={isFormValid && !sent ? { scale: 0.98 } : {}}
                disabled={!isFormValid}
                animate={
                  isFormValid && !sent
                    ? {
                        boxShadow: [
                          '0 0 0 0 rgba(255,255,255,0)',
                          '0 0 40px -8px rgba(255,255,255,0.05)',
                          '0 0 0 0 rgba(255,255,255,0)',
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 2.5,
                  repeat: isFormValid && !sent ? Infinity : 0,
                  ease: "easeInOut",
                }}
              >
                <span className="relative flex items-center justify-center gap-3">
                  {sent ? (
                    <>
                      <Check className="h-4 w-4" />
                      {t.contact.success}
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
                <p className="text-center text-sm text-white/20">
                  {t.contact.selectMethodHint}
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}