module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
  },
  extends: ['prettier', 'airbnb/base'],
  plugins: ['mocha'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'mocha/no-exclusive-tests': 'error',
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
