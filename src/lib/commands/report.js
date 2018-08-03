const chalk = require('chalk');
const { calculateBillable } = require('../services/db');
const { minutesToHHMM } = require('../services/helpers');


const reportHandler = async () => {
  const billables = await calculateBillable();
  console.log(chalk.green('Billable hours report:  '));
  const hhmm = minutesToHHMM(billables.reduce((acc, minutes) => acc += minutes, 0)); // eslint-disable-line
  console.log(chalk.bgRed.bold.white(hhmm));
};


module.exports.reportHandler = reportHandler;
