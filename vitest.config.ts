import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  // Vitest no lee `paths` de tsconfig.json: los alias deben declararse aquí.
  resolve: {
    alias: {
      '@utils': src('utils'),
      '@components': src('components'),
      '@data': src('data'),
      '@content': src('content'),
      '@': src(''),
    },
  },
  test: {
    globals: true,
    // Los tests cubren funciones puras (helpers.ts): no se necesita DOM.
    // Usar 'jsdom' obligaría a instalar esa dependencia sin motivo.
    environment: 'node',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '.astro/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/*.astro',
        'src/pages/**',
        'src/layouts/**',
        'src/components/ui/**',
      ],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 30,
        statements: 50,
      },
    },
  },
});
