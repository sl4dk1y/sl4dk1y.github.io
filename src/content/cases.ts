import type { Locale } from './types'

export const featuredCaseOrder = ['rag-retrieval-research', 'snapkeep', 'ai-text-helper'] as const

export type CaseDiagramSpec =
  | { type: 'sequence'; steps: string[] }
  | { type: 'separate-sequences'; primaryTitle: string; primary: string[]; secondaryTitle: string; secondary: string[] }
  | { type: 'branches'; lead: string[]; branches: { title: string; steps: string[] }[]; outcome: string }
  | { type: 'fanout'; lead: string[]; outputs: string[] }

export type CaseStudy = {
  id: string
  path: string
  name: string
  featured: boolean
  eyebrow: Record<Locale, string>
  maturity: Record<Locale, string>
  summary: Record<Locale, string>
  problem: Record<Locale, string>
  approach: Record<Locale, string>
  diagramTitle: Record<Locale, string>
  diagramCaption: Record<Locale, string>
  architecture: Record<Locale, CaseDiagramSpec>
  decisions: Record<Locale, string[]>
  validation: Record<Locale, string>
  outcome: Record<Locale, string>
  caveat?: Record<Locale, string>
  tags: string[]
  repository: string
  repositoryStatus?: Record<Locale, string>
  title: Record<Locale, string>
  description: Record<Locale, string>
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'ai-text-helper',
    path: '/projects/ai-text-helper/',
    name: 'AI Text Helper',
    featured: true,
    eyebrow: { en: 'AI engineering · learning project', ru: 'AI Engineering · учебный проект' },
    maturity: { en: 'Learning experiment · API prototype', ru: 'Учебный эксперимент · API-прототип' },
    summary: {
      en: 'A Python API prototype for improving and summarizing Russian text with an LLM and lexical search for known corrections.',
      ru: 'Учебный API-прототип на Python для улучшения и суммаризации русского текста с языковой моделью и лексическим поиском известных исправлений.',
    },
    problem: {
      en: 'The project explores a shared API for improving and summarizing text, with known corrections available to the improvement path.',
      ru: 'Проект объединяет улучшение и суммаризацию текста в одном API. Для улучшения текста можно искать известные исправления.',
    },
    approach: {
      en: 'FastAPI routes each request to the selected task. Text improvement can first look up known corrections with BM25, then call a local model through LiteLLM and Ollama.',
      ru: 'FastAPI направляет запрос к выбранному сценарию. При улучшении текста сервис может сначала найти известные исправления с помощью BM25, а затем обратиться к локальной модели через LiteLLM и Ollama.',
    },
    architecture: {
      en: {
        type: 'branches',
        lead: ['Request', 'FastAPI', 'Select scenario'],
        branches: [
          { title: 'Improve text', steps: ['BM25 correction lookup', 'Language model'] },
          { title: 'Summarize', steps: ['Language model'] },
        ],
        outcome: 'Structured response',
      },
      ru: {
        type: 'branches',
        lead: ['Запрос', 'FastAPI', 'Выбор сценария'],
        branches: [
          { title: 'Улучшение текста', steps: ['Поиск исправлений BM25', 'Языковая модель'] },
          { title: 'Суммаризация', steps: ['Языковая модель'] },
        ],
        outcome: 'Структурированный ответ',
      },
    },
    diagramTitle: { en: 'From API request to text response', ru: 'От API-запроса к текстовому ответу' },
    diagramCaption: {
      en: 'BM25 is used only on the text-improvement path. Summarization goes directly to the model; both paths return a structured response.',
      ru: 'BM25 используется только при улучшении текста. Суммаризация сразу обращается к модели; оба сценария возвращают структурированный ответ.',
    },
    decisions: {
      en: [
        'Improvement and summarization are exposed as distinct task paths behind a shared API.',
        'The lexical lookup supplements text improvement with known corrections; it does not replace model generation.',
        'The service uses structured request and response models and returns explicit errors for invalid tasks or failed calls.',
      ],
      ru: [
        'Улучшение и суммаризация оформлены как разные сценарии общего API.',
        'Лексический поиск дополняет улучшение текста известными исправлениями, но не заменяет генерацию модели.',
        'Для запросов и ответов используются структурированные модели, а для неверной задачи и ошибок предусмотрены явные ответы.',
      ],
    },
    validation: {
      en: 'The repository includes tests for the API, prompts, agent behavior and retriever. It also includes retrieval-evaluation and Locust scripts. These do not establish production reliability or measured end-to-end quality.',
      ru: 'В репозитории есть тесты API, промптов, поведения агента и ретривера, а также сценарии оценки поиска и Locust. Эти материалы сами по себе не подтверждают надёжность в эксплуатации или измеренное сквозное качество.',
    },
    outcome: {
      en: 'The repository contains a text API prototype, local-model integration, lexical correction search and supporting test and evaluation code.',
      ru: 'В репозитории есть прототип API для работы с текстом, интеграция с локальной моделью, лексический поиск исправлений и код для тестирования и оценки.',
    },
    caveat: {
      en: 'The repository includes a LoRA training script, but no reproducible validation report or published adapter demonstrates a quality gain. Fine-tuning remains an experiment; this is not a production-ready project.',
      ru: 'В репозитории есть скрипт обучения LoRA, но нет воспроизводимого отчёта валидации или опубликованного адаптера, который подтверждал бы улучшение качества. Fine-tuning остаётся экспериментом, а проект не готов к эксплуатации.',
    },
    tags: ['Python', 'FastAPI', 'BM25', 'LiteLLM', 'Ollama', 'Locust'],
    repository: 'https://github.com/sl4dk1y/AI-Text-Helper',
    title: { en: 'AI Text Helper | sl4dk1y', ru: 'AI Text Helper | sl4dk1y' },
    description: {
      en: 'A learning project: a Russian text API prototype with lexical search for corrections and local LLM integration.',
      ru: 'Кейс учебного API-прототипа для работы с русским текстом, лексическим поиском и локальной языковой моделью.',
    },
  },
  {
    id: 'snapkeep',
    path: '/projects/snapkeep/',
    name: 'SnapKeep',
    featured: true,
    eyebrow: { en: 'Project case', ru: 'Кейс проекта' },
    maturity: { en: 'Alpha · experimental CLI', ru: 'Alpha · экспериментальная CLI-утилита' },
    summary: {
      en: 'A cross-platform CLI for creating timestamped ZIP snapshots of project folders.',
      ru: 'Кроссплатформенная CLI-утилита для создания ZIP-снимков папок проекта с отметкой времени.',
    },
    problem: {
      en: 'Project snapshots need predictable exclusions and a way to check that an archive can be read.',
      ru: 'Для снимков проекта нужны понятные правила исключения файлов и способ проверить целостность архива.',
    },
    approach: {
      en: 'The CLI applies built-in path exclusions and a project-level ignore file, then writes a timestamped ZIP. A separate command checks archive integrity.',
      ru: 'CLI применяет встроенные исключения по путям и локальный файл правил, затем создаёт ZIP с отметкой времени. Целостность архива проверяется отдельной командой.',
    },
    architecture: {
      en: {
        type: 'separate-sequences',
        primaryTitle: 'Create a snapshot',
        primary: ['Select project files', 'Apply path rules', 'Preview or write ZIP'],
        secondaryTitle: 'Separate verification command',
        secondary: ['Choose an existing ZIP', 'Run the check command', 'Read the integrity result'],
      },
      ru: {
        type: 'separate-sequences',
        primaryTitle: 'Создание снимка',
        primary: ['Выбрать файлы проекта', 'Применить правила путей', 'Предпросмотр или запись ZIP'],
        secondaryTitle: 'Отдельная команда проверки',
        secondary: ['Выбрать готовый ZIP', 'Запустить команду проверки', 'Получить результат проверки целостности'],
      },
    },
    diagramTitle: { en: 'Create a snapshot and check an archive', ru: 'Создание снимка и проверка архива' },
    diagramCaption: {
      en: 'The verification flow starts only when the separate command is run against an existing archive; ZIP creation does not trigger it automatically.',
      ru: 'Проверка начинается только при отдельном запуске команды для готового архива; создание ZIP не запускает её автоматически.',
    },
    decisions: {
      en: [
        'Dry-run previews the selection before an archive is written.',
        'Symlinks are skipped without following their targets, and the output directory is kept out of its own snapshot.',
        'Archive verification is available as a standalone command.',
      ],
      ru: [
        'Режим dry-run показывает состав будущего снимка до создания архива.',
        'Символические ссылки пропускаются без перехода по ним, а каталог результата не попадает в собственный архив.',
        'Проверка архива доступна отдельной командой.',
      ],
    },
    validation: {
      en: 'The repository includes unittest coverage for archive creation, exclusions and CLI behavior. I have not yet tested the tool in regular use, so it remains alpha.',
      ru: 'В репозитории есть unittest-тесты создания архивов, правил исключения и CLI. Утилита остаётся в статусе alpha. Я ещё не проверял её в повседневной работе.',
    },
    outcome: {
      en: 'The repository contains an early Python CLI for project snapshots, configurable path exclusions and ZIP verification.',
      ru: 'В репозитории опубликована ранняя Python CLI-утилита для снимков проектов, настройки исключений по путям и проверки ZIP.',
    },
    caveat: {
      en: 'Exclusions are based on paths and names, not file contents. SnapKeep is not a substitute for tested production backups or a recovery plan.',
      ru: 'Правила исключения проверяют пути и имена, а не содержимое файлов. SnapKeep не заменяет проверенные резервные копии рабочих систем и план восстановления.',
    },
    tags: ['Python', 'ZIP', 'unittest'],
    repository: 'https://github.com/sl4dk1y/SnapKeep',
    title: { en: 'SnapKeep | sl4dk1y', ru: 'SnapKeep | sl4dk1y' },
    description: {
      en: 'A public case study of SnapKeep, a Python CLI for project snapshots and archive verification.',
      ru: 'Публичный кейс SnapKeep: Python CLI для создания снимков проектов и проверки архивов.',
    },
  },
  {
    id: 'agent-safe-flow',
    path: '/projects/agent-safe-flow/',
    name: 'Agent Safe Flow',
    featured: false,
    eyebrow: { en: 'Agent workflow', ru: 'Процесс для AI-агентов' },
    maturity: { en: 'Reusable instruction set', ru: 'Набор переиспользуемых инструкций' },
    summary: {
      en: 'A set of five reusable agent skills for scoping, inspecting, building and checking coding tasks.',
      ru: 'Пять переиспользуемых навыков для определения границ задачи, аудита, реализации и проверки изменений AI-агентом.',
    },
    problem: {
      en: 'Agent-assisted changes are easier to review when requirements, implementation and verification have explicit stages.',
      ru: 'Изменения с участием агента проще проверять, когда требования, реализация и проверки разделены на понятные этапы.',
    },
    approach: {
      en: 'The repository separates Spec, Audit, Build, Review and Release Check into portable instructions. Each stage defines its scope and expected output; the set is not a software runtime.',
      ru: 'В репозитории этапы Spec, Audit, Build, Review и Release Check описаны как переносимые инструкции. Для каждого заданы границы и ожидаемый результат; это не программная платформа.',
    },
    architecture: {
      en: { type: 'sequence', steps: ['Spec', 'Audit', 'Build', 'Review', 'Release check'] },
      ru: { type: 'sequence', steps: ['Требования', 'Аудит', 'Реализация', 'Ревью', 'Проверка релиза'] },
    },
    diagramTitle: { en: 'Five stages in Agent Safe Flow', ru: 'Пять этапов Agent Safe Flow' },
    diagramCaption: {
      en: 'The repository packages these steps as reusable instructions, not executable software modules.',
      ru: 'В репозитории эти этапы оформлены как переиспользуемые инструкции, а не исполняемые модули программы.',
    },
    decisions: {
      en: [
        'The workflow makes scope and acceptance criteria explicit before implementation.',
        'A read-only audit precedes code changes when the task calls for it.',
        'Review and release checks provide separate verification steps.',
      ],
      ru: [
        'До реализации процесс фиксирует границы задачи и критерии готовности.',
        'Когда этого требует задача, перед изменениями проводится аудит только для чтения.',
        'Ревью и проверка релиза выделены в самостоятельные этапы.',
      ],
    },
    validation: {
      en: 'The public repository contains the five skill definitions and supporting workflow guidance. It does not publish measured performance or claim that the sequence fits every task.',
      ru: 'В публичном репозитории доступны пять описаний навыков и правила их совместного применения. Измерений эффективности нет, универсальность процесса не заявляется.',
    },
    outcome: {
      en: 'The instructions can be used stage by stage when a coding task calls for that level of process.',
      ru: 'Инструкции можно применять по этапам, если этого требует задача разработки.',
    },
    tags: ['Agent skills', 'Markdown', 'Workflow design'],
    repository: 'https://github.com/sl4dk1y/Agent-Safe-Flow',
    title: { en: 'Agent Safe Flow | sl4dk1y', ru: 'Agent Safe Flow | sl4dk1y' },
    description: {
      en: 'A case study of Agent Safe Flow, a five-stage workflow for coding-agent tasks.',
      ru: 'Кейс Agent Safe Flow: пятиэтапный процесс для задач AI-агентов, работающих с кодом.',
    },
  },
  {
    id: 'rag-retrieval-research',
    path: '/projects/rag-retrieval-research/',
    name: 'RAG Retrieval Research',
    featured: true,
    eyebrow: { en: 'Research project', ru: 'Исследование' },
    maturity: { en: 'Completed retrieval evaluation', ru: 'Оценка методов поиска завершена' },
    summary: {
      en: 'A Russian-language Mr. TyDi retrieval study with an evaluation on the original 9.6M-document corpus and a separate reduced-collection comparison.',
      ru: 'Исследование поиска по русскоязычному Mr. TyDi: историческая оценка на 9,6 млн документов и отдельное сравнение на сокращённой коллекции.',
    },
    problem: {
      en: 'The study asks whether combining lexical and dense retrieval improves results over either approach on the evaluated collection.',
      ru: 'Исследование проверяет, даёт ли сочетание лексического и плотного поиска лучший результат на выбранной коллекции.',
    },
    approach: {
      en: 'The study evaluates BM25, multilingual-e5-small and BGE-M3 dense retrieval with FAISS, plus weighted reciprocal-rank fusion. DEV ablations and retrieval error analysis are also preserved.',
      ru: 'В исследовании оценены BM25, плотный поиск multilingual-e5-small и BGE-M3 с FAISS, а также взвешенное объединение рангов. В репозитории сохранены DEV-абляции и анализ ошибок поиска.',
    },
    architecture: {
      en: { type: 'sequence', steps: ['Query and corpus', 'BM25', 'Dense retrieval', 'Rank fusion', 'Evaluation'] },
      ru: { type: 'sequence', steps: ['Запрос и коллекция', 'BM25', 'Плотный поиск', 'Объединение рангов', 'Оценка'] },
    },
    diagramTitle: { en: 'Retrieval evaluation flow', ru: 'Процесс оценки методов поиска' },
    diagramCaption: {
      en: 'Methods are measured independently before the hybrid ranking is evaluated against the same study protocol.',
      ru: 'Методы сначала измеряются отдельно; затем гибридный поиск оценивается в рамках того же протокола исследования.',
    },
    decisions: {
      en: [
        'BM25 and dense retrieval are evaluated separately before hybrid results are compared.',
        'The study varies the BM25 contribution instead of treating equal weighting as a default.',
        'The repository includes error analysis alongside aggregate retrieval metrics.',
      ],
      ru: [
        'BM25 и плотный поиск сначала оцениваются отдельно, затем сравниваются с гибридным вариантом.',
        'В исследовании меняется вклад BM25, а равные веса не принимаются как исходное правило.',
        'В репозитории приведён анализ ошибок наряду с общими метриками поиска.',
      ],
    },
    validation: {
      en: 'The full-corpus experiment evaluates three methods on 9,597,504 documents. A separate 1,000,000-document experiment compares five methods on 995 TEST queries. Saved runs and metric files are included in the repository.',
      ru: 'В эксперименте на полном корпусе из 9 597 504 документов оценены три метода. Отдельный эксперимент на 1 000 000 документов сравнивает пять методов на 995 TEST-запросах. Результаты и файлы метрик сохранены в репозитории.',
    },
    outcome: {
      en: 'On the reduced collection, BGE-M3 scored 0.861307 Recall@10 and 0.692026 nDCG@10, compared with 0.813065 and 0.641458 for E5. Paired tests found no nominally significant gain from the tested fixed-weight hybrid variants.',
      ru: 'На сокращённой коллекции BGE-M3 получил Recall@10 0,861307 и nDCG@10 0,692026. У E5 значения составили 0,813065 и 0,641458. Для проверенных гибридных конфигураций статистически значимого улучшения не обнаружено.',
    },
    caveat: {
      en: 'The reduced collection was built using positive DEV and TEST qrels and historical retrieval runs. Its TEST results are not independent of collection construction and do not establish performance on the full corpus. The 15 reported p-values are nominal and unadjusted for multiple comparisons.',
      ru: 'Сокращённую коллекцию сформировали с использованием положительных DEV- и TEST-qrels и исторических поисковых выдач. Поэтому TEST-результаты не независимы от отбора документов и не подтверждают качество на полном корпусе. Все 15 приведённых p-value номинальные, без поправки на множественные сравнения.',
    },
    tags: ['Python', 'BM25', 'FAISS', 'multilingual-e5-small', 'BGE-M3', 'RRF'],
    repository: 'https://github.com/sl4dk1y/rag-retrieval-research',
    title: { en: 'RAG Retrieval Research | sl4dk1y', ru: 'RAG Retrieval Research | sl4dk1y' },
    description: {
      en: 'A retrieval study comparing BM25, dense and hybrid search on Russian-language Mr. TyDi.',
      ru: 'Публичное исследование BM25, плотного и гибридного поиска для русскоязычных RAG-систем.',
    },
  },
  {
    id: 'codebase-atlas',
    path: '/projects/codebase-atlas/',
    name: 'Codebase Atlas',
    featured: false,
    eyebrow: { en: 'Developer tooling', ru: 'Инструменты разработки' },
    maturity: { en: 'Documentation-led skill · v0.1.0', ru: 'Навык с документацией · v0.1.0' },
    summary: {
      en: 'A portable agent skill for explaining a codebase with source-backed walkthroughs and Mermaid diagrams.',
      ru: 'Переносимый навык для AI-агента, который объясняет устройство кодовой базы по исходникам и строит диаграммы Mermaid.',
    },
    problem: {
      en: 'Understanding an unfamiliar repository often means finding the relevant source first, then explaining how its parts relate without overstating what the code proves.',
      ru: 'Чтобы разобраться в незнакомом репозитории, нужно найти нужные исходники и объяснить связи между ними, не приписывая коду неподтверждённое поведение.',
    },
    approach: {
      en: 'Codebase Atlas sets out a sequence: inspect the relevant part of the repository, verify relationships in source, then write a plain-language walkthrough with a Mermaid diagram and source links.',
      ru: 'Codebase Atlas задаёт порядок работы: изучить нужную часть репозитория, проверить связи по исходникам и подготовить понятное объяснение с диаграммой Mermaid и ссылками на код.',
    },
    architecture: {
      en: {
        type: 'fanout',
        lead: ['Repository source', 'Inspect relevant code'],
        outputs: ['Explanation with source links', 'Mermaid diagram'],
      },
      ru: {
        type: 'fanout',
        lead: ['Исходники репозитория', 'Изучить нужный код'],
        outputs: ['Объяснение со ссылками на исходники', 'Диаграмма Mermaid'],
      },
    },
    diagramTitle: { en: 'From source analysis to two outputs', ru: 'От анализа исходников к двум результатам' },
    diagramCaption: {
      en: 'The agent checks relevant source and relationships, then prepares both a referenced walkthrough and a Mermaid diagram.',
      ru: 'Агент изучает исходники и связи между ними, затем готовит объяснение со ссылками и диаграмму Mermaid.',
    },
    decisions: {
      en: [
        'Graph or language-server results help locate code, but claims are checked against the current source.',
        'Mermaid in Markdown is the default output; the skill does not include a diagram renderer.',
        'The skill can work without network access, an API key or a code-index service.',
      ],
      ru: [
        'Граф и языковой сервер помогают найти код, но выводы сверяются с актуальными исходниками.',
        'Основной формат результата — Mermaid в Markdown; рендерера диаграмм в составе навыка нет.',
        'Навык можно применять без сети, API-ключей и сервиса индексации кода.',
      ],
    },
    validation: {
      en: 'The v0.1.0 repository tests required files, frontmatter, local references, balanced Mermaid fences and static source links in a fixture. They do not render diagrams or evaluate an agent end to end.',
      ru: 'Тесты репозитория v0.1.0 проверяют обязательные файлы, frontmatter, локальные ссылки, парность Mermaid-блоков и связи с исходниками в фикстуре. Они не рендерят диаграммы и не оценивают агента целиком.',
    },
    outcome: {
      en: 'Version 0.1.0 documents how to write architecture explanations and code walkthroughs supported by source references.',
      ru: 'Версия 0.1.0 описывает, как готовить объяснения архитектуры и кода со ссылками на исходники.',
    },
    caveat: {
      en: 'The result depends on whether the agent follows the instructions and checks the relevant source. The host platform renders Mermaid diagrams; this release has no end-to-end acceptance tests with an agent.',
      ru: 'Результат зависит от того, следует ли агент инструкции и проверяет ли нужные исходники. Диаграммы Mermaid рендерит платформа; сквозных приёмочных тестов с агентом в этой версии нет.',
    },
    tags: ['Agent skills', 'Markdown', 'Mermaid'],
    repository: 'https://github.com/sl4dk1y/Codebase-Atlas',
    title: { en: 'Codebase Atlas | sl4dk1y', ru: 'Codebase Atlas | sl4dk1y' },
    description: {
      en: 'Codebase Atlas is a portable agent skill for source-backed codebase walkthroughs and Mermaid diagrams.',
      ru: 'Codebase Atlas — переносимый навык для объяснений кодовой базы и диаграмм Mermaid, подтверждённых исходниками.',
    },
  },
  {
    id: 'context-waypoint',
    path: '/projects/context-waypoint/',
    name: 'Context Waypoint',
    featured: false,
    eyebrow: { en: 'Developer tooling', ru: 'Инструменты разработки' },
    maturity: { en: 'Published Agent Skill · v1.0.0', ru: 'Опубликованный навык для AI-агентов · v1.0.0' },
    summary: {
      en: 'A Markdown convention and agent skill that help carry concise project state and handoffs between work sessions.',
      ru: 'Правила ведения Markdown-записей и навык для AI-агентов, помогающие передавать краткое состояние проекта между сессиями.',
    },
    problem: {
      en: 'In a long task, decisions, constraints and next steps can get buried in chat history. A short project record gives the next session a clear starting point.',
      ru: 'В длительной задаче решения, ограничения и следующие шаги легко теряются в истории чата. Краткая запись помогает новой сессии понять, с чего продолжить.',
    },
    approach: {
      en: 'The skill keeps a short Markdown record in the project. A new session reads the current state and essential constraints first, then follows only links relevant to its task.',
      ru: 'Навык хранит краткую запись в Markdown внутри проекта. Новая сессия сначала читает текущее состояние и основные ограничения, а затем открывает только ссылки, связанные с задачей.',
    },
    architecture: {
      en: {
        type: 'sequence',
        steps: ['Capture verified state', 'Save project-local Markdown', 'Read current state and constraints', 'Follow relevant references', 'Resume or hand off work'],
      },
      ru: {
        type: 'sequence',
        steps: ['Зафиксировать проверенное состояние', 'Сохранить Markdown в проекте', 'Прочитать состояние и ограничения', 'Открыть только нужные ссылки', 'Продолжить работу или передать её'],
      },
    },
    diagramTitle: { en: 'Save context, then restore it for the next session', ru: 'Сохранение контекста и его восстановление в новой сессии' },
    diagramCaption: {
      en: 'CURRENT.md summarizes what matters now. The next session follows relevant decisions and handoffs as needed.',
      ru: 'CURRENT.md кратко описывает текущее состояние. В следующей сессии агент при необходимости открывает связанные решения и передачи работы.',
    },
    decisions: {
      en: [
        'Project records live in a `.context-waypoint/` directory beside the project files and remain plain Markdown.',
        'Store useful history broadly, but load only the records relevant to the current task.',
        'Current source and repository rules take precedence over stale context; secrets and private reasoning are excluded.',
      ],
      ru: [
        'Записи проекта хранятся в `.context-waypoint/` рядом с исходниками и остаются обычными Markdown-файлами.',
        'Полезный контекст можно сохранять, но для каждой задачи загружать только нужные записи.',
        'Актуальные исходники и правила проекта важнее устаревшего контекста; секреты и личные рассуждения не сохраняются.',
      ],
    },
    validation: {
      en: 'The local project includes the skill definition, operating model, record schema, reusable templates and a fictional Parcel Tracker example. It contains no automated tests or end-to-end agent evaluation.',
      ru: 'В локальном проекте есть описание навыка, модель работы, схема записей, шаблоны и вымышленный пример Parcel Tracker. Автоматических тестов и сквозной оценки работы агента в нём нет.',
    },
    outcome: {
      en: 'The convention gives a compatible agent a short, project-local record to use when work resumes.',
      ru: 'Конвенция даёт совместимому AI-агенту краткую запись о проекте, с которой можно продолжить работу.',
    },
    caveat: {
      en: 'The public repository includes the README, Agent Skill, templates, documentation and a project example. Context Waypoint is a Markdown convention and reusable skill. It is not a CLI or hosted platform.',
      ru: 'В публичном репозитории есть README, Agent Skill, шаблоны, документация и пример проекта. Context Waypoint представляет собой Markdown-конвенцию и переиспользуемый навык. Это не CLI и не облачная платформа.',
    },
    tags: ['Agent skills', 'Markdown', 'Project continuity'],
    repository: 'https://github.com/sl4dk1y/Context-Waypoint',
    repositoryStatus: {
      en: 'Public source, skill and templates',
      ru: 'Опубликованы исходники, навык и шаблоны',
    },
    title: { en: 'Context Waypoint | sl4dk1y', ru: 'Context Waypoint | sl4dk1y' },
    description: {
      en: 'A case study of a Markdown convention and agent skill for carrying project notes between work sessions.',
      ru: 'Кейс Context Waypoint: Markdown-конвенция и навык для передачи контекста проекта между сессиями AI-агента.',
    },
  },
  {
    id: 'human-writing',
    path: '/projects/human-writing/',
    name: 'Human Writing',
    featured: false,
    eyebrow: { en: 'Agent writing skill', ru: 'Навык для AI-агентов' },
    maturity: { en: 'Published · five languages', ru: 'Опубликован · пять языков' },
    summary: {
      en: 'An Agent Skill for editing prose to sound natural while preserving its meaning, facts and the writer’s voice.',
      ru: 'Agent Skill для редактуры текста: сохранить смысл, факты и авторский голос, убрав шаблонные обороты.',
    },
    problem: {
      en: 'Generated prose can rely on stock phrases, uniform rhythm and claims that sound more certain than the evidence. A word blacklist does not address those habits.',
      ru: 'В сгенерированном тексте встречаются шаблонные обороты, однообразный ритм и уверенные формулировки без опоры на факты. Список запрещённых слов эту проблему не решает.',
    },
    approach: {
      en: 'The skill guides an agent through editing for specific facts, clear claims and varied rhythm while preserving meaning. SKILL.md links to focused references, including language-specific guidance and examples.',
      ru: 'Навык помогает агенту редактировать текст: опираться на конкретные факты, формулировать мысли прямо и менять ритм, не искажая смысл. SKILL.md ссылается на профильные материалы, включая языковые рекомендации и примеры.',
    },
    architecture: {
      en: { type: 'sequence', steps: ['Source text', 'SKILL.md guidance', 'Editorial revision', 'Optional style check', 'Revised text'] },
      ru: { type: 'sequence', steps: ['Исходный текст', 'Правила SKILL.md', 'Редакторская переработка', 'Дополнительная проверка стиля', 'Итоговый текст'] },
    },
    diagramTitle: { en: 'A guided editing process', ru: 'Процесс редактуры с опорой на навык' },
    diagramCaption: {
      en: 'The Python checker is an optional offline aid. It flags patterns for human review and is not an authorship detector or required runtime step.',
      ru: 'Python-чекер работает офлайн и служит вспомогательным инструментом. Он отмечает признаки для ручной проверки, не определяет авторство и не является обязательным этапом.',
    },
    decisions: {
      en: [
        'The skill focuses on writing habits and structure rather than a fixed blacklist of words.',
        'SKILL.md points to references for general patterns and English, Russian, German, Spanish and French.',
        'The checker uses Python’s standard library, runs offline and makes no model calls.',
      ],
      ru: [
        'Навык обращает внимание на привычки письма и структуру, а не на фиксированный список запрещённых слов.',
        'SKILL.md ссылается на общие рекомендации и материалы на английском, русском, немецком, испанском и французском языках.',
        'Чекер использует стандартную библиотеку Python, работает офлайн и не обращается к моделям.',
      ],
    },
    validation: {
      en: 'The repository includes examples in five languages and an offline checker for dashes, formatting, sentence-length variation and phrase-list matches. Its signals are heuristic and require human review.',
      ru: 'В репозитории есть примеры на пяти языках и офлайн-чекер тире, форматирования, разброса длины предложений и совпадений с перечнями фраз. Его эвристические сигналы требуют ручной проверки.',
    },
    outcome: {
      en: 'The skill can guide writing and editing in agents that support the Agent Skills format. The checker highlights text for review; it cannot reliably determine whether a person or a model wrote it.',
      ru: 'Навык помогает писать и редактировать текст в агентах с поддержкой формата Agent Skills. Чекер выделяет фрагменты для проверки, но не может надёжно определить, написал их человек или модель.',
    },
    caveat: {
      en: 'The checker measures surface patterns. It does not understand context, judge authorship or replace editorial review.',
      ru: 'Чекер анализирует поверхностные признаки. Он не учитывает контекст, не определяет авторство и не заменяет редактуру.',
    },
    tags: ['Agent Skill', 'Python', 'Offline checker', 'Writing'],
    repository: 'https://github.com/sl4dk1y/human-writing',
    title: { en: 'Human Writing | sl4dk1y', ru: 'Human Writing | sl4dk1y' },
    description: {
      en: 'An Agent Skill for editing prose, with five-language guidance and an offline heuristic checker.',
      ru: 'Agent Skill для редактуры текста, рекомендации на пяти языках и офлайн-чекер стилистических признаков.',
    },
  },
]

export const ragReducedTestResults = [
  { method: 'BM25', recallAt10: 0.3693467336683417, ndcgAt10: 0.26848190128731 },
  { method: 'E5', recallAt10: 0.8130653266331658, ndcgAt10: 0.6414577447323627 },
  { method: 'E5 + BM25', recallAt10: 0.8125628140703518, ndcgAt10: 0.640806102822627 },
  { method: 'BGE-M3', recallAt10: 0.8613065326633167, ndcgAt10: 0.692025643506648 },
  { method: 'BGE-M3 + BM25', recallAt10: 0.8613065326633167, ndcgAt10: 0.6880752460342389 },
]

export const ragFullCorpusNprobeDev = [
  { method: 'nprobe 64', recallAt10: 0.744, ndcgAt10: 0.5614689661635603 },
  { method: 'nprobe 128', recallAt10: 0.7716363636363636, ndcgAt10: 0.5784979054023821 },
  { method: 'nprobe 256', recallAt10: 0.7847272727272727, ndcgAt10: 0.5883764877893177 },
  { method: 'nprobe 512', recallAt10: 0.7963636363636364, ndcgAt10: 0.5975157774938448 },
]
