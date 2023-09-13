module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  globals: {
    defineNuxtPlugin: false,
    defineNuxtConfig: false,
    useNuxtApp: false,
    computed: false,
    toRefs: false,
    onMounted: false,
  },
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
