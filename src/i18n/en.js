export default {
  // Cover
  cover: {
    tagline: 'Senior Fullstack Engineer\nNode.js · React · Microservices\nSt. Petersburg, RU',
    stat1: 'Years in production',
    stat2: 'Highload APIs in production',
    stat3: 'Companies / projects',
    cta: 'START DETAIL →',
  },

  // Overview
  overview: {
    eyebrow: 'Overview',
    title: 'Slide <em>menu</em>.',
    tiles: [
      { title: 'Three Pillars', desc: 'Backend, Frontend, DevOps', icon: '◇' },
      { title: 'Career Timeline', desc: 'From PHP to AI agents', icon: '→' },
      { title: 'Tech Stack', desc: 'Production experience by years', icon: '▥' },
      { title: 'Engineering DNA', desc: 'Patterns, practices, domains', icon: '◆' },
      { title: 'Highload Blueprint', desc: 'How I design systems', icon: '⬡' },
      { title: 'Toolkit', desc: 'Full technology spectrum', icon: '⊞' },
      { title: 'Contact', desc: "Let's talk", icon: '↗' },
    ],
  },

  // Pillars
  pillars: {
    eyebrow: 'Core competencies',
    title: 'Three engineering <em>pillars</em>.',
    subtitle: 'Tap each card to expand.',
    items: [
      {
        title: 'Backend', titleEm: 'at scale.',
        desc: 'Microservices, REST/GraphQL, event-driven architecture with Kafka and RabbitMQ.',
        detail: '// NestJS · TypeScript · Python · Postgres · Mongo\n// 6+ years, 5+ production microservice systems\n// OpenAPI-first, RBAC, highload-tested',
      },
      {
        title: 'Frontend', titleEm: 'with taste.',
        desc: 'React, Next.js, Vue. SSR, design systems, Storybook, real component libraries shipped to teams.',
        detail: '// React 6+ · Next.js 4+ · Vue 2+\n// Component libraries published to npm\n// Owned UI architecture on multi-team products',
      },
      {
        title: 'DevOps', titleEm: '& delivery.',
        desc: 'GitLab CI multi-stage pipelines, Docker, Kubernetes, isolated environments, automated releases.',
        detail: '// k8s · Docker · GitLab CI · GitHub Actions\n// Built release automation with AI agents at Sber\n// SSL auto-renewal, container registries, Jenkins',
      },
    ],
  },

  // Timeline
  timeline: {
    eyebrow: 'Career path',
    title: '10 years of <em>growing</em> through technology.',
    items: [
      { year: '2015', place: 'Eto Elementarno', role: 'PHP / Symfony', domain: 'Enterprise software',
        detail: 'Symfony 2.6/3.2, OracleDB, SOAP API. Bug fixing, new features, working with testers in a team on large-scale projects.',
        stack: 'PHP · Symfony · OracleDB · SOAP' },
      { year: '2017', place: 'Intercomp', role: 'PHP / Phalcon', domain: 'IT outsourcing',
        detail: 'Service development and support. MySQL, MSSQL, Phalcon framework, server-side + client-side JS.',
        stack: 'PHP · Phalcon · MySQL · MSSQL' },
      { year: '2018', place: 'Space307', role: 'Fullstack · React', domain: 'Fintech · EdTech',
        detail: 'Fintech/EdTech platform (stocksup.com). Real-time trading education portal: React/Redux with WebSocket for live quotes, chat, and interactive polls. Built web + iOS WebView + Android WebView versions. Shared component library via Storybook for the team. Backoffice for KYC verification and landing page constructor. Team: 1 fullstack, 1 frontend, 1 backend, 1 QA, 1 designer, 1 analyst.',
        stack: 'React · Redux · WebSocket · Storybook · Jest · PHP · WordPress · k8s' },
      { year: '2020', place: 'FutureComes', role: 'Next + Nest', domain: 'GameDev CRM · PropTech · Crypto',
        detail: 'Informal tech lead across three projects. estoty.com — game studio CRM for project and content management (Next.js + NestJS). themetters.ru — property aggregator: Python scrapers pulling 200-400MB CSV dumps every 10 min from major platforms (Cian, Avito, etc.), feeding into ML models for price estimation, clustering, and deduplication. Bequant crypto exchange blog — Vue.js CMS + landing pages.',
        stack: 'Next.js · NestJS · Python · Vue.js · MongoDB · RabbitMQ · Redis' },
      { year: '2021', place: 'Citydrive', role: 'Backend / Node', domain: 'Carsharing · Mobility',
        detail: 'Backoffice for customer and fleet engineer requests. Chatbot features. Vehicle telemetry integration. Traffic fines service. Monorepo decomposition into microservices. Team of 5 backend devs.',
        stack: 'Node.js · TypeScript · Angular · MongoDB · RabbitMQ · PostgreSQL' },
      { year: '2022.01', place: 'Lanck Telecom', role: 'Fullstack Developer', domain: 'Telecom · Antifraud',
        detail: 'Internal dev, team of 2. Built npm component library wrapping Ant Design for distribution across company projects and partner admin panels. Telecom antifraud traffic monitoring dashboards. Strapi CMS for public website and partner landing pages. Unified SSO via LDAP/Active Directory integration with a master admin panel for role and access management.',
        stack: 'React · Ant Design · Strapi · Node.js · MySQL · Redis · LDAP' },
      { year: '2022.11', place: 'Dom.ru', role: 'Senior · 6M users', domain: 'Telecom · Highload',
        detail: 'Microservices architecture for 6M+ user telecom platform. Core services: personal account, subscriptions, callbacks, CRM, router management. PHP → NestJS migration. Internal npm packages (DTO, OpenAPI HTTP clients). Kafka event-driven backbone. 5+ cross-functional teams.',
        stack: 'NestJS · TypeScript · Kafka · MongoDB · Redis · k8s · OpenSearch · Grafana' },
      { year: '2025.02', place: 'b-charge', role: 'Senior · Fullstack / DevOps', domain: 'HR-tech',
        detail: 'HR recruitment platform with RBAC. Fullstack architecture design. GraphQL API. Isolated environments (testing/production). GitLab CI multi-stage pipelines, Docker, SSL auto-renewal. Mentoring junior/middle devs.',
        stack: 'NestJS · React · Next.js · GraphQL · PostgreSQL · S3 · GitLab CI · Docker' },
      { year: '2025.09', place: 'Sber', role: 'Senior · AI Systems', domain: 'AI initiatives team',
        detail: 'AI agent development on self-hosted n8n platform. Release cycle automation — Jenkins pipelines orchestrated by Python scripts. Integration with Jira, Bitbucket, DPM. State machine-based orchestration. Reduced manual release operations to near-zero. Automated reporting and decision-making through AI agents.',
        stack: 'Python · n8n · Jenkins · REST API · Jira API · Bitbucket' },
    ],
  },

  // Stack
  stack: {
    eyebrow: 'Technology depth',
    title: 'Stack <em>by</em> years.',
    desc: 'Real production exposure, not weekend tutorials. Every bar represents shipped systems serving real users at scale.',
  },

  // Engineering DNA (slide 06)
  dna: {
    eyebrow: 'Engineering DNA',
    title: 'What <em>11 years</em> look like inside.',
    blocks: [
      {
        icon: '◆', label: 'Architecture patterns',
        items: [
          'Microservices decomposition',
          'Event-driven (Kafka, RabbitMQ)',
          'API-first (OpenAPI, GraphQL)',
          'RBAC / ACL (CASL, LDAP)',
          'CQRS-like read/write split',
          'Domain-driven module isolation',
        ],
      },
      {
        icon: '▲', label: 'Engineering practices',
        items: [
          'CI/CD multi-stage pipelines',
          'OpenAPI-generated clients & DTOs',
          'Isolated environments per branch',
          'Observability (Grafana, OpenSearch)',
          'Unit + integration testing (Jest)',
          'Internal npm package ecosystem',
        ],
      },
      {
        icon: '●', label: 'Domain experience',
        items: [
          'Telecom · 6M+ users (Dom.ru)',
          'Carsharing · fleet telemetry (Citydrive)',
          'Fintech · trading portals (PLC.01)',
          'PropTech · ML aggregation (FutureComes)',
          'HR-tech · RBAC platform (b-charge)',
          'AI automation · release agents (Sber)',
        ],
      },
      {
        icon: '★', label: 'Leadership',
        items: [
          'Mentoring junior / middle devs',
          'Cross-team architectural decisions',
          'Task decomposition & estimation',
          'Code review culture',
          'Stakeholder communication',
          'Release process ownership',
        ],
      },
    ],
  },

  // Case (legacy, kept for reference)
  case: {
    eyebrow: 'Case · Dom.ru telecom · 6M users',
    title: 'System <em>ownership</em> at scale.',
    layerIngress: 'Ingress',
    layerServices: 'Domain services (NestJS)',
    layerInfra: 'Data & infrastructure',
    svcAccount: 'Personal account',
    svcSubs: 'Subscriptions',
    svcCallback: 'Callbacks',
    svcRouter: 'Router mgmt',
    svcNotify: 'Notifications',
    decisions: [
      { label: 'Architecture', text: 'Decomposed PHP monolith into event-driven NestJS microservices. Each domain — isolated module, own data store, Kafka as the backbone.' },
      { label: 'Developer platform', text: 'Built internal npm packages: shared DTOs, OpenAPI-generated HTTP clients. Reduced integration time across 5+ teams.' },
      { label: 'Observability', text: 'OpenSearch for log aggregation, Grafana dashboards per service. On-call playbooks tied to alerts.' },
    ],
    metric1: 'Platform users',
    metric2: 'Parallel teams',
    metric3: 'Core services',
    metric4: 'Internal packages',
  },

  // Architecture — reference highload blueprint
  arch: {
    eyebrow: 'Highload blueprint',
    title: 'How I <em>design</em> systems.',
    prompt: '← Click any layer to explore the reasoning',
    layers: [
      {
        label: 'Ingress & API Gateway',
        color: 'dim',
        nodes: ['CDN', 'Nginx', 'API Gateway', 'Rate Limiter'],
        title: 'Single <em>entry point</em>.',
        detail: 'All traffic goes through a reverse proxy with rate limiting, SSL termination, and request routing. API Gateway handles auth, versioning, and request validation before anything hits domain services.',
        why: 'Isolates internal topology from clients. Allows zero-downtime deploys, canary releases, and per-route rate limiting without touching business logic.',
      },
      {
        label: 'Domain services (NestJS)',
        color: 'green',
        nodes: ['Account', 'Subscriptions', 'Notifications', 'CRM', 'Auth / RBAC'],
        title: 'Each domain — <em>isolated</em> module.',
        detail: 'DI-based modular architecture. Each subdomain owns its controllers, services, guards, and data store. OpenAPI generated from decorators. Shared DTOs and HTTP clients distributed as internal npm packages.',
        why: 'Teams can deploy independently. Schema-first contracts prevent integration drift. Internal packages cut boilerplate across 5+ teams.',
      },
      {
        label: 'Event backbone',
        color: 'orange',
        nodes: ['Kafka', 'RabbitMQ', 'BullMQ', 'Dead-letter topics'],
        title: '<em>Event-driven</em> by default.',
        detail: 'Domain events with schemas. Idempotent handlers with event_id deduplication. Dead-letter topics for retry logic. BullMQ for deferred jobs and scheduled tasks. RabbitMQ for lightweight RPC where Kafka is overkill.',
        why: 'Services stay decoupled. Failures are contained — a broken notification service doesn\'t block payments. Replay capability for debugging and recovery.',
      },
      {
        label: 'Data layer',
        color: 'blue',
        nodes: ['PostgreSQL', 'MongoDB', 'Redis', 'OpenSearch', 'S3'],
        title: 'Right <em>storage</em> for the job.',
        detail: 'Postgres for transactional data (partial indexes, partitioning, read replicas). Mongo for flexible document schemas. Redis for sessions, rate limiting, caching. OpenSearch for log aggregation and full-text search. S3 for file storage.',
        why: 'No single database fits all workloads. Polyglot persistence reduces latency at read-heavy endpoints and keeps write paths clean.',
      },
      {
        label: 'Infra & observability',
        color: 'yellow',
        nodes: ['Docker', 'Kubernetes', 'GitLab CI', 'Grafana', 'Alerting'],
        title: 'Ship fast, <em>see everything</em>.',
        detail: 'Multi-stage CI/CD pipelines. Isolated environments per branch. Containerized deploys on k8s with auto-scaling. Grafana dashboards per service. On-call playbooks tied to alerts. Structured logging to OpenSearch.',
        why: 'If you can\'t see it, you can\'t fix it. Observability is not optional at 6M+ users — it\'s the first thing I set up, not the last.',
      },
    ],
  },

  // Skills
  skills: {
    eyebrow: 'Tooling spectrum',
    title: 'The full <em>toolkit</em>.',
  },

  // Contact
  contact: {
    eyebrow: 'Next step',
    title: "Let's <em>talk</em>.",
    subtitle: 'Open to senior fullstack and architecture-track roles. Remote, hybrid, or relocation considered.',
    email: 'Email',
    telegram: 'Telegram',
    phone: 'Phone',
    demo: 'Mobile Demo',
    demoDesc: 'PatternQuest — logic game built with Expo + NestJS',
    demoPlay: 'Play in browser',
    demoAndroid: 'Download APK',
    demoSource: 'Source code',
    demo2: 'ChainPulse',
    demo2Desc: 'Multi-chain portfolio tracker — Solana + TON, InversifyJS, RxJS',
    demo2Open: 'Open dashboard',
    demo2Bot: 'Telegram bot',
  },

  // Navigation
  nav: {
    session: 'SESSION',
    slide: 'SLIDE',
    viewTime: 'VIEW TIME',
    brand: 'VEEVA CLM · DETAIL AID',
  },
};
