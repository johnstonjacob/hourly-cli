const chalk = require('chalk');
const { calculateBillable } = require('../services/db');
const { minutesToHHMM } = require('../services/helpers');


const reportHandler = async () => {
  const billables = await calculateBillable();
  if (!billables.ok) {
    console.log(chalk.yellow('You have a current timer running. Please end the timer to calculate hours.'));
    process.exit(0);
  }
  process.stdout.write(chalk.green('Billable hours report:  '));
  const hhmm = minutesToHHMM(billables.minutes.reduce((acc, minutes) => acc += minutes, 0)); // eslint-disable-line
  console.log(chalk.bgRed.bold.white(hhmm));
};


module.exports.reportHandler = reportHandler;
