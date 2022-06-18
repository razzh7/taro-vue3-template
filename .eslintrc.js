module.exports = {
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/prettier', '@vue/typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  env: {
    node: true,
    browser: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        arrowParens: 'avoid',
        printWidth: 100
      }
    ],
    'vue/multi-word-component-names': 0,
    'no-unused-vars': 'error',
    'no-var': 'error',
    'no-console': ['error', { allow: ['warn', 'error'] }]
  }
}
