import pixie from '@pixie-cheeks/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { files: ['**/*.ts,js,cjs'] },
  { ignores: ['dist'] },
  ...pixie.base,
  {
    files: ['eslint.config.js', 'vite.config.ts'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['src/**/*'],
    rules: {
      'no-console': 'off',
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
      'n/no-unsupported-features/node-builtins': 'off',
      'n/hashbang': [
        'warn',
        {
          ignoreUnpublished: true,
        },
      ],
    },
  },
  pixie.prettier,
]);
