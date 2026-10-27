import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.vite/**',
      '**/eslint.config.*',
      '**/vite.config.*',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['apps/api/**/*.ts', 'apps/web/**/*.ts', 'apps/web/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  eslintConfigPrettier,
);
