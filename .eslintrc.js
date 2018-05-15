module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'space-before-function-paren': 0,
    'padded-blocks': 0,
    'comma-dangle': ['error', {
      arrays: 'ignore',
      objects: 'ignore',
      imports: 'ignore',
      exports: 'ignore',
      functions: 'ignore'
    }],
    "vue/max-attributes-per-line": [2, {
      "singleline": 4,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
  }
}
