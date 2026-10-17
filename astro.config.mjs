import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import { loadEnv } from 'vite';

// `site` alimenta canonical/OG/sitemap. Se puede sobreescribir con
// PUBLIC_SITE_URL (ver .env.example) p. ej. en despliegues de preview; sin
// variable definida mantiene el dominio de producción.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'PUBLIC_');
const site = env.PUBLIC_SITE_URL || 'https://johnchitan.dev';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [tailwind({ applyBaseStyles: false }), mdx()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    optimizeDeps: {
      include: ['clsx', 'tailwind-merge'],
    },
  },
});
