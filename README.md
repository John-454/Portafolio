# John Chitan - Portfolio

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat-square&logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![CI/CD](https://img.shields.io/github/actions/workflow/status/John-454/portfolio/ci-cd.yml?style=flat-square&logo=githubactions)](https://github.com/John-454/portfolio/actions)

> **Full Stack Developer | Software Engineer | Building Secure & Scalable Web Applications**

Portafolio profesional desarrollado con **Astro 5**, **TypeScript** y **Tailwind CSS**. Diseñado para mostrar proyectos, experiencia y capacidades técnicas con enfoque en performance, seguridad, accesibilidad y mantenibilidad.

## 🌐 Demo en Vivo

**[johnchitan.dev](https://johnchitan.dev)** (desplegar en Cloudflare Pages / Vercel / Netlify)

## ✨ Características Principales

| Característica                 | Descripción                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| **⚡ Performance First**       | SSG nativo, zero-JS por defecto, imágenes optimizadas, fonts self-hosted            |
| **🔒 Security by Design**      | CSP estricto, headers de seguridad, sin backend = superficie de ataque mínima       |
| **♿ Accesibilidad WCAG AA**   | HTML semántico, navegación teclado, contraste, focus visible, ARIA cuando necesario |
| **🌙 Dark Mode**               | Persistido en localStorage, respeta `prefers-color-scheme`, sin flash (FOUC)        |
| **📱 Responsive Mobile-First** | Breakpoints fluidos con `clamp()`, touch-friendly                                   |
| **🔍 SEO Técnico Completo**    | Meta tags, Open Graph, Twitter Cards, JSON-LD, sitemap, robots.txt, RSS             |
| **🧪 Testing**                 | Vitest para utilidades, coverage thresholds                                         |
| **🚀 CI/CD Automatizado**      | Lint, typecheck, security audit, tests, build, deploy preview/producción            |
| **📝 Content Collections**     | Proyectos como archivos Markdown/MDX validados con Zod                              |
| **🎨 Design System**           | Tokens de color, tipografía, espaciado fluido, componentes atómicos                 |

## 🛠 Stack Tecnológico

| Capa           | Tecnología                      | Versión   |
| -------------- | ------------------------------- | --------- |
| **Framework**  | Astro                           | 5.x       |
| **Lenguaje**   | TypeScript                      | 5.x       |
| **Estilos**    | Tailwind CSS                    | 3.4       |
| **Contenido**  | Astro Content Collections (MDX) | -         |
| **Validación** | Zod                             | 3.23      |
| **Testing**    | Vitest                          | 2.x       |
| **Linting**    | ESLint + Prettier               | 9.x / 3.x |
| **Deploy**     | Cloudflare Pages                | -         |
| **CI/CD**      | GitHub Actions                  | -         |

## 📁 Estructura del Proyecto

```
portfolio/
├── public/                 # Assets estáticos
│   ├── fonts/             # Fuentes self-hosted (woff2)
│   ├── images/            # Imágenes optimizadas
│   ├── _headers           # Headers de seguridad (Cloudflare/Netlify)
│   ├── robots.txt
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes atómicos (Button, Card, Badge, Input, etc.)
│   │   ├── layout/       # Header, Footer, ThemeToggle, SEO
│   │   ├── sections/     # Hero, About, Projects, Experience, Services, Contact
│   │   └── project/      # ProjectCard, ProjectDetail
│   ├── content/
│   │   ├── projects/     # Un .md por proyecto (frontmatter + body)
│   │   └── config.ts     # Schemas Zod para validación
│   ├── data/             # Datos estáticos tipados
│   │   ├── personal.ts   # Info personal, SEO defaults
│   │   ├── skills.ts     # Stack técnico con niveles
│   │   ├── services.ts   # Servicios ofrecidos
│   │   └── experience.ts # Experiencia, formación, certificaciones
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── projects/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── about.astro
│   │   ├── experience.astro
│   │   ├── services.astro
│   │   ├── contact.astro
│   │   ├── rss.xml.js
│   │   └── sitemap-index.xml.js
│   ├── styles/
│   │   └── global.css    # Tailwind + custom properties + prose
│   ├── utils/
│   │   ├── helpers.ts    # Utilidades puras (cn, dates, slugify, etc.)
│   │   ├── seo.ts        # Generadores Open Graph, Twitter, JSON-LD
│   │   └── security.ts   # CSP, sanitización, headers
│   └── env.d.ts
├── .github/workflows/
│   └── ci-cd.yml         # Pipeline completo
├── .gitignore
├── .prettierrc           # Prettier (plugins astro + tailwindcss)
├── .prettierignore
├── astro.config.mjs
├── eslint.config.mjs     # ESLint 9 flat config
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 20+
- npm 10+
- Git

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/John-454/portfolio.git
cd portfolio

# Instalar dependencias
npm ci

# Desarrollo local
npm run dev
# → http://localhost:4321
```

### Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción (SSG)
npm run preview      # Preview del build local
npm run lint         # ESLint (flat config: .astro + .js)
npm run lint:fix     # ESLint + auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check
npm run typecheck    # Astro check (TypeScript, cubre src/**/*.ts)
npm run assets       # Regenera favicons, iconos PWA y og-portfolio.png
npm run cv           # Regenera public/cv.pdf desde src/data/ y src/content/
npm run audit        # npm audit (high/critical)
npm run test         # Vitest run
npm run test:watch   # Vitest watch mode
```

## 📦 Despliegue

### Cloudflare Pages (Recomendado)

1. Conectar repositorio en Cloudflare Pages
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version: `20`
5. Agregar variables de entorno si se usan

### Vercel / Netlify

Configuración similar, detecta Astro automáticamente.

### Variables de Entorno

```env
# Opcional - para Formspree u otros servicios
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxx
PUBLIC_SITE_URL=https://johnchitan.dev
```

## 🔧 Configuración

### Personalización Básica

Edita los archivos en `src/data/`:

- `personal.ts` → Nombre, bio, contactos, SEO
- `skills.ts` → Stack técnico con niveles (learning→expert)
- `services.ts` → Servicios ofrecidos
- `experience.ts` → Experiencia, formación, certificaciones

### Assets y CV

Los binarios generados (`favicons`, `icons/`, `images/og-portfolio.png` y `cv.pdf`)
se producen a partir de los datos del propio sitio, sin duplicar información:

```bash
npm run assets  # lee public/favicon.svg → favicons, iconos PWA (16-512px) y OG 1200x630
npm run cv      # lee src/data/*.ts + src/content/projects/*.md → public/cv.pdf
```

Ejecuta `npm run cv` cada vez que cambies experiencia, skills o proyectos.

### Agregar Proyectos

Crea un archivo `.md` en `src/content/projects/`:

```markdown
---
name: 'Mi Proyecto'
description: 'Descripción breve'
problem: 'Problema que resuelve'
solution: 'Solución implementada'
technologies: ['TypeScript', 'Angular', 'Node.js']
architecture: 'Clean Architecture'
features: ['Feature 1', 'Feature 2']
status: 'En producción'
role: 'Full Stack Developer'
technicalChallenges: ['Reto 1', 'Reto 2']
startDate: '2024-01'
endDate: '2024-12'
github: 'https://github.com/...'
demo: 'https://demo.com'
images: ['/images/projects/mi-proyecto/1.png']
featured: true
order: 1
---

Contenido detallado en Markdown/MDX...
```

### Temas y Colores

Modifica `tailwind.config.mjs` → `theme.extend.colors` para personalizar la paleta.

## 🔐 Seguridad

Este sitio implementa prácticas de **Secure Software Development**:

- **Sin backend** = sin superficie de ataque de servidor
- **CSP estricto** configurado en `_headers`
- **Headers de seguridad**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, CORP
- **Validación Zod** en todo frontmatter de contenido
- **Sanitización** en componentes que renderizan HTML
- **Dependencias auditadas** en CI (npm audit + audit-ci)
- **HTTPS forzado** por proveedor (HSTS)
- **Sin secretos en repo** - solo variables `PUBLIC_*`

Ver `_headers` para configuración completa de CSP.

## ♿ Accesibilidad

- HTML5 semántico (`header`, `main`, `section`, `article`, `nav`, `footer`)
- Navegación completa por teclado
- Focus visible en todos los elementos interactivos
- Contraste AA en todos los textos (ver `tailwind.config.mjs`)
- Alt text en todas las imágenes
- ARIA labels donde HTML nativo no basta
- `prefers-reduced-motion` respetado
- Skip link al contenido principal

## 📊 Performance

- **Lighthouse CI** recomendado en pipeline
- **Core Web Vitals** objetivo: LCP < 2.5s, CLS < 0.1, FID < 100ms
- Imágenes: formato AVIF/WebP, responsive, lazy loading nativo
- Fonts: self-hosted woff2 con `font-display: swap`
- CSS: JIT Tailwind, purgado, minificado
- JS: Solo islas interactivas hidratadas (`client:load`, `client:visible`)

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Con coverage
npm run test -- --coverage
```

Estrategia: Tests unitarios para utilidades puras (`helpers.ts`, `seo.ts`, `security.ts`). No tests de componentes visuales (cambio frecuente, bajo ROI).

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m "feat: descripción clara"`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

### Convenciones

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)
- **Code Style**: ESLint 9 (`eslint.config.mjs`, flat config) + Prettier (`.prettierrc`)
- **TypeScript**: Strict mode, no `any` implícito

> Los `.ts` sueltos no se lintean (no hay `typescript-eslint`); esa validación la
> cubre `npm run typecheck`. Para `.astro`, ESLint sí aplica el parser TypeScript
> del frontmatter gracias a `@typescript-eslint/parser`.

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 👤 Autor

**John Chitan**

- GitHub: [@John-454](https://github.com/John-454)
- LinkedIn: [john-deivid-chitan-cordoba](https://www.linkedin.com/in/john-deivid-chitan-cordoba-17a2b5336)
- Email: chitancordobajohndeivid@gmail.com

---

⭐ Si este proyecto te resulta útil, ¡dale una estrella en GitHub!
