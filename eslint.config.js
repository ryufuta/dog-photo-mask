import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import vitest from '@vitest/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import playwright from 'eslint-plugin-playwright';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const configFiles = ['**/*.config.{js,ts}'];

export default defineConfig([
  globalIgnores(['dist', 'public']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended],
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          checkTypeImports: true,
          pattern: {
            js: 'always',
            jsx: 'always',
            ts: 'always',
            tsx: 'always',
          },
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react(-dom)?', '^node:', '^@?\\w', '^@/.*', '^\\.+/(?!assets/)'],
            ['^.+\\.json$', '^.+\\.(svg|png|jpg)$', '^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    ignores: configFiles,
    extends: [
      tseslint.configs.recommendedTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintReact.configs['recommended-type-checked'],
      jsxA11y.flatConfigs.recommended,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: configFiles,
    extends: [tseslint.configs.recommended],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['src/**/*.test.{ts,tsx}'],
    extends: [vitest.configs.recommended],
  },
  {
    files: ['e2e/**'],
    extends: [playwright.configs['flat/recommended']],
  },
  prettier,
]);
