const chalk = require('chalk');
const { endBillablePeriod } = require('../services/db');


const endHandler = async () => {
  endBillablePeriod();
  console.log(chalk.yellow('Ended billable period.'));
};


module.exports.endHandler = endHandler;
