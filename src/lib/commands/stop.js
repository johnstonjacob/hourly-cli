const chalk = require('chalk');
const { isCurrentBillable, stopBillable } = require('../services/db');
const { text } = require('../constants.json');

const stopHandler = async () => {
  const currentBillable = await isCurrentBillable();

  if (currentBillable.ok) {
    await stopBillable(currentBillable.id);
    console.log(chalk.green(text.stopped));
  } else console.log(chalk.yellow(text.no_timer_running));
};

module.exports.stopHandler = stopHandler;
