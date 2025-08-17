import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { 
    files: [
      // '**/*.{js,mjs,cjs,ts,jsx,tsx}'
    ] 

  },
  { languageOptions: { globals: { ...globals.browser, __REACT_DEVTOOLS_GLOBAL_HOOK__: 'readonly', module: 'readonly' } } },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
];
