import js from '@eslint/js';
import globals from 'globals';

export default [
  {
    ignores: ['**/node_modules/**', 'client/dist/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
