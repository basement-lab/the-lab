
const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    experimentalObjectRestSpread: true,
    sourceType: 'module'
  },
  extends: [
    'airbnb',
  ],
  plugins: [
    'jsx-a11y',
    'import',
    'react',
  ],
  rules: {
    'camelcase': OFF,
    'comma-dangle': [ERROR, { // `airbnb` defaults to ERROR
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore' // this prevents "ESLint Autofix" from ADDING comas. Once we upgrade Node to support trailing commas in parameters we can eliminate this.
    }],
    'import/extensions': WARN,
    'jsx-a11y/href-no-hash': OFF,
    'spaced-comment': OFF
  }
};
