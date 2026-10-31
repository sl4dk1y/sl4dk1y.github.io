import type { Locale } from './types'

export const translations = {
  en: {
    a11y: {
      skip: 'Skip to content',
      home: 'home',
      navigation: 'Main navigation',
      switchLanguage: 'Switch language to',
      githubNewTab: 'GitHub profile (opens in a new tab)',
    },
    nav: {
      about: 'About',
      stack: 'Stack',
      projects: 'Projects',
      contact: 'Contact',
      menu: 'Open navigation',
      close: 'Close navigation',
    },
    hero: {
        student: 'Applied Artificial Intelligence student',
      specialty: 'AI Engineering & Backend Development',
        intro: 'I build practical tools for working with LLMs and retrieval, and study how these systems fit together.',
      projects: 'Explore projects',
      github: 'GitHub profile',
    },
    about: {
      eyebrow: 'ABOUT',
      title: 'What I study',
      body: 'I study applied artificial intelligence and build software, from backend services and automation tools to systems that use AI. I’m also interested in application architecture, data processing, and practical uses of new technology.',
    },
    stack: {
      eyebrow: 'STACK',
      title: 'Tools and methods',
      intro: 'A selection of languages, AI methods and software tools I work with.',
    },
    projects: {
      eyebrow: 'PROJECTS',
      title: 'Projects',
      intro: 'Public projects and skills for coding agents.',
    },
    contact: {
      eyebrow: 'CONTACT',
      title: 'My GitHub profile',
      intro: 'Public projects and skills are on my GitHub.',
      link: 'github.com/sl4dk1y',
    },
    theme: {
      light: 'Switch to light theme',
      dark: 'Switch to dark theme',
    },
    footer: {
      note: 'Personal portfolio',
        artworkCredits: 'Artwork credits',
    },
    language: 'Русский',
  },
  ru: {
    a11y: {
      skip: 'Перейти к содержимому',
      home: 'на главную',
      navigation: 'Основная навигация',
      switchLanguage: 'Переключить язык на',
      githubNewTab: 'Профиль GitHub (откроется в новой вкладке)',
    },
    nav: {
      about: 'Обо мне',
      stack: 'Стек',
      projects: 'Проекты',
      contact: 'Контакты',
      menu: 'Открыть навигацию',
      close: 'Закрыть навигацию',
    },
    hero: {
        student: 'Студент направления «Прикладной искусственный интеллект»',
      specialty: 'AI Engineering и Backend-разработка',
        intro: 'Создаю практические инструменты для работы с LLM и поиском по данным, изучаю устройство таких систем.',
      projects: 'Смотреть проекты',
      github: 'Профиль GitHub',
    },
    about: {
      eyebrow: 'ОБО МНЕ',
      title: 'Учёба и интересы',
      body: 'Изучаю прикладной искусственный интеллект и разрабатываю программные решения: backend-сервисы, инструменты автоматизации и системы с AI. Интересуюсь архитектурой приложений, обработкой данных и тем, как применять новые технологии на практике.',
    },
    stack: {
      eyebrow: 'СТЕК',
      title: 'Технологии и методы',
      intro: 'Языки, AI-подходы и инструменты, с которыми я работаю.',
    },
    projects: {
      eyebrow: 'ПРОЕКТЫ',
      title: 'Проекты',
      intro: 'Публичные проекты и skills для AI-агентов.',
    },
    contact: {
      eyebrow: 'КОНТАКТЫ',
      title: 'Профиль на GitHub',
      intro: 'Публичные проекты и skills собраны в моём профиле.',
      link: 'github.com/sl4dk1y',
    },
    theme: {
      light: 'Включить светлую тему',
      dark: 'Включить тёмную тему',
    },
    footer: {
      note: 'Личное портфолио',
        artworkCredits: 'Источники иллюстраций',
    },
    language: 'English',
  },
} satisfies Record<Locale, Record<string, unknown>>
