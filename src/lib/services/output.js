const chalk = require('chalk');
const { compose, curry } = require('ramda');

const log = (output) => console.log(output, '\n');

const success = compose(log, chalk.green);
const successBold = compose(success, chalk.bold);
const warning = compose(log, chalk.yellow);
const stringify = curry(JSON.stringify);
const prettifyJson = (x) => stringify(x, undefined, 2);
const jsonOut = compose(log, chalk.cyan.bold, prettifyJson);
const error = compose(log, chalk.red);

module.exports = {
  success,
  successBold,
  jsonOut,
  warning,
  error,
};
