const Configstore = require('configstore');
const { configTestPath } = require('../constants.json');
const pkg = require('../../../package.json');

const config = new Configstore(
  process.env.NODE_ENV !== 'test'
    ? pkg.name
    : configTestPath,
);

function configSetup() {
  let packageMode = config.get('package-mode');

  if (packageMode === undefined) {
    config.set('package-mode', false);
    packageMode = false;
  }

  return { packageMode };
}

module.exports = {
  configSetup,
};
