import pixie from '@pixie-cheeks/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { files: ['**/*.{ts,js}'] },
  { ignores: ['dist'] },
  ...pixie.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.ts'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['{eslint,vite}.config.{js,ts}'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    files: ['src/**/*'],
    rules: {
      'no-console': 'off',
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },
  pixie.prettier,
]);
