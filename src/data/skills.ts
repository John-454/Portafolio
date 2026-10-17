export type SkillLevel = 'learning' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  name: string;
  level: SkillLevel;
  category: string;
  years?: number;
  description?: string;
}

export const skills: Skill[] = [
  // Languages
  {
    name: 'TypeScript',
    level: 'advanced',
    category: 'languages',
    years: 4,
    description:
      'Tipado estricto, generics avanzados, utility types, configuración tsconfig estricta',
  },
  {
    name: 'JavaScript',
    level: 'advanced',
    category: 'languages',
    years: 5,
    description: 'ES2024+, async/await, módulos, runtime Node/browser',
  },
  {
    name: 'Python',
    level: 'intermediate',
    category: 'languages',
    years: 2,
    description: 'Fundamentos, scripting, automatización, enseñanza',
  },

  // Frontend
  {
    name: 'Angular',
    level: 'advanced',
    category: 'frontend',
    years: 4,
    description:
      'Standalone components, signals, RxJS, Angular Material, testing, SSR/SSG con Angular Universal',
  },
  {
    name: 'RxJS',
    level: 'advanced',
    category: 'frontend',
    years: 4,
    description: 'Observables, operators, subjects, schedulers, marble testing',
  },
  {
    name: 'HTML5 / CSS3',
    level: 'advanced',
    category: 'frontend',
    years: 5,
    description: 'Semántica, accessibility, CSS Grid/Flexbox, custom properties, animations',
  },
  {
    name: 'Tailwind CSS',
    level: 'advanced',
    category: 'frontend',
    years: 2,
    description: 'Utility-first, design tokens, dark mode, JIT, plugins',
  },
  {
    name: 'Astro',
    level: 'intermediate',
    category: 'frontend',
    years: 1,
    description: 'Islands, content collections, MDX, image optimization, static generation',
  },

  // Backend
  {
    name: 'Node.js',
    level: 'advanced',
    category: 'backend',
    years: 4,
    description:
      'Express, Fastify, middleware, streams, clustering, worker_threads, native addons basics',
  },
  {
    name: 'Express.js',
    level: 'advanced',
    category: 'backend',
    years: 4,
    description: 'Routing, middleware, error handling, validation, OpenAPI/Swagger',
  },
  {
    name: 'GraphQL',
    level: 'advanced',
    category: 'backend',
    years: 3,
    description:
      'Apollo Server, schema design, resolvers, DataLoader, subscriptions, federation basics',
  },
  {
    name: 'REST API Design',
    level: 'advanced',
    category: 'backend',
    years: 4,
    description: 'Resource modeling, versioning, HATEOAS, pagination, filtering, rate limiting',
  },
  {
    name: 'JWT / OAuth2 / OIDC',
    level: 'advanced',
    category: 'backend',
    years: 3,
    description: 'Access/refresh tokens, rotation, revocation, PKCE, scopes, claims',
  },

  // Databases
  {
    name: 'MongoDB',
    level: 'advanced',
    category: 'databases',
    years: 4,
    description:
      'Aggregation pipelines, indexes, transactions, schema design, Mongoose, change streams',
  },
  {
    name: 'PostgreSQL',
    level: 'intermediate',
    category: 'databases',
    years: 2,
    description: 'Relational modeling, JSONB, CTEs, window functions, performance tuning basics',
  },
  {
    name: 'Redis',
    level: 'intermediate',
    category: 'databases',
    years: 2,
    description: 'Caching, sessions, pub/sub, rate limiting, Lua scripting basics',
  },

  // Architecture & Patterns
  {
    name: 'Clean Architecture',
    level: 'advanced',
    category: 'architecture',
    years: 3,
    description: 'Layers, dependency rule, use cases, entities, ports & adapters',
  },
  {
    name: 'Hexagonal Architecture',
    level: 'advanced',
    category: 'architecture',
    years: 2,
    description: 'Domain-driven, ports & adapters, testing in isolation',
  },
  {
    name: 'Domain-Driven Design',
    level: 'intermediate',
    category: 'architecture',
    years: 2,
    description: 'Aggregates, value objects, domain events, bounded contexts',
  },
  {
    name: 'CQRS / Event Sourcing',
    level: 'intermediate',
    category: 'architecture',
    years: 1,
    description: 'Command/Query separation, event store basics, projections',
  },
  {
    name: 'Microservices',
    level: 'intermediate',
    category: 'architecture',
    years: 2,
    description: 'Service boundaries, API gateway, saga pattern, observability',
  },
  {
    name: 'SOLID / GRASP',
    level: 'advanced',
    category: 'architecture',
    years: 4,
    description: 'Principios de diseño orientado a objetos, coupling/cohesion',
  },

  // Tools & DevOps
  {
    name: 'Git / GitHub',
    level: 'advanced',
    category: 'tools',
    years: 5,
    description: 'Workflows, rebasing, conventional commits, GitHub Actions, Codespaces',
  },
  {
    name: 'Docker',
    level: 'advanced',
    category: 'tools',
    years: 3,
    description: 'Multi-stage builds, compose, networking, volumes, security scanning',
  },
  {
    name: 'GitHub Actions',
    level: 'advanced',
    category: 'tools',
    years: 3,
    description: 'Workflows, matrices, reusable workflows, OIDC, security gates',
  },
  {
    name: 'CI/CD',
    level: 'advanced',
    category: 'tools',
    years: 3,
    description: 'Pipelines, environments, approval gates, rollback strategies',
  },
  {
    name: 'Linux / Bash',
    level: 'intermediate',
    category: 'tools',
    years: 3,
    description: 'CLI, scripting, permissions, processes, systemd, SSH',
  },
  {
    name: 'VS Code',
    level: 'advanced',
    category: 'tools',
    years: 5,
    description: 'Extensions, debugging, tasks, snippets, remote development',
  },

  // Security (Learning focus)
  {
    name: 'OWASP Top 10',
    level: 'learning',
    category: 'security',
    years: 1,
    description: 'A01-A10 2021/2023, threat modeling basics, secure code review',
  },
  {
    name: 'Secure SDLC',
    level: 'learning',
    category: 'security',
    years: 1,
    description: 'SAST/DAST/SCA integration, shift-left, dependency scanning',
  },
  {
    name: 'CSP / Security Headers',
    level: 'intermediate',
    category: 'security',
    years: 2,
    description: 'Content Security Policy, HSTS, COOP/COEP, permissions policy',
  },
  {
    name: 'Input Validation / Sanitization',
    level: 'advanced',
    category: 'security',
    years: 3,
    description: 'Zod, validator.js, DOMPurify, XSS/Injection prevention',
  },
  {
    name: 'Cryptography Basics',
    level: 'beginner',
    category: 'security',
    years: 1,
    description: 'Hashing, symmetric/asymmetric, TLS, certificates, key management',
  },

  // AI-Assisted Development
  {
    name: 'GitHub Copilot',
    level: 'advanced',
    category: 'ai',
    years: 2,
    description: 'Prompt engineering, chat, inline suggestions, custom instructions',
  },
  {
    name: 'LLM Fundamentals',
    level: 'intermediate',
    category: 'ai',
    years: 1,
    description: 'Prompt design, RAG basics, function calling, evaluation',
  },
  {
    name: 'AI Code Review',
    level: 'learning',
    category: 'ai',
    years: 1,
    description: 'Automated review tools, security-focused prompting',
  },

  // Learning / Evolving
  {
    name: 'Application Security',
    level: 'learning',
    category: 'learning',
    description: 'SAST/DAST/IAST/SCA, threat modeling, secure design patterns',
  },
  {
    name: 'DevSecOps',
    level: 'learning',
    category: 'learning',
    description: 'Pipeline security gates, policy as code, SBOM, supply chain security',
  },
  {
    name: 'Cloud Security',
    level: 'learning',
    category: 'learning',
    description: 'AWS/Azure/GCP security services, IAM, network security, compliance',
  },
  {
    name: 'Kubernetes',
    level: 'beginner',
    category: 'learning',
    description: 'Pods, services, ingress, configmaps, secrets, RBAC, operators',
  },
  {
    name: 'Rust',
    level: 'beginner',
    category: 'learning',
    description: 'Ownership, borrowing, lifetimes, async, WASM for web',
  },
  {
    name: 'WebAssembly',
    level: 'beginner',
    category: 'learning',
    description: 'WASM modules, Rust/AssemblyScript compilation, performance',
  },
];

export const skillCategories = [
  { key: 'languages', label: 'Lenguajes', icon: 'code' },
  { key: 'frontend', label: 'Frontend', icon: 'monitor' },
  { key: 'backend', label: 'Backend', icon: 'server' },
  { key: 'databases', label: 'Bases de Datos', icon: 'database' },
  { key: 'architecture', label: 'Arquitectura', icon: 'layers' },
  { key: 'tools', label: 'Herramientas & DevOps', icon: 'wrench' },
  { key: 'security', label: 'Seguridad (Learning)', icon: 'shield' },
  { key: 'ai', label: 'IA Aplicada', icon: 'sparkles' },
  { key: 'learning', label: 'En Aprendizaje', icon: 'book-open' },
] as const;
