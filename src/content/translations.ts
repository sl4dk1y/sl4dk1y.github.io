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
      projects: 'Projects',
        stack: 'Skills',
      experience: 'Experience',
      education: 'Education',
      contact: 'Contact',
      menu: 'Open navigation',
      close: 'Close navigation',
    },
    hero: {
        student: 'Computer Science and Computer Engineering student',
      specialty: 'AI Engineering & Backend Development',
        intro: 'I build backend services and practical tools for language models. I’m especially interested in information retrieval and how AI applications are built.',
      projects: 'Explore projects',
      github: 'GitHub profile',
    },
    about: {
        eyebrow: 'INTRODUCTION',
        title: 'About me',
      body: 'I study applied artificial intelligence at Penza State University. My work and studies focus on AI engineering and backend development, with interests in LLMs, RAG, and practical software tools.',
    },
    stack: {
        eyebrow: 'TOOLS & TECHNOLOGIES',
      title: 'Technical skills',
      intro: 'Languages, methods and tools used across my work and studies.',
    },
    projects: {
        eyebrow: 'SELECTED WORK',
      title: 'Projects',
      intro: 'Public projects and skills for coding agents.',
    },
    experience: {
        eyebrow: 'CAREER',
      title: 'Experience',
      intro: 'Independent development, teaching and other work.',
    },
    education: {
        eyebrow: 'UNIVERSITY',
      title: 'Education',
      status: 'Current programme',
    },
    training: {
        eyebrow: 'COURSES & PRACTICE',
      title: 'Additional training',
    },
    languages: {
        eyebrow: 'COMMUNICATION',
      title: 'Languages',
    },
    contact: {
        eyebrow: 'GET IN TOUCH',
        title: 'Contact',
      intro: 'Open to job opportunities, interesting projects, and professional collaboration.',
      link: 'github.com/sl4dk1y',
      emailCopy: 'Copy email address',
      emailCopied: 'Email address copied.',
      emailCopyFailed: 'Could not copy the address. Select it to copy manually.',
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
      projects: 'Проекты',
        stack: 'Навыки',
      experience: 'Опыт',
      education: 'Образование',
      contact: 'Контакты',
      menu: 'Открыть навигацию',
      close: 'Закрыть навигацию',
    },
    hero: {
        student: 'Студент направления «Информатика и вычислительная техника»',
      specialty: 'AI Engineering и Backend-разработка',
        intro: 'Разрабатываю backend-сервисы и инструменты для работы с языковыми моделями. Интересуюсь поиском информации и разработкой AI-приложений.',
      projects: 'Смотреть проекты',
      github: 'Профиль GitHub',
    },
    about: {
        eyebrow: 'ЗНАКОМСТВО',
        title: 'Обо мне',
      body: 'Изучаю прикладной искусственный интеллект в Пензенском государственном университете. Занимаюсь AI Engineering и backend-разработкой, интересуюсь LLM, RAG и практическими программными инструментами.',
    },
    stack: {
        eyebrow: 'ИНСТРУМЕНТЫ И ТЕХНОЛОГИИ',
      title: 'Технические навыки',
      intro: 'Языки, методы и инструменты, которые использую в работе и учёбе.',
    },
    projects: {
        eyebrow: 'ИЗБРАННЫЕ РАБОТЫ',
      title: 'Проекты',
      intro: 'Публичные проекты и skills для AI-агентов.',
    },
    experience: {
        eyebrow: 'ПРОФЕССИОНАЛЬНЫЙ ПУТЬ',
      title: 'Опыт',
      intro: 'Самостоятельная разработка, преподавание и другая работа.',
    },
    education: {
        eyebrow: 'УНИВЕРСИТЕТ',
      title: 'Образование',
      status: 'Обучение продолжается',
    },
    training: {
        eyebrow: 'КУРСЫ И ПРАКТИКА',
      title: 'Дополнительное обучение',
    },
    languages: {
        eyebrow: 'КОММУНИКАЦИЯ',
      title: 'Языки',
    },
    contact: {
        eyebrow: 'НА СВЯЗИ',
        title: 'Контакты',
      intro: 'Открыт к предложениям о работе, интересным проектам и профессиональному сотрудничеству.',
      link: 'github.com/sl4dk1y',
      emailCopy: 'Скопировать адрес почты',
      emailCopied: 'Адрес почты скопирован.',
      emailCopyFailed: 'Не удалось скопировать адрес. Выделите его и скопируйте вручную.',
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
