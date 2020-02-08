module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    "@typescript-eslint",
    'vue',
  ],
  extends: [
    "airbnb-typescript/base",
    "plugin:vue/recommended"
  ],
  rules: {
    'max-len': "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'lines-between-class-members': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'vue/no-v-html': 'off',
    'no-plusplus': 'off'
  },
};
