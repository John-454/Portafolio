import type { IconName } from '@/utils/icons';

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: IconName;
  stack: string[];
  features: string[];
  process: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: 'fullstack-development',
    title: 'Desarrollo Full Stack',
    shortDescription: 'Aplicaciones web completas: frontend, backend, base de datos y despliegue.',
    description:
      'Construyo aplicaciones web end-to-end usando TypeScript en toda la pila. Desde la arquitectura inicial hasta el despliegue en producción, aplicando Clean Architecture, testing automatizado y prácticas de código limpio.',
    icon: 'layers',
    stack: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker'],
    features: [
      'Arquitectura limpia y escalable (Clean/Hexagonal)',
      'TypeScript end-to-end con tipos compartidos',
      'Testing: unit, integration, E2E',
      'CI/CD automatizado con GitHub Actions',
      'Despliegue en contenedores (Docker/K8s)',
      'Observabilidad: logs, métricas, tracing',
    ],
    process: [
      'Discovery & arquitectura',
      'Setup repo + CI/CD + environments',
      'Desarrollo iterativo (sprints 2 semanas)',
      'Code review + testing automatizado',
      'Staging → Production con feature flags',
      'Handoff + documentación + soporte',
    ],
    cta: 'Conversar sobre tu proyecto',
  },
  {
    id: 'api-development',
    title: 'Desarrollo de APIs',
    shortDescription: 'APIs REST y GraphQL robustas, documentadas y seguras.',
    description:
      'Diseño y construyo APIs que sirven como backbone confiable para frontends, apps móviles e integraciones terceras. Enfoque en contratos claros, versionado, rendimiento y seguridad.',
    icon: 'plug',
    stack: ['Node.js', 'TypeScript', 'Express/Fastify', 'GraphQL/Apollo', 'OpenAPI/Swagger', 'Zod'],
    features: [
      'RESTful con OpenAPI 3.1 / GraphQL Schema-first',
      'Validación estricta de entrada (Zod)',
      'Autenticación/Autorización (JWT, OAuth2, API Keys)',
      'Rate limiting, throttling, circuit breaker',
      'Paginación, filtrado, sorting estandarizados',
      'Documentación interactiva (Swagger/GraphQL Playground)',
      'Testing de contratos (Pact) y carga (k6)',
    ],
    process: [
      'Diseño de contrato (OpenAPI/GraphQL SDL)',
      'Implementación TDD',
      'Validación + seguridad + observabilidad',
      'Documentación automática',
      'Deploy con versionado semántico',
      'Monitoreo + alertas',
    ],
    cta: 'Diseñar tu API',
  },
  {
    id: 'enterprise-web-apps',
    title: 'Aplicaciones Web Empresariales',
    shortDescription:
      'Sistemas complejos para operaciones de negocio: ERPs, CRMs, portales, dashboards.',
    description:
      'Desarrollo de aplicaciones empresariales con flujos de trabajo complejos, roles/permisos granulares, auditoría, multi-tenancy y cumplimiento normativo.',
    icon: 'building',
    stack: ['Angular', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
    features: [
      'RBAC/ABAC granular + auditoría completa',
      'Multi-tenancy (schema/shared DB/híbrido)',
      'Workflows y máquinas de estado',
      'Importación/exportación masiva (Excel/CSV/PDF)',
      'Internacionalización (i18n) y localización',
      'Cumplimiento: LGPD/GDPR, accesibilidad WCAG AA',
    ],
    process: [
      'Levantamiento de requisitos + domain modeling',
      'Arquitectura + decisión tecnológica',
      'MVP core domain (2-4 sprints)',
      'Módulos incrementales + feedback usuario',
      'Hardening: seguridad, performance, a11y',
      'Go-live + hipercare + evolución continua',
    ],
    cta: 'Evaluar tu sistema',
  },
  {
    id: 'database-integration',
    title: 'Integración de Bases de Datos',
    shortDescription:
      'Modelado, migración, optimización y sincronización de datos relacionales y no relacionales.',
    description:
      'Diseño esquemas que escalan, migro datos sin downtime, optimizo consultas lentas y configuro replicación/backup/recuperación ante desastres.',
    icon: 'database',
    stack: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma/Mongoose', 'Flyway/Liquibase'],
    features: [
      'Modelado relacional y documental',
      'Migraciones versionadas y reversibles',
      'Optimización de índices y query plans',
      'Replicación, sharding, backup point-in-time',
      'CDC (Change Data Capture) para sincronización',
      'Data governance: lineage, quality, privacy',
    ],
    process: [
      'Auditoría de esquema y cargas actuales',
      'Diseño target + plan de migración',
      'Migración en sombra (shadow) + validación',
      'Cutover planificado + rollback ready',
      'Post-migration tuning + monitoreo',
      'Documentación + runbooks operativos',
    ],
    cta: 'Optimizar tus datos',
  },
  {
    id: 'automation',
    title: 'Automatización',
    shortDescription:
      'Pipelines CI/CD, infraestructura como código, bots y flujos de trabajo autónomos.',
    description:
      'Elimino trabajo manual repetitivo y propenso a errores mediante automatización inteligente: pipelines, IaC, chatops, webhooks y agentes.',
    icon: 'zap',
    stack: ['GitHub Actions', 'Docker', 'Terraform', 'Ansible', 'Node.js', 'TypeScript'],
    features: [
      'Pipelines multi-entorno con gates de calidad',
      'Infraestructura como código (Terraform)',
      'Policy as Code (OPA/Rego) para compliance',
      'Dependabot + renovate + security scanning',
      'ChatOps: Slack/Discord/Teams integration',
      'Automatización de releases (semantic-release)',
    ],
    process: [
      'Mapeo de procesos manuales actuales',
      'Diseño de pipeline objetivo',
      'Implementación incremental',
      'Validación en staging + feedback',
      'Rollout a producción + métricas',
      'Mejora continua (DORA metrics)',
    ],
    cta: 'Automatizar tu flujo',
  },
  {
    id: 'ai-development',
    title: 'Desarrollo con IA',
    shortDescription:
      'Integración de LLMs, RAG, agentes y herramientas de IA en tus productos y flujos de desarrollo.',
    description:
      'Aplico IA generativa de forma pragmática: asistentes de código, búsqueda semántica en documentación, clasificación automática, generación de tests y features conversacionales.',
    icon: 'sparkles',
    stack: ['OpenAI/Anthropic APIs', 'LangChain/LlamaIndex', 'Vector DBs', 'TypeScript', 'Node.js'],
    features: [
      'RAG sobre docs técnicos / código / tickets',
      'Agentes para tareas repetitivas (PR reviews, tests)',
      'Clasificación/extracción de datos no estructurados',
      'Copiloto interno para onboarding devs',
      'Evaluación y guardrails (prompt injection, PII)',
      'Cost/latency optimization (caching, routing)',
    ],
    process: [
      'Identificación de caso de uso de alto ROI',
      'Prototipo rápido (spike 1-2 semanas)',
      'Evaluación: calidad, costo, latencia, riesgo',
      'Hardening: evals, guardrails, observabilidad',
      'Integración en producto/pipeline',
      'Iteración basada en feedback real',
    ],
    cta: 'Explorar casos de uso IA',
  },
  {
    id: 'secure-development',
    title: 'Secure Software Development',
    shortDescription:
      'Integración de seguridad en todo el ciclo de vida: código, dependencias, pipeline, runtime.',
    description:
      'Aplico prácticas de Secure by Design y DevSecOps para reducir superficie de ataque, detectar vulnerabilidades temprano y responder rápido. No ofrezco servicios de pentesting ni auditoría formal; mi enfoque es ingeniería de software segura.',
    icon: 'shield-check',
    stack: [
      'SAST (Semgrep/CodeQL)',
      'SCA (Dependabot/Snyk)',
      'DAST (OWASP ZAP)',
      'CSP',
      'OPA/Rego',
      'GitHub Actions',
    ],
    features: [
      'SAST/SCA en cada PR (fail on high/critical)',
      'Dependency scanning + auto-PR updates',
      'Container scanning (Trivy/Grype)',
      'CSP estricto + security headers',
      'Secrets detection (GitLeaks/TruffleHog)',
      'Policy as Code para compliance',
      'Threat modeling ligero (STRIDE) en design docs',
      'Secure coding guidelines + code review checklist',
    ],
    process: [
      'Baseline: auditoría rápida de postura actual',
      'Quick wins: headers, deps, secrets, CSP',
      'Pipeline gates: SAST/SCA/container scan',
      'Developer enablement: guidelines + tooling',
      'Continuous: monitoring, alerting, rotation',
      'Madurez: threat modeling, ADR security, SBOM',
    ],
    cta: 'Fortalecer tu postura de seguridad',
  },
];

export const serviceCategories = [
  {
    key: 'development',
    label: 'Desarrollo',
    services: ['fullstack-development', 'api-development', 'enterprise-web-apps'],
  },
  {
    key: 'data',
    label: 'Datos & Automatización',
    services: ['database-integration', 'automation'],
  },
  { key: 'emerging', label: 'Emergente', services: ['ai-development', 'secure-development'] },
];
