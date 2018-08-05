const { startHandler } = require('./start');
const { stopHandler } = require('./stop');
const { reportHandler } = require('./report');
const { endHandler } = require('./end');
const { defaultHandler } = require('./default');
const { configHandler } = require('./config');

module.exports = {
  startHandler,
  stopHandler,
  reportHandler,
  endHandler,
  defaultHandler,
  configHandler,
};
