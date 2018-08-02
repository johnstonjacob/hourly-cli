module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: ['prettier', 'airbnb/base', 'plugin:jest/recommended'],
  plugins: ['jest'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': [2, 'always'],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
        ],
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
