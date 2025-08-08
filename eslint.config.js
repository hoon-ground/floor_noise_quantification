import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  react.configs.recommended,
  reactHooks.configs.recommended,
  {
    plugins: { prettier },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
