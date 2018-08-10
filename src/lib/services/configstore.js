const Configstore = require('configstore');
const { configTestPath } = require('../constants.json');
const pkg = require('../../../package.json');

const validOptions = { 'project-mode': ['true', 'false'] };

const config = new Configstore(
  process.env.NODE_ENV !== 'test'
    ? pkg.name
    : configTestPath,
);

function configSetup() {
  let firstRun = false;
  let projectMode = config.get('project-mode');

  if (projectMode === undefined) {
    config.set('project-mode', false);
    projectMode = false;
    firstRun = true;
  }

  return { projectMode, firstRun };
}

function changeConfig([option, newValue]) {
  if (!(option in validOptions)) return { ok: false };
  if (!validOptions[option].includes(newValue)) return { ok: false };
  config.set(option, newValue);
  return { ok: true, option, value: newValue };
}

function getConfig([option]) {
  const configObject = {};
  if (option !== undefined) {
    configObject[option] = config.get(option);
    return configObject;
  }
  return config.all;
}

module.exports = {
  configSetup,
  changeConfig,
  getConfig,
};
