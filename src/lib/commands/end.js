const { success } = require('../services/output');
const { endBillablePeriod } = require('../services/db');
const { text } = require('../constants.json');


const endHandler = async () => {
  endBillablePeriod();
  success(text.ended);
};


module.exports.endHandler = endHandler;
