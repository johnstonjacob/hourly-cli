const {
  composeP, propEq, cond, T,
} = require('ramda');
const { success } = require('../services/output');
const { isCurrentBillable, stopBillable, startBillable } = require('../services/db');

const isOk = propEq('ok', true);

const started = () => success('Billable hours started.');
const stopped = () => success('Billable hours stopped.');

const defaultHandlerBranch = cond([
  [isOk, composeP(stopped, stopBillable)],
  [T, composeP(started, startBillable)],
]);

const defaultHandler = composeP(defaultHandlerBranch, isCurrentBillable);


module.exports.defaultHandler = defaultHandler;
