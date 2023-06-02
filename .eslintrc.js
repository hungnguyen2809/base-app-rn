module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-shadow': 'off',
        'no-undef': 'off',
        'no-var': 'error',
        'no-console': 'error',
        'prefer-const': 'error',
        curly: ['error', 'multi-line'],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/ban-ts-comment': 'off',
        'import/newline-after-import': 'error',
        'import/imports-first': ['error', 'absolute-first'],
        'react/no-unstable-nested-components': 'off',
      },
    },
  ],
};
