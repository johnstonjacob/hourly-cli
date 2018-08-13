const { success, error } = require('../services/output');
const { text } = require('../constants.json');
const { isCurrentBillable, startBillable } = require('../services/db');
const { hhmmToMs } = require('../services/helpers');

const startHandler = async (time) => {
  const { milliseconds, ok } = hhmmToMs(time);
  if (!ok) {
    error(text.invalid_param);
    process.exit(1);
  }

  const startTime = Date.now() - milliseconds;

  const currentBillable = await isCurrentBillable();

  if (!currentBillable.ok) {
    startBillable(startTime);
    success(text.started);
  } else error(text.timer_running);
};

module.exports.startHandler = startHandler;
