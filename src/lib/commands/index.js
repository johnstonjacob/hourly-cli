const { startHandler } = require('./start');
const { stopHandler } = require('./stop');
const { reportHandler } = require('./report');
const { endHandler } = require('./end');

module.exports = {
  startHandler,
  stopHandler,
  reportHandler,
  endHandler,
  // defaultHandler,
};
