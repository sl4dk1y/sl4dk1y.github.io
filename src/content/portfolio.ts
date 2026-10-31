import type { PortfolioProject, TechnologyCategory } from './types'

export const profile = {
  handle: 'sl4dk1y',
  github: 'https://github.com/sl4dk1y',
  avatar: '/images/github-avatar.jpg',
}

export const technologyCategories: TechnologyCategory[] = [
    { id: 'languages', label: { en: 'Languages', ru: 'Языки' }, items: ['Assembly', 'C', 'C++', 'Python', 'Java', 'Kotlin', 'R', 'JavaScript', 'TypeScript'] },
    { id: 'backend-testing', label: { en: 'Backend & Testing', ru: 'Backend и тестирование' }, items: ['FastAPI', 'REST API', 'GraphQL', 'Locust', 'WebSocket', 'aiogram', 'aiohttp', 'SQLAlchemy', 'Alembic', 'pytest'] },
  { id: 'ai-engineering', label: { en: 'AI Engineering', ru: 'AI Engineering' }, items: ['RAG', 'SGR (Self-Generated Reasoning)', 'Fine-tuning'] },
    { id: 'ai-llm-tools', label: { en: 'AI / ML tools', ru: 'Инструменты AI / ML' }, items: ['Langfuse', 'LiteLLM', 'PyTorch', 'FAISS', 'bm25s'] },
    { id: 'infrastructure', label: { en: 'Infrastructure & Tools', ru: 'Инфраструктура и инструменты' }, items: ['Linux', 'Docker', 'PostgreSQL', 'MongoDB', 'MySQL', 'Git', 'systemd', 'Prometheus', 'Grafana', 'GitHub Actions', 'Nginx'] },
]

export const projects: PortfolioProject[] = [
  {
    id: 'snapkeep',
    name: 'SnapKeep',
    description: {
      en: 'A cross-platform command-line tool for creating timestamped ZIP snapshots of project folders, with configurable ignore rules.',
      ru: 'Кроссплатформенная утилита командной строки для создания ZIP-снимков папок проекта с отметкой времени и правилами исключения.',
    },
    tags: ['Python', 'ZIP'],
    repositories: [{ label: { en: 'Repository', ru: 'Репозиторий' }, href: 'https://github.com/sl4dk1y/SnapKeep' }],
  },
  {
    id: 'rag-retrieval-research',
    name: 'RAG Retrieval Research',
    description: {
      en: 'Compares BM25, dense and hybrid retrieval for Russian-language RAG, with experiment protocols, evaluation results and error analysis.',
      ru: 'Сравнивает BM25, плотный и гибридный поиск для русскоязычных RAG-систем. В репозитории собраны протоколы экспериментов, результаты и анализ ошибок.',
    },
    tags: ['Python', 'FAISS', 'PyTorch', 'BM25'],
    repositories: [{ label: { en: 'Repository', ru: 'Репозиторий' }, href: 'https://github.com/sl4dk1y/rag-retrieval-research' }],
  },
  {
    id: 'agent-skills',
    name: 'Agent Skills',
    description: {
      en: 'Three reusable skills for coding agents: a guided development workflow, codebase explanations with source references, and context carried between sessions.',
      ru: 'Три переиспользуемых skill для AI-агентов: рабочий процесс разработки, объяснение кодовой базы со ссылками на исходники и перенос контекста между сессиями.',
    },
    tags: ['AI agent skills', 'Markdown'],
    repositories: [
      { label: { en: 'Agent Safe Flow', ru: 'Agent Safe Flow' }, href: 'https://github.com/sl4dk1y/Agent-Safe-Flow' },
      { label: { en: 'Codebase Atlas', ru: 'Codebase Atlas' }, href: 'https://github.com/sl4dk1y/Codebase-Atlas' },
      { label: { en: 'Context Waypoint', ru: 'Context Waypoint' }, href: 'https://github.com/sl4dk1y/Context-Waypoint' },
    ],
  },
]

export const seo = {
  title: { en: 'sl4dk1y — Portfolio', ru: 'sl4dk1y — Портфолио' },
  description: {
    en: 'Applied Artificial Intelligence student interested in AI engineering, backend development, LLMs and RAG.',
    ru: 'Изучаю прикладной искусственный интеллект, интересуюсь AI Engineering, backend-разработкой, LLM и RAG.',
  },
  url: 'https://sl4dk1y.github.io/',
}
