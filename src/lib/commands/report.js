const {
  compose, composeP, curry, cond, propEq, T,
} = require('ramda');
const { success, warning } = require('../services/output');
const { calculateBillable } = require('../services/db');
const { minutesToHHMM, addAllNumbers } = require('../services/helpers');
const { text } = require('../constants.json');

const concat = curry(text.report.concat.bind(text.report));
const hhmm = compose(success, concat, minutesToHHMM, addAllNumbers);

const isOk = propEq('ok', true);

const logReport = cond([
  [isOk, (x) => hhmm(x.minutes)],
  [T, () => warning(text.timer_running)],
]);

const reportHandler = composeP(logReport, calculateBillable);


module.exports.reportHandler = reportHandler;
