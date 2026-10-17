// Configuración flat (ESLint 9). El formato legacy `.eslintrc.json` NO lo lee
// ESLint 9, y además su `extends: ["prettier"]` apuntaba a `eslint-config-prettier`,
// que no estaba instalado: por eso `npm run lint` fallaba y esas reglas nunca
// se ejecutaron. Aquí se portan a flat config.
//
// Nota: los `.ts` sueltos no se lintean porque no hay `typescript-eslint`
// (espree no parsea TypeScript). Ese chequeo lo cubre `npm run typecheck`.
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Reglas compartidas portadas del antiguo .eslintrc.json.
const projectRules = {
  // `console.log` se elimina en build (terser drop_console); sólo avisos/errores.
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'prefer-const': 'error',
  'no-var': 'error',
  // astro/missing-client-only-directive-value ya viene en flat/recommended;
  // se redeclara explícitamente para mantener la intención del repo.
  'astro/missing-client-only-directive-value': 'warn',
};

export default [
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'coverage/**', 'public/**'],
  },
  ...astro.configs['flat/base'],
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    plugins: { 'jsx-a11y': jsxA11y },
    // jsx-a11y sólo reconoce la prop `htmlFor` (convención JSX) y por defecto no
    // sabe que en Astro el atributo se escribe `for`. Sin este mapeo,
    // `label-has-associated-control` ignora el `for` real y da un falso positivo.
    settings: {
      'jsx-a11y': {
        attributes: { for: ['htmlFor', 'for'] },
      },
    },
    rules: {
      ...projectRules,
      ...jsxA11y.flatConfigs.recommended.rules,

      // Reglas que en el .eslintrc.json eran 'warn'.
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',

      // Los controles propios del proyecto cuentan como controles para el
      // assertion "nesting" (renderizan un <input>/<textarea> real).
      'jsx-a11y/label-has-associated-control': [
        'error',
        { controlComponents: ['Input'], depth: 8 },
      ],

      // Sintaxis TS en el frontmatter de los .astro (antes regla `astro/semi`).
      semi: 'error',

      // `role="list"` en <ul>/<ol> es redundante *según la spec*, pero aquí es
      // deliberado: Tailwind Preflight (@tailwind base) quita `list-style` y
      // Safari/VoiceOver entonces descarta el rol de lista. Reactivarlo es el
      // fix documentado para conservar la semántica de lista en VoiceOver.
      'jsx-a11y/no-redundant-roles': 'off',
    },
  },
  {
    // Sólo JS plano: aquí `no-unused-vars` sí es fiable. En .astro el frontmatter
    // es TS y el core no-unsafe-vars daría falsos positivos sobre `interface`;
    // eso lo cubre `npm run typecheck` (ts(6133)).
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        document: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      ...projectRules,
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
  {
    // Los scripts de generación (assets/CV) y utilidades de build comunican por
    // consola a propósito: ahí `console.log` es la salida, no un residuo.
    files: ['scripts/**/*.{js,mjs,cjs}', '_*.{js,mjs,cjs}'],
    rules: {
      'no-console': 'off',
    },
  },
];
