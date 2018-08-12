const { composeP } = require('ramda');
const { success } = require('../services/output');
const { endBillablePeriod } = require('../services/db');
const { text } = require('../constants.json');

const endOutput = () => success(text.ended);

const endHandler = composeP(endOutput, endBillablePeriod);


module.exports.endHandler = endHandler;
