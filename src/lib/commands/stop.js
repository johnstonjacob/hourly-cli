const chalk = require('chalk');
const { isCurrentBillable, stopBillable } = require('../services/db');
const { text } = require('../constants.json');
const { hhmmToMs } = require('../services/helpers');

const stopHandler = async (time) => {
  const { milliseconds, ok } = hhmmToMs(time);
  if (!ok) {
    console.log(chalk.red(text.invalid_param));
    process.exit(1);
  }
  const currentBillable = await isCurrentBillable();

  const endTime = Date.now() - milliseconds;

  if (currentBillable.ok) {
    await stopBillable(currentBillable.id, endTime);
    console.log(chalk.green(text.stopped));
  } else console.log(chalk.yellow(text.no_timer_running));
};

module.exports.stopHandler = stopHandler;
