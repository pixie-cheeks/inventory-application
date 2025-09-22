import pixie from '@pixie-cheeks/eslint-config';
import { defineConfig } from 'eslint/config';
import { configs as tseslintConfigs } from 'typescript-eslint';
import type { ConfigWithExtends } from 'typescript-eslint';
import { importX as pluginImportX } from 'eslint-plugin-import-x';

export default defineConfig([
  { files: ['**/*.{ts,js}'] },
  { ignores: ['dist'] },
  // ...pixie.base,
  tseslintConfigs.strictTypeChecked,
  tseslintConfigs.stylisticTypeChecked,
  pluginImportX.flatConfigs.typescript as ConfigWithExtends[],
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        { allowNumber: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
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
      'no-console': 'off',
      // 'unicorn/filename-case': ['error', { cases: { camelCase: true } }],
    },
  },
  pixie.prettier,
]);
