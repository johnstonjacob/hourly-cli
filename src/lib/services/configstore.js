const Configstore = require('configstore');
const { configTestPath } = require('../constants.json');
const pkg = require('../../../package.json');

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

module.exports = {
  configSetup,
};
