module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {},
};
