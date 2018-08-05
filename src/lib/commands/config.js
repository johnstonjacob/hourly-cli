const chalk = require('chalk');
const { changeConfig, getConfig } = require('../services/configstore');

function parseNewValue(newValue) {
  try {
    if (typeof JSON.parse(newValue) === 'boolean') return Boolean(newValue);
  } catch (error) {
    return newValue;
  }
  return newValue;
}

function configHandler(option, newValue) {
  if (!option) {
    const config = JSON.stringify(getConfig(), undefined, 2);

    console.log(chalk.yellow('Printing all configuration options.\n'));
    console.log(chalk.cyan.bold(config));

    process.exit(0);
  }

  if (!newValue) {
    const config = JSON.stringify(getConfig(option), undefined, 2);

    console.log(chalk.yellow(`Printing ${option} option.\n`));
    console.log(chalk.cyan.bold(config));

    process.exit(0);
  }

  const value = parseNewValue(newValue);
  const ok = changeConfig(option, value);

  if (ok) console.log(chalk.yellow(`Changed ${option} to ${newValue}`));
  else console.log(chalk.red('Invalid option or paraemter'));
}

module.exports = {
  configHandler,
};
