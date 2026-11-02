import type { PortfolioEducation, PortfolioExperience, PortfolioLanguage, PortfolioTraining, TechnologyCategory } from './types'

export const profile = {
  handle: 'sl4dk1y',
  github: 'https://github.com/sl4dk1y',
  githubAvatar: 'https://github.com/sl4dk1y.png?size=128',
  avatar: '/images/github-avatar-14b5d978365f044516cedb3805f2aec6db3d8c5e5cae042007994d69e18cf022.webp',
  avatarFallback: '',
  email: 'sweetbusiness@duck.com',
}

export const technologyCategories: TechnologyCategory[] = [
  { id: 'languages', label: { en: 'Languages', ru: 'Языки' }, items: ['Assembly', 'C', 'C++', 'Python', 'Java', 'Kotlin', 'R', 'JavaScript', 'TypeScript', 'SQL'] },
  { id: 'web', label: { en: 'Web', ru: 'Веб' }, items: ['HTML', 'CSS'] },
  { id: 'backend-testing', label: { en: 'Backend & Testing', ru: 'Backend и тестирование' }, items: ['FastAPI', 'REST API', 'GraphQL', 'JSON', 'WebSocket', 'aiogram', 'aiohttp', 'SQLAlchemy', 'Alembic', 'pytest', 'Locust'] },
  { id: 'ai-engineering', label: { en: 'AI Engineering', ru: 'AI Engineering' }, items: ['RAG', 'SGR (Self-Generated Reasoning)', 'Prompt engineering', 'Structured outputs', 'BM25', 'LLM evaluation', 'Fine-tuning concepts', 'PEFT concepts', 'Quantization concepts', 'Machine learning fundamentals', 'Model evaluation'] },
  { id: 'ai-llm-tools', label: { en: 'AI / ML tools', ru: 'Инструменты AI / ML' }, items: ['Langfuse', 'LiteLLM', 'Ollama', 'PyTorch', 'FAISS', 'bm25s'] },
  { id: 'databases', label: { en: 'Databases', ru: 'Базы данных' }, items: ['PostgreSQL', 'SQLite', 'MySQL', 'MongoDB'] },
  { id: 'infrastructure', label: { en: 'Infrastructure & Tools', ru: 'Инфраструктура и инструменты' }, items: ['Linux', 'Docker', 'Docker Compose', 'Git', 'GitHub', 'GitHub Actions', 'Nginx', 'systemd', 'Prometheus', 'Grafana', 'VPS deployment'] },
]

