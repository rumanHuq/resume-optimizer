//  @ts-check
import js from '@eslint/js';
import { tanstackConfig } from '@tanstack/eslint-config';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const otherConfigs = defineConfig([{
      // -------------------------------------------------------
    // SETTINGS (React + Import alias support)
    // -------------------------------------------------------
    settings: {
      react: { version: 'detect' },
    },
   // -------------------------------------------------------
    // PLUGINS
    // -------------------------------------------------------
    plugins: {
      prettier,
    },
  // -------------------------------------------------------
    // EXTENDS
    // -------------------------------------------------------
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      reactRefresh.configs.vite,
    ],
  rules: {
    // --------------------------
    // React strictness
    // --------------------------
    'react/self-closing-comp': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-undef': 'error',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-array-index-key': 'warn',
    'react/no-danger': 'warn',
    'react/no-direct-mutation-state': 'error',
    'react/no-multi-comp': 'error',
    'react/no-unused-state': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: false }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],

    // --------------------------
    // JS strictness (Airbnb-like)
    // --------------------------
    eqeqeq: ['error', 'always'],
    'no-var': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-template': 'error',
    'no-useless-concat': 'error',
    'no-multi-assign': 'error',
    'no-nested-ternary': 'error',
    'no-lonely-if': 'error',
    'no-unreachable-loop': 'error',
    'no-param-reassign': ['error', { props: true }],
    'no-else-return': 'error',
    'no-extend-native': 'error',
    'no-return-assign': ['error', 'always'],
    'no-unused-expressions': ['error', { allowTaggedTemplates: false }],
    'no-shadow': 'error',
          // --------------------------
      // TypeScript strictness
      // --------------------------
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],

      '@typescript-eslint/strict-boolean-expressions': [
        'error',
        {
          // allowNullableObject: false,
          allowNullableBoolean: false,
          allowString: false,
          allowNumber: false,
        },
      ],

      // ban-types replacement (correct for v8+)
      '@typescript-eslint/no-restricted-types': [
        'error',
        {
          types: {
            '{}': {
              message: 'Avoid `{}` — use a more specific type.',
              fixWith: 'Record<string, unknown>',
            },
            Function: {
              message: 'Avoid `Function` — use a typed function signature.',
            },
            Object: {
              message: 'Avoid `Object` — use a more specific type.',
            },
            Number: {
              message: 'Avoid wrapper type `Number` — use `number`.',
            },
          },
        },
      ],

      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-unsafe-function-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-duplicate-type-constituents': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',

      // --------------------------
      // Prettier
      // --------------------------
      'prettier/prettier': 'error',
      // --------------------------
      // Buggy rules
      // --------------------------
    "import/order": "off",
    "no-duplicate-imports": "off",
    "react/no-children-prop": "off",
  }
}]);
export default [...tanstackConfig, ...otherConfigs];
