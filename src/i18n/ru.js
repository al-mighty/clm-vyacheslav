export default {
  // Cover
  cover: {
    tagline: 'Senior Fullstack Engineer\nNode.js · React · Microservices\nСанкт-Петербург',
    stat1: 'Лет в продакшне',
    stat2: 'Highload API в продакшне',
    stat3: 'Компаний / проектов',
    cta: 'НАЧАТЬ ПРОСМОТР →',
    support: 'Поддержать',
  },

  // Overview
  overview: {
    eyebrow: 'Обзор',
    title: 'Меню <em>слайдов</em>.',
    tiles: [
      { title: 'Три столпа', desc: 'Backend, Frontend, DevOps', icon: '◇' },
      { title: 'Карьерный путь', desc: 'От PHP до AI-агентов', icon: '→' },
      { title: 'Стек технологий', desc: 'Опыт по годам в продакшне', icon: '▥' },
      { title: 'Инженерная ДНК', desc: 'Паттерны, практики, домены', icon: '◆' },
      { title: 'Highload-чертёж', desc: 'Как я проектирую системы', icon: '⬡' },
      { title: 'Инструменты', desc: 'Полный спектр технологий', icon: '⊞' },
      { title: 'Контакты', desc: 'Давайте поговорим', icon: '↗' },
    ],
  },

  // Pillars
  pillars: {
    eyebrow: 'Ключевые компетенции',
    title: 'Три инженерных <em>столпа</em>.',
    subtitle: 'Нажмите на карточку для раскрытия.',
    items: [
      {
        title: 'Backend', titleEm: 'на масштабе.',
        desc: 'Микросервисы, REST/GraphQL, event-driven архитектура с Kafka и RabbitMQ.',
        detail: '// NestJS · TypeScript · Python · Postgres · Mongo\n// 6+ лет, 5+ продакшн микросервисных систем\n// OpenAPI-first, RBAC, highload-tested',
      },
      {
        title: 'Frontend', titleEm: 'со вкусом.',
        desc: 'React, Next.js, Vue. SSR, дизайн-системы, Storybook, реальные компонентные библиотеки.',
        detail: '// React 6+ · Next.js 4+ · Vue 2+\n// Компонентные библиотеки в npm\n// Архитектура UI на мультикомандных продуктах',
      },
      {
        title: 'DevOps', titleEm: 'и доставка.',
        desc: 'GitLab CI multi-stage пайплайны, Docker, Kubernetes, изолированные окружения, автоматизация релизов.',
        detail: '// k8s · Docker · GitLab CI · GitHub Actions\n// Автоматизация релизов с AI-агентами в Сбере\n// SSL-автопродление, container registries, Jenkins',
      },
    ],
  },

  // Timeline
  timeline: {
    eyebrow: 'Карьерный путь',
    title: '10 лет <em>роста</em> сквозь технологии.',
    items: [
      { year: '2015', place: 'Это элементарно', role: 'PHP / Symfony', domain: 'Корпоративный софт',
        detail: 'Symfony 2.6/3.2, OracleDB, SOAP API. Исправление багов, доработка функционала, разработка новых фич в команде с тестировщиками.',
        stack: 'PHP · Symfony · OracleDB · SOAP' },
      { year: '2017', place: 'Intercomp', role: 'PHP / Phalcon', domain: 'IT-аутсорсинг',
        detail: 'Разработка и поддержка сервисов. MySQL, MSSQL, Phalcon framework, серверная + клиентская часть.',
        stack: 'PHP · Phalcon · MySQL · MSSQL' },
      { year: '2018', place: 'Space307', role: 'Fullstack · React', domain: 'Финтех · EdTech',
        detail: 'Финтех/EdTech платформа (stocksup.com). Образовательный трейдинг-портал: React/Redux с WebSocket для котировок в реальном времени, чат, интерактивные опросы. Веб + iOS WebView + Android WebView версии. Shared-библиотека компонентов через Storybook для команды. Бэкофис для KYC-верификации и конструктор лендингов. Команда: 1 fullstack, 1 frontend, 1 backend, 1 QA, 1 дизайнер, 1 аналитик.',
        stack: 'React · Redux · WebSocket · Storybook · Jest · PHP · WordPress · k8s' },
      { year: '2020', place: 'FutureComes', role: 'Next + Nest', domain: 'GameDev CRM · PropTech · Крипто',
        detail: 'Неформальный техлид на трёх проектах. estoty.com — CRM игровой студии для управления проектами и контентом (Next.js + NestJS). themetters.ru — агрегатор недвижимости: Python-скраперы выгружали CSV-дампы по 200-400МБ каждые 10 мин с площадок (Циан, Авито и др.), данные шли в ML-модели для оценки цен, кластеризации и дедупликации. Блог криптобиржи Bequant — Vue.js CMS + лендинги.',
        stack: 'Next.js · NestJS · Python · Vue.js · MongoDB · RabbitMQ · Redis' },
      { year: '2021', place: 'Ситидрайв', role: 'Backend / Node', domain: 'Каршеринг · Мобильность',
        detail: 'Бэкофис для заявок клиентов и инженеров автопарка. Чат-бот. Телеметрия автопарка. Интеграция со «ШтрафовНЕТ». Декомпозиция монорепы на микросервисы. Команда из 5 бэкенд-разработчиков.',
        stack: 'Node.js · TypeScript · Angular · MongoDB · RabbitMQ · PostgreSQL' },
      { year: '2022.01', place: 'Ланк Телеком', role: 'Fullstack Developer', domain: 'Телеком · Антифрод',
        detail: 'Внутренняя разработка, команда из 2 человек. Создал npm-библиотеку компонентов поверх Ant Design для распространения по проектам компании и партнёрским админкам. Дашборды мониторинга антифрод-трафика в телекоме. Strapi CMS для публичного сайта и партнёрских лендингов. Единый SSO через LDAP/Active Directory с мастер-админкой управления ролями и доступами.',
        stack: 'React · Ant Design · Strapi · Node.js · MySQL · Redis · LDAP' },
      { year: '2022.11', place: 'Дом.ру', role: 'Senior · 6M users', domain: 'Телеком · Highload',
        detail: 'Микросервисная архитектура для телеком-платформы на 6М+ пользователей. Ключевые сервисы: личный кабинет, подписки, обратный звонок, CRM, управление роутером. Миграция PHP → NestJS. Внутренние npm-пакеты (DTO, OpenAPI HTTP-клиенты). Kafka event-driven. 5+ кросс-функциональных команд.',
        stack: 'NestJS · TypeScript · Kafka · MongoDB · Redis · k8s · OpenSearch · Grafana' },
      { year: '2024', place: 'HeroPayments', role: 'Senior · Fullstack', domain: 'Финтех · Крипто-платежи',
        detail: 'Криптоплатёжная платформа. Fastify API, 20+ микросервисов-воркеров (процессинг, вывод средств, агрегация курсов, колбэки). Ledger-сервис на PostgreSQL с Sequelize. NATS для межсервисного взаимодействия. Фронтенды: React (Mantine), Lit Web Components, Next.js админка, встраиваемый платёжный виджет. Интеграция с Ethereum и Tron. Совмещал с работой в Дом.ру.',
        stack: 'Fastify · TypeScript · PostgreSQL · Redis · NATS · React · Next.js · Lit · ethers.js · Sequelize' },
      { year: '2025.02', place: 'b-charge (аутстафф)', role: 'Senior · Fullstack / DevOps', domain: 'HR-tech',
        detail: 'Платформа подбора сотрудников с RBAC: fullstack-архитектура, GraphQL API, изолированные окружения, GitLab CI multi-stage, Docker, SSL-автопродление, менторство junior/middle.',
        stack: 'NestJS · React · Next.js · GraphQL · PostgreSQL · S3 · GitLab CI · Docker' },
      { year: '2025.09', place: 'Сбер (аутстафф)', role: 'Senior · AI Systems', domain: 'Команда AI-инициатив',
        detail: 'Разработка AI-агентов на self-hosted n8n. Автоматизация релизного цикла — Jenkins-пайплайны, оркестрированные Python-скриптами. Интеграция с Jira, Bitbucket, DPM. Оркестрация по принципу state machine. Ручные операции при релизах сведены к минимуму. Автоматическая отчётность и принятие решений через AI-агентов.',
        stack: 'Python · n8n · Jenkins · REST API · Jira API · Bitbucket' },
    ],
  },

  // Stack
  stack: {
    eyebrow: 'Глубина стека',
    title: 'Стек <em>по</em> годам.',
    desc: 'Реальный продакшн-опыт, не пет-проекты выходного дня. Каждая полоса — отгруженные системы с реальными пользователями.',
  },

  // Engineering DNA (slide 06)
  dna: {
    eyebrow: 'Инженерная ДНК',
    title: 'Что стоит за <em>11 годами</em>.',
    blocks: [
      {
        icon: '◆', label: 'Архитектурные паттерны',
        items: [
          'Декомпозиция в микросервисы',
          'Event-driven (Kafka, RabbitMQ)',
          'API-first (OpenAPI, GraphQL)',
          'RBAC / ACL (CASL, LDAP)',
          'CQRS-like разделение чтение/запись',
          'Domain-driven изоляция модулей',
        ],
      },
      {
        icon: '▲', label: 'Инженерные практики',
        items: [
          'CI/CD multi-stage пайплайны',
          'OpenAPI-генерация клиентов и DTO',
          'Изолированные окружения на ветку',
          'Observability (Grafana, OpenSearch)',
          'Unit + интеграционные тесты (Jest)',
          'Экосистема внутренних npm-пакетов',
        ],
      },
      {
        icon: '●', label: 'Доменный опыт',
        items: [
          'Телеком · 6М+ пользователей (Дом.ру)',
          'Каршеринг · телеметрия парка (Ситидрайв)',
          'Финтех · торговые порталы (Space307)',
          'Крипто-платежи · процессинг (HeroPayments)',
          'PropTech · ML-агрегация (FutureComes)',
          'HR-tech · RBAC-платформа (b-charge)',
          'AI-автоматизация · релизные агенты (Сбер)',
        ],
      },
      {
        icon: '★', label: 'Лидерство',
        items: [
          'Менторство junior / middle',
          'Кросс-командные архитектурные решения',
          'Декомпозиция и оценка задач',
          'Культура code review',
          'Коммуникация со стейкхолдерами',
          'Владение релизным процессом',
        ],
      },
    ],
  },

  // Case (legacy, kept for reference)
  case: {
    eyebrow: 'Кейс · Дом.ру телеком · 6М пользователей',
    title: '<em>Владение</em> системой на масштабе.',
    layerIngress: 'Ingress',
    layerServices: 'Доменные сервисы (NestJS)',
    layerInfra: 'Данные и инфраструктура',
    svcAccount: 'Личный кабинет',
    svcSubs: 'Подписки',
    svcCallback: 'Обратный звонок',
    svcRouter: 'Управл. роутером',
    svcNotify: 'Уведомления',
    decisions: [
      { label: 'Архитектура', text: 'Декомпозиция PHP-монолита в event-driven NestJS микросервисы. Каждый домен — изолированный модуль, своё хранилище, Kafka как backbone.' },
      { label: 'Платформа разработки', text: 'Внутренние npm-пакеты: shared DTO, HTTP-клиенты из OpenAPI. Сократил время интеграции между 5+ командами.' },
      { label: 'Observability', text: 'OpenSearch для агрегации логов, Grafana-дашборды по каждому сервису. Playbook-и для on-call привязаны к алертам.' },
    ],
    metric1: 'Пользователей платформы',
    metric2: 'Параллельных команд',
    metric3: 'Ключевых сервисов',
    metric4: 'Внутренних пакетов',
  },

  // Architecture — reference highload blueprint
  arch: {
    eyebrow: 'Highload-чертёж',
    title: 'Как я <em>проектирую</em> системы.',
    prompt: '← Нажмите на слой, чтобы увидеть логику решений',
    layers: [
      {
        label: 'Ingress и API Gateway',
        color: 'dim',
        nodes: ['CDN', 'Nginx', 'API Gateway', 'Rate Limiter'],
        title: 'Единая <em>точка входа</em>.',
        detail: 'Весь трафик через reverse proxy с rate limiting, SSL termination и маршрутизацией. API Gateway отвечает за авторизацию, версионирование и валидацию до того, как запрос дойдёт до доменных сервисов.',
        why: 'Изолирует внутреннюю топологию от клиентов. Позволяет zero-downtime деплои, канареечные релизы и per-route rate limiting без правок бизнес-логики.',
      },
      {
        label: 'Доменные сервисы (NestJS)',
        color: 'green',
        nodes: ['Account', 'Subscriptions', 'Notifications', 'CRM', 'Auth / RBAC'],
        title: 'Каждый домен — <em>изолированный</em> модуль.',
        detail: 'Модульная DI-архитектура. Каждый поддомен владеет контроллерами, сервисами, гардами и хранилищем. OpenAPI из декораторов. Shared DTO и HTTP-клиенты — внутренние npm-пакеты.',
        why: 'Команды деплоят независимо. Schema-first контракты предотвращают drift интеграций. Внутренние пакеты убирают бойлерплейт в 5+ командах.',
      },
      {
        label: 'Event-backbone',
        color: 'orange',
        nodes: ['Kafka', 'RabbitMQ', 'BullMQ', 'Dead-letter topics'],
        title: '<em>Event-driven</em> по умолчанию.',
        detail: 'Domain events со схемами. Идемпотентные обработчики с дедупликацией по event_id. Dead-letter topics для retry. BullMQ для отложенных задач. RabbitMQ для лёгкого RPC где Kafka избыточна.',
        why: 'Сервисы остаются развязанными. Отказы локализованы — сломанные уведомления не блокируют оплаты. Replay для дебага и восстановления.',
      },
      {
        label: 'Слой данных',
        color: 'blue',
        nodes: ['PostgreSQL', 'MongoDB', 'Redis', 'OpenSearch', 'S3'],
        title: 'Правильное <em>хранилище</em> под задачу.',
        detail: 'Postgres для транзакционных данных (partial-индексы, partitioning, read-реплики). Mongo для гибких документных схем. Redis для сессий, rate limiting, кеширования. OpenSearch для агрегации логов и полнотекстового поиска. S3 для файлов.',
        why: 'Ни одна БД не подходит для всех нагрузок. Polyglot persistence снижает latency на read-heavy эндпоинтах и держит write-path чистым.',
      },
      {
        label: 'Инфра и observability',
        color: 'yellow',
        nodes: ['Docker', 'Kubernetes', 'GitLab CI', 'Grafana', 'Alerting'],
        title: 'Деплоить быстро, <em>видеть всё</em>.',
        detail: 'Multi-stage CI/CD пайплайны. Изолированные окружения на ветку. Контейнерные деплои на k8s с автоскейлингом. Grafana-дашборды на сервис. On-call плейбуки привязаны к алертам. Структурированные логи в OpenSearch.',
        why: 'Если не видишь — не починишь. Observability на 6М+ пользователей — это первое, что я настраиваю, а не последнее.',
      },
    ],
  },

  // Skills
  skills: {
    eyebrow: 'Спектр инструментов',
    title: 'Полный <em>набор</em>.',
  },

  // Demos
  demos: {
    eyebrow: 'Живые демо',
    title: 'Собрано <em>и задеплоено</em>.',
    open: 'Открыть',
    items: [
      { icon: '⛓', title: 'ChainPulse', desc: 'Мультичейн портфолио трекер: InversifyJS, RxJS, TON Connect', url: 'https://cheslav.space/chainpulse/', tags: ['Solana', 'TON', 'InversifyJS', 'RxJS', 'NestJS'] },
      { icon: '🎮', title: 'PatternQuest', desc: 'Логическая игра — Expo React Native + NestJS бэкенд', url: 'https://cheslav.space/game/', tags: ['Expo', 'React Native', 'NestJS', 'WebSocket'] },
      { icon: '🔍', title: 'DaData Demo', desc: 'Поиск адресов/компаний: Next.js 15 Server Actions + SmartCaptcha', url: 'https://cheslav.space/dadata/', tags: ['Next.js 15', 'Server Actions', 'Zod', 'Captcha'] },
      { icon: '⚡', title: 'WebRTC SpeedTest', desc: 'P2P измерение задержки, пропускной способности и потерь пакетов', url: 'https://cheslav.space/webrtc/speedtest/', tags: ['WebRTC', 'DataChannel', 'WebSocket', 'P2P'] },
      { icon: '💊', title: 'PharmaRAG', desc: 'AI-ассистент по фармдокументации: RAG + GigaChat + pgvector', url: 'https://cheslav.space/pharma-rag/', tags: ['FastAPI', 'pgvector', 'GigaChat', 'RAG', 'React'] },
      { icon: '🔗', title: 'LinkPulse', desc: 'URL-шортенер с аналитикой кликов: Go + Redis + PostgreSQL', url: 'https://cheslav.space/linkpulse/', tags: ['Go', 'chi', 'Redis', 'PostgreSQL', 'React'] },
      { icon: '🐛', title: 'Bug Survivors', desc: 'Vampire Survivors для IT: 9 ролей, 10 режимов, Telegram Mini App', url: 'https://t.me/BugSurvivorsbot/game', tags: ['PixiJS', 'Go', 'PostgreSQL', 'Telegram'] },
    ],
  },

  // Contact
  contact: {
    eyebrow: 'Следующий шаг',
    title: 'Давайте <em>поговорим</em>.',
    subtitle: 'Открыт для позиций senior fullstack и architecture-track. Удалённо или гибрид.',
    email: 'Почта',
    telegram: 'Телеграм',
    phone: 'Телефон',
    support: 'Поддержка',
    supportLink: '☕ Поддержать',
    demo: 'Мобильное демо',
    demoDesc: 'PatternQuest — логическая игра на Expo + NestJS',
    demoPlay: 'Играть в браузере',
    demoAndroid: 'Скачать APK',
    demoSource: 'Исходный код',
    demo2: 'ChainPulse',
    demo2Desc: 'Мультичейн портфолио трекер — Solana + TON, InversifyJS, RxJS',
    demo2Open: 'Открыть дашборд',
    demo2Bot: 'Telegram бот',
  },

  // Navigation
  nav: {
    session: 'СЕССИЯ',
    slide: 'СЛАЙД',
    viewTime: 'ВРЕМЯ ПРОСМОТРА',
    brand: 'VEEVA CLM · DETAIL AID',
  },
};
