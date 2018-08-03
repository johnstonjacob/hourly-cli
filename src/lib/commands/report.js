const chalk = require('chalk');
const { calculateBillable } = require('../services/db');
const { minutesToHHMM } = require('../services/helpers');
const { text } = require('../constants.json');


const reportHandler = async () => {
  const billables = await calculateBillable();
  if (!billables.ok) {
    console.log(chalk.yellow(text.timer_running));
    process.exit(0);
  }
  const hhmm = minutesToHHMM(
    billables
      .minutes
      .reduce((acc, minutes) => acc += minutes, 0)); // eslint-disable-line

  process.stdout.write(chalk.green(text.report));
  console.log(chalk.bgRed.bold.white(hhmm));
};


module.exports.reportHandler = reportHandler;
