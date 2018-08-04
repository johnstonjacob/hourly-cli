const chalk = require('chalk');
const { text } = require('../constants.json');
const { isCurrentBillable, startBillable } = require('../services/db');
const { hhmmToMs } = require('../services/helpers');

const startHandler = async (time) => {
  const { milliseconds, ok } = hhmmToMs(time);
  if (!ok) {
    console.log(chalk.red(text.invalid_param));
    process.exit(1);
  }

  const startTime = Date.now() - milliseconds;

  const currentBillable = await isCurrentBillable();

  if (!currentBillable.ok) {
    await startBillable(startTime);
    console.log(chalk.green(text.started));
  } else console.log(chalk.red(text.timer_running));
};

module.exports.startHandler = startHandler;
