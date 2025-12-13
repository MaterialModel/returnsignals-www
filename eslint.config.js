import eslintPluginAstro from 'eslint-plugin-astro';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  // Base configuration for TypeScript files
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },
  // Astro configuration
  ...eslintPluginAstro.configs['flat/recommended'],
  // Global ignores
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.astro/',
      'materialmodel-terraform/',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      'public/',
    ],
  },
];
