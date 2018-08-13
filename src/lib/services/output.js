const chalk = require('chalk');

const log = (output) => console.log(output, '\n');

const success = (message) => log(chalk.green(message));
const successBold = (message) => log(chalk.green.bold(message));
const warning = (message) => log(chalk.yellow(message));
const prettifyJson = (json) => JSON.stringify(json, undefined, 2);
const jsonOut = (message) => log(chalk.cyan.bold(message));
const error = (message) => log(chalk.red(message));

module.exports = {
  success,
  successBold,
  jsonOut,
  prettifyJson,
  warning,
  error,
};
