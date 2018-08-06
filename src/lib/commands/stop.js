const { success, error } = require('../services/output');
const { isCurrentBillable, stopBillable } = require('../services/db');
const { text } = require('../constants.json');
const { hhmmToMs } = require('../services/helpers');

const stopHandler = async (time) => {
  const { milliseconds, ok } = hhmmToMs(time);
  if (!ok) {
    error(text.invalid_param);
    process.exit(1);
  }
  const currentBillable = await isCurrentBillable();

  const endTime = Date.now() - milliseconds;

  if (currentBillable.ok) {
    stopBillable(currentBillable.id, endTime);
    success(text.stopped);
  } else error(text.no_timer_running);
};

module.exports.stopHandler = stopHandler;
