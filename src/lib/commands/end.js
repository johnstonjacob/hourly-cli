const chalk = require('chalk');
const { endBillablePeriod } = require('../services/db');
const { text } = require('../constants.json');


const endHandler = async () => {
  endBillablePeriod();
  console.log(chalk.yellow(text.ended));
};


module.exports.endHandler = endHandler;
