const { warning, error, jsonOut } = require('../services/output');
const { changeConfig, getConfig } = require('../services/configstore');

function parseNewValue(newValue) {
  try {
    if (typeof JSON.parse(newValue) === 'boolean') return Boolean(newValue);
  } catch (exception) {
    return newValue;
  }
  return newValue;
}

function configHandler(option, newValue) {
  if (!option) {
    const config = getConfig();

    warning('Printing all configuration options.');
    jsonOut(config);

    process.exit(0);
  }

  if (!newValue) {
    const config = getConfig();

    warning(`Printing '${option}' value.`);
    jsonOut(config);

    process.exit(0);
  }

  const value = parseNewValue(newValue);
  const ok = changeConfig(option, value);

  if (ok) warning(`Changed ${option} to ${newValue}`);
  else error('Invalid option or paraemter');
}

module.exports = {
  configHandler,
};
