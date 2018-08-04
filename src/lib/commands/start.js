const chalk = require('chalk');
const { text } = require('../constants.json');
const { isCurrentBillable, startBillable } = require('../services/db');

const startHandler = async () => {
  const currentBillable = await isCurrentBillable();

  if (!currentBillable.ok) {
    await startBillable();
    console.log(chalk.green(text.started));
  } else console.log(chalk.red(text.timer_running));
};

module.exports.startHandler = startHandler;
