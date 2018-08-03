const chalk = require('chalk');
const { isCurrentBillable, stopBillable } = require('../services/db');

const stopHandler = async () => {
  const currentBillable = await isCurrentBillable();

  if (currentBillable.ok) {
    await stopBillable(currentBillable.id);
    console.log(chalk.green('Billable hours stopped'));
  } else console.log(chalk.yellow('No current billable hours started'));
};

module.exports.stopHandler = stopHandler;
