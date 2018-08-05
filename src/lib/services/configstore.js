const Configstore = require('configstore');
const { configTestPath } = require('../constants.json');
const pkg = require('../../../package.json');

const validOptions = { 'project-mode': Boolean() };

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

function changeConfig(option, newValue) {
  if (!(option in validOptions)) return false;
  if (typeof newValue !== typeof validOptions[option]) return false;
  config.set(option, newValue);
  return true;
}

module.exports = {
  configSetup,
  changeConfig,
};
