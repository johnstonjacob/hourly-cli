const chalk = require('chalk');
const compose = require('lodash/fp/compose');
const curryRight = require('lodash/fp/curryRight');

const log = (output) => console.log(output, '\n');

const success = compose(log, chalk.green);
const successBold = compose(log, chalk.green.bold);
const warning = compose(log, chalk.yellow);
const stringify = curryRight(JSON.stringify);
const prettifyJson = stringify(undefined, 2);
const jsonOut = compose(log, chalk.cyan.bold, prettifyJson);
const error = compose(log, chalk.red);

module.exports = {
  success,
  successBold,
  jsonOut,
  prettifyJson,
  warning,
  error,
};
