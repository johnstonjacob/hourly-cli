const chalk = require('chalk');
const { isCurrentBillable, startBillable } = require('../services/db');

const startHandler = async () => {
  const currentBillable = await isCurrentBillable();

  if (!currentBillable.ok) {
    await startBillable();
    console.log(chalk.green('Billable hours started'));
  }
};

module.exports.startHandler = startHandler;
