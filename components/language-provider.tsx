'use client'

import { createContext, useContext, useState, useCallback, useMemo, useEffect, useRef, type ReactNode } from 'react'

export type Lang = 'ru' | 'en'

export type TranslationKey = keyof typeof translations.ru

export type TranslationValue = string | { [key: string]: TranslationValue } | TranslationValue[]

export type TranslationDict = typeof translations.ru

const STORAGE_KEY = 'aesbau-lang'

const translations = {
  ru: {
    nav: {
      home: 'Главная',
      services: 'Услуги',
      cases: 'Кейсы',
      about: 'О нас',
      contacts: 'Связаться',
      cta: 'Оставить заявку',
    },
    hero: {
      badge: 'Цифровые решения нового поколения',
      title1: 'Мы строим',
      title2: 'цифровое будущее',
      title3: 'вашего бизнеса',
      subtitle:
        'AESBAU Labs создаёт сайты, Telegram-ботов, автоматизацию и AI-интеграции. Помогаем бизнесу расти и оставаться на шаг впереди.',
      primary: 'Оставить заявку',
      secondary: 'Наши проекты',
      stats: [
        { value: '120+', label: 'Проектов запущено' },
        { value: '98%', label: 'Довольных клиентов' },
        { value: '24/7', label: 'Поддержка и развитие' },
      ],
      cards: {
        websites: 'Сайты',
        bots: 'Telegram-боты',
        automation: 'Автоматизация',
        ai: 'Искусственный интеллект',
        cloud: 'Облако',
        analytics: 'Аналитика',
      },
    },
    services: {
      title: 'Чем мы можем помочь вашему бизнесу',
      subtitle: 'Современные цифровые решения для роста, автоматизации и развития бизнеса.',
      info: 'Подробнее об услуге',
      label: 'Услуги',
      items: [
        {
          title: 'Разработка сайтов',
          desc: 'Корпоративные сайты, интернет-магазины, лендинги.',
          tip: 'Быстрые, безопасные и адаптивные сайты на современном стеке.',
        },
        {
          title: 'Telegram-боты',
          desc: 'Любые Telegram-боты под задачи бизнеса.',
          tip: 'Продажи, поддержка, оплаты и автоматизация прямо в мессенджере.',
        },
        {
          title: 'Автоматизация бизнеса',
          desc: 'CRM, API, интеграции, автоматизация процессов.',
          tip: 'Объединяем ваши сервисы в единую отлаженную систему.',
        },
        {
          title: 'Искусственный интеллект',
          desc: 'AI-интеграции, интеллектуальные помощники и автоматизация.',
          tip: 'Внедряем AI для аналитики, поддержки и генерации контента.',
        },
        {
          title: 'Развитие проектов',
          desc: 'Поддержка, масштабирование и развитие цифровых продуктов.',
          tip: 'Сопровождаем продукт после запуска и помогаем расти.',
        },
        {
          title: 'Индивидуальные решения',
          desc: 'Нестандартная разработка под конкретные задачи.',
          tip: 'Проектируем архитектуру под уникальные бизнес-процессы.',
        },
      ],
    },
    benefits: {
      title: 'Почему современный бизнес выбирает цифровые решения',
      subtitle: 'Технологии перестали быть роскошью — сегодня это условие выживания и роста.',
      label: 'Почему мы',
      items: [
        { title: 'Рост продаж', desc: 'Автоматизация воронки и новые каналы привлечения клиентов.' },
        { title: 'Репутация', desc: 'Современный образ компании, которому доверяют.' },
        { title: 'Экономия времени', desc: 'Рутинные процессы работают без вашего участия.' },
        { title: 'Масштабирование', desc: 'Продукт растёт вместе с вашим бизнесом.' },
      ],
    },
    about: {
      title: 'Почему нам доверяют',
      subtitle: 'Мы работаем как технологический партнёр, а не как подрядчик. Погружаемся в задачи клиентов и создаём решения, которые действительно работают.',
      label: 'О нас',
      items: [
        { title: 'Индивидуальный подход', desc: 'Погружаемся в задачу и предлагаем решение под вас.' },
        { title: 'Гибкая разработка', desc: 'Прозрачные этапы и быстрые итерации.' },
        { title: 'Быстрая связь', desc: 'Отвечаем оперативно и всегда на связи.' },
        { title: 'Развитие после запуска', desc: 'Поддерживаем и улучшаем продукт постоянно.' },
      ],
    },
    portfolio: {
      title: 'Наши работы',
      subtitle: 'Реальные цифровые продукты, созданные командой AESBAU Labs.',
      label: 'Наши работы',
      filters: ['Все', 'Сайты', 'Боты', 'Автоматизация', 'AI'],
      view: 'Смотреть кейс',
      items: [
        { title: 'Корпоративный портал', cat: 'Сайты', tag: 'Веб-платформа' },
        { title: 'Telegram-бот продаж', cat: 'Боты', tag: 'Автоворонка' },
        { title: 'CRM для логистики', cat: 'Автоматизация', tag: 'Интеграции' },
        { title: 'AI-ассистент поддержки', cat: 'AI', tag: 'Нейросети' },
        { title: 'Интернет-магазин', cat: 'Сайты', tag: 'E-commerce' },
        { title: 'Аналитическая панель', cat: 'Автоматизация', tag: 'Дашборд' },
      ],
    },
    contact: {
      title: 'Расскажите о вашем проекте',
      subtitle: 'Оставьте заявку — обсудим задачу и предложим решение.',
      label: 'Контакты',
      name: 'Имя',
      namePlaceholder: 'Введите ваше имя',
      selectMethod: 'Выберите способ связи',
      selectMethodHint: 'Выберите способ связи',
      contactPlaceholder: 'Введите контактные данные',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      email: 'Email',
      project: 'Описание проекта',
      projectPlaceholder: 'Расскажите подробнее о вашем проекте или задаче',
      submit: 'Отправить заявку',
      success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
      infoTitle: 'Контакты',
      phoneLabel: 'Телефон',
      emailLabel: 'Email',
      tgLabel: 'Telegram',
      hoursLabel: 'Часы работы',
      hoursValue: 'Пн–Пт, 10:00–19:00',
    },
    footer: {
      tagline: 'Строим цифровое будущее вашего бизнеса.',
      rights: 'Все права защищены.',
      nav: 'Навигация',
      contacts: 'Контакты',
    },
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      cases: 'Cases',
      about: 'About',
      contacts: 'Contact',
      cta: 'Leave a request',
    },
    hero: {
      badge: 'Next-generation digital solutions',
      title1: 'We build the',
      title2: 'digital future',
      title3: 'of your business',
      subtitle:
        'AESBAU Labs builds websites, Telegram bots, automation and AI integrations. We help businesses grow and stay one step ahead.',
      primary: 'Leave a request',
      secondary: 'Our projects',
      stats: [
        { value: '120+', label: 'Projects launched' },
        { value: '98%', label: 'Happy clients' },
        { value: '24/7', label: 'Support & growth' },
      ],
      cards: {
        websites: 'Websites',
        bots: 'Telegram Bots',
        automation: 'Automation',
        ai: 'Artificial Intelligence',
        cloud: 'Cloud',
        analytics: 'Analytics',
      },
    },
    services: {
      title: 'How we can help your business',
      subtitle: 'Modern digital solutions for growth, automation and development.',
      info: 'More about this service',
      label: 'Services',
      items: [
        {
          title: 'Web Development',
          desc: 'Corporate websites, online stores, landing pages.',
          tip: 'Fast, secure and responsive sites on a modern stack.',
        },
        {
          title: 'Telegram Bots',
          desc: 'Any Telegram bots tailored to your business.',
          tip: 'Sales, support, payments and automation right in the messenger.',
        },
        {
          title: 'Business Automation',
          desc: 'CRM, API, integrations, process automation.',
          tip: 'We unite your services into one smooth system.',
        },
        {
          title: 'Artificial Intelligence',
          desc: 'AI integrations, intelligent assistants and automation.',
          tip: 'We deploy AI for analytics, support and content generation.',
        },
        {
          title: 'Project Growth',
          desc: 'Support, scaling and development of digital products.',
          tip: 'We maintain your product after launch and help it grow.',
        },
        {
          title: 'Custom Solutions',
          desc: 'Bespoke development for specific challenges.',
          tip: 'We architect solutions for unique business processes.',
        },
      ],
    },
    benefits: {
      title: 'Why modern business chooses digital',
      subtitle: 'Technology is no longer a luxury — today it is the condition for growth.',
      label: 'Why choose us',
      items: [
        { title: 'More sales', desc: 'Funnel automation and new customer channels.' },
        { title: 'Reputation', desc: 'A modern company image people trust.' },
        { title: 'Time saved', desc: 'Routine processes run without your involvement.' },
        { title: 'Scaling', desc: 'The product grows together with your business.' },
      ],
    },
    about: {
      title: 'Why clients trust us',
      subtitle: 'We work as a technology partner, not just a contractor. We dive into the task and craft a solution that really works.',
      label: 'About',
      items: [
        { title: 'Personal approach', desc: 'We dive into the task and craft a solution for you.' },
        { title: 'Flexible development', desc: 'Transparent stages and fast iterations.' },
        { title: 'Fast communication', desc: 'We respond quickly and stay in touch.' },
        { title: 'Post-launch growth', desc: 'We support and improve the product continuously.' },
      ],
    },
    portfolio: {
      title: 'Our works',
      subtitle: 'Real digital products built by the AESBAU Labs team.',
      label: 'Our works',
      filters: ['All', 'Websites', 'Bots', 'Automation', 'AI'],
      view: 'View case',
      items: [
        { title: 'Corporate portal', cat: 'Websites', tag: 'Web platform' },
        { title: 'Sales Telegram bot', cat: 'Bots', tag: 'Auto-funnel' },
        { title: 'Logistics CRM', cat: 'Automation', tag: 'Integrations' },
        { title: 'AI support assistant', cat: 'AI', tag: 'Neural nets' },
        { title: 'Online store', cat: 'Websites', tag: 'E-commerce' },
        { title: 'Analytics panel', cat: 'Automation', tag: 'Dashboard' },
      ],
    },
    contact: {
      title: 'Tell us about your project',
      subtitle: 'Leave a request — we will discuss the task and propose a solution.',
      label: 'Contact',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      selectMethod: 'Choose contact method',
      selectMethodHint: 'Choose contact method',
      contactPlaceholder: 'Enter contact details',
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      email: 'Email',
      project: 'Project description',
      projectPlaceholder: 'Tell us more about your project or task',
      submit: 'Send request',
      success: 'Thank you! We will get back to you shortly.',
      infoTitle: 'Contacts',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      tgLabel: 'Telegram',
      hoursLabel: 'Working hours',
      hoursValue: 'Mon–Fri, 10:00–19:00',
    },
    footer: {
      tagline: 'Building the digital future of your business.',
      rights: 'All rights reserved.',
      nav: 'Navigation',
      contacts: 'Contacts',
    },
  },
} as const

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: TranslationDict
}

const LanguageContext = createContext<LanguageContextType | null>(null)

function getInitialLanguage(): Lang {
  if (typeof window === 'undefined') return 'ru'

  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
    if (stored === 'ru' || stored === 'en') return stored

    const browserLang = navigator.language.split('-')[0]
    if (browserLang === 'ru' || browserLang === 'en') return browserLang as Lang
  } catch {
    // ignore
  }

  return 'ru'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getInitialLanguage())
  const isFirstRender = useRef(true)
  const previousLang = useRef<Lang>(lang)

  const setLang = useCallback((newLang: Lang) => {
    if (newLang === previousLang.current) return
    previousLang.current = newLang
    setLangState(newLang)
    try {
      localStorage.setItem(STORAGE_KEY, newLang)
    } catch {
      // ignore
    }
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === 'ru' ? 'en' : 'ru')
  }, [lang, setLang])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo<LanguageContextType>(
    () => ({
      lang,
      setLang,
      toggle,
      t: translations[lang] as TranslationDict,
    }),
    [lang, setLang, toggle]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export { translations }