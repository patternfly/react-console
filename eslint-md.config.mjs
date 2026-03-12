import markdown from '@eslint/markdown';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/public/**',
      '**/.cache/**',
      '**/node_modules/**',
      '**/generated/**',
      '**/CHANGELOG.md'
    ]
  },
  {
    files: ['packages/**/*.md'],
    plugins: {
      markdown
    },
    language: 'markdown/gfm',
    rules: {
      'markdown/no-multiple-h1': 'off',
      'markdown/heading-increment': 'off',
      'markdown/no-missing-label-refs': 'off'
    }
  },
  {
    files: ['packages/**/*.md/*.js', 'packages/**/*.md/*.jsx'],
    plugins: {
      react
    },
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: '18'
      }
    },
    rules: {
      'eol-last': 'error',
      'spaced-comment': 'error',
      'no-unused-vars': 'off',
      'no-this-before-super': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-unknown-property': 'error',
      'react/jsx-no-undef': 'error'
    }
  }
];
