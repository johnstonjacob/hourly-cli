const {
  compose, cond, any, equals, all, T, propEq,
} = require('ramda');
const { text } = require('../constants.json');
const { warning, error, jsonOut } = require('../services/output');
const { changeConfig, getConfig } = require('../services/configstore');

const isUndefined = equals(undefined);
const anyUndefined = any(isUndefined);
const allUndefined = all(isUndefined);

const warnAndPass = (x) => {
  warning(text.print_config);
  return x;
};

const allUndefinedHandler = compose(jsonOut, warnAndPass, getConfig);

const printValueAndPass = (x) => {
  warning(text.print_value);
  return x;
};

const valueUndefinedHandler = compose(jsonOut, printValueAndPass, getConfig);

const isOk = propEq('ok', true);

const configChangeOutput = cond([
  [isOk, ({ option, value }) => warning(`Changed ${option} to ${value}`)],
  [T, () => error('Invalid option or parameter')],
]);

const configChangeHandler = compose(configChangeOutput, changeConfig);

const configHandler = cond([
  [allUndefined, allUndefinedHandler],
  [anyUndefined, valueUndefinedHandler],
  [T, configChangeHandler],
]);

module.exports = {
  configHandler,
};
