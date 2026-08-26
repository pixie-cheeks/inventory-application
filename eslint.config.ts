import pixie from '@pixie-cheeks/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { files: ['**/*.{ts,js}'] },
  { ignores: ['dist'] },
  ...pixie.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        // projectService: {
        // allowDefaultProject: ['*.js', '*.ts'],
        // },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-void': ['error', { allowAsStatement: true }],
      'no-restricted-syntax': 'off',
      'no-continue': 'off',
      'no-restricted-globals': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            arguments: false,
            attributes: false,
          },
        },
      ],
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
      '@typescript-eslint/explicit-function-return-type': 'error',
      'no-console': 'off',
      'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
      camelcase: 'off',
    },
  },
  {
    files: ['src/tools/**/*'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
  {
    files: ['src/public/**/*'],

    languageOptions: {
      globals: pixie.globals.browser,
    },
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
  pixie.prettier,
]);
