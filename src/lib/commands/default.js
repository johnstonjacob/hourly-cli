const chalk = require('chalk');
const { isCurrentBillable, stopBillable, startBillable } = require('../services/db');


const defaultHandler = async () => {
  const currentBillable = await isCurrentBillable();
  if (currentBillable.ok) {
    await stopBillable(currentBillable.id);
    console.log(chalk.green('Billable hours stopped'));
  } else {
    await startBillable();
    console.log(chalk.green('Billable hours started'));
  }
};


module.exports.defaultHandler = defaultHandler;