export const experiences: PortfolioExperience[] = [
  {
    id: 'independent-projects',
    role: { en: 'AI Engineering & Python Development', ru: 'AI Engineering и Python-разработка' },
    organization: 'Independent Projects',
    period: { en: 'Self-directed work', ru: 'Самостоятельная работа' },
    arrangement: { en: 'Remote', ru: 'Удалённо' },
    summary: {
      en: 'I build Python services and tools for APIs, data processing and language model applications.',
      ru: 'Разрабатываю на Python сервисы и инструменты для работы с API, данными и языковыми моделями.',
    },
      highlights: {
        en: [
          'Develop AI applications and backend services with Python and FastAPI.',
          'Build LLM features with RAG, structured outputs and model integrations.',
          'Design REST APIs and external service integrations; work with PostgreSQL and database migrations.',
          'Package applications with Docker Compose and deploy them to Linux VPS environments.',
          'Use Langfuse, Prometheus, Grafana and Locust for observability and testing.',
          'Maintain projects with Git and GitHub, and write technical documentation.',
        ],
        ru: [
          'Разрабатываю AI-приложения и backend-сервисы на Python и FastAPI.',
          'Добавляю функции на базе LLM: RAG, структурированный вывод и интеграции моделей.',
          'Проектирую REST API и интеграции с внешними сервисами, работаю с PostgreSQL и миграциями базы данных.',
          'Собираю приложения с Docker Compose и развёртываю их на Linux VPS.',
          'Использую Langfuse, Prometheus, Grafana и Locust для наблюдаемости и тестирования.',
          'Веду проекты в Git и GitHub и пишу техническую документацию.',
        ],
      },
  },
  {
    id: 'neoflex-internship',
    role: { en: 'AI Engineering Intern / Trainee', ru: 'Стажёр по AI Engineering' },
    organization: 'Neoflex',
    period: { en: 'June to July 2026', ru: 'С июня по июль 2026 года' },
      arrangement: { en: 'Internship / trainee', ru: 'Стажировка / обучение' },
    summary: {
      en: 'Worked on AI Text Helper as part of the internship, focusing on requirements, evaluation and LLM application design.',
      ru: 'В рамках стажировки работал над AI Text Helper, занимался требованиями, оценкой качества и проектированием приложения с LLM.',
    },
      highlights: {
        en: [
          'Worked on the architecture and evaluation of the AI Text Helper LLM application.',
          'Analyzed requirements and approaches to LLM integration, prompting and structured model outputs.',
          'Worked with RAG and BM25 retrieval and evaluated retrieval and agent approaches.',
          'Investigated fine-tuning strategies, PEFT, quantization, threat modeling and production readiness.',
          'Used LLM infrastructure and observability tools, including LiteLLM and Langfuse.',
        ],
        ru: [
          'Работал над архитектурой и оценкой приложения AI Text Helper на основе LLM.',
          'Анализировал требования и подходы к интеграции LLM, промптингу и структурированному выводу моделей.',
          'Работал с RAG и поиском BM25, оценивал подходы к поиску и работе агентов.',
          'Изучал стратегии fine-tuning, PEFT, квантование, моделирование угроз и требования к готовности решения к эксплуатации.',
          'Использовал инструменты для работы с LLM и наблюдаемости, включая LiteLLM и Langfuse.',
        ],
      },
    link: { label: 'AI Text Helper', href: 'https://github.com/sl4dk1y/AI-Text-Helper' },
  },
  {
    id: 'softium-teacher',
    role: { en: 'Programming Teacher', ru: 'Преподаватель программирования' },
    organization: 'Softium',
    period: { en: 'February 2025 – September 2026', ru: 'С февраля 2025 по сентябрь 2026 года.' },
    arrangement: { en: 'Full-time, on-site', ru: 'Полная занятость, очно' },
      summary: {
        en: 'Taught programming, computer science fundamentals and digital tools to school students.',
        ru: 'Преподавал школьникам программирование, основы информатики и работу с цифровыми инструментами.',
      },
    highlights: {
        en: [
          'Explained technical topics in a clear, structured way and helped students develop problem-solving skills.',
          'Taught programming languages, web technologies and professional software tools.',
          'Prepared individual study plans and supported academic and extracurricular projects.',
        ],
        ru: [
          'Объяснял технические темы понятно и последовательно, помогал развивать навыки решения задач.',
          'Преподавал языки программирования, веб-технологии и профессиональные программные инструменты.',
          'Составлял индивидуальные учебные планы и поддерживал учебные и внеучебные проекты.',
        ],
    },
  },
  {
    id: 'copywriter',
    role: { en: 'Copywriter', ru: 'Копирайтер' },
    organization: 'Self-employed',
    period: { en: 'January 2019 to present', ru: 'С января 2019 года по настоящее время' },
    arrangement: { en: 'Part-time, remote', ru: 'Частичная занятость, удалённо' },
      summary: {
        en: 'Write and edit informational and commercial content for websites.',
        ru: 'Пишу и редактирую информационные и коммерческие материалы для сайтов.',
      },
      highlights: {
        en: [
          'Research topics using multiple sources and prepare website content.',
          'Review copy for accuracy, readability and consistency, and manage deadlines independently.',
        ],
        ru: [
          'Изучаю темы по разным источникам и готовлю материалы для сайтов.',
          'Проверяю тексты на точность, читаемость и согласованность, самостоятельно соблюдаю сроки.',
        ],
      },
  },
]

export const education: PortfolioEducation = {
  institution: { en: 'Penza State University', ru: 'Пензенский государственный университет' },
  field: {
    en: "Bachelor's Degree in Computer Science and Computer Engineering",
    ru: 'Бакалавриат по направлению «Информатика и вычислительная техника»',
  },
  specialization: {
    en: 'Applied Artificial Intelligence specialization',
    ru: 'Профиль «Прикладной искусственный интеллект»',
  },
  period: { en: '2023–2027', ru: '2023–2027' },
  status: { en: 'Currently studying', ru: 'Обучение продолжается' },
}

export const additionalTraining: PortfolioTraining = {
  provider: 'Neoflex',
  course: { en: 'AI Engineering course', ru: 'Курс по AI Engineering' },
  period: { en: 'February to June 2026', ru: 'С февраля по июнь 2026 года' },
  description: { en: 'AI Engineering training at Neoflex.', ru: 'Обучение по направлению AI Engineering в Neoflex.' },
}

export const languages: PortfolioLanguage[] = [
  { name: { en: 'Russian', ru: 'Русский' }, level: { en: 'Native', ru: 'Родной' } },
  { name: { en: 'English', ru: 'Английский' }, level: { en: 'Intermediate / Upper-Intermediate', ru: 'Средний / выше среднего' } },
]

export const seo = {
  title: { en: 'sl4dk1y | Portfolio', ru: 'sl4dk1y | Портфолио' },
  description: {
    en: 'AI Engineering projects, retrieval research and backend development by sl4dk1y.',
    ru: 'Проекты в AI Engineering, исследования поиска и backend-разработка sl4dk1y.',
  },
  url: 'https://sl4dk1y.github.io/',
}
