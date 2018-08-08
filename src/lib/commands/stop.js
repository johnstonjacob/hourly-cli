// const { compose, curry } = require('ramda');
const { success, error } = require('../services/output');
const { isCurrentBillable, stopBillable } = require('../services/db');
const { text } = require('../constants.json');
const { hhmmToMs, validHHMM } = require('../services/helpers');

const stopHandler = async (time) => {
  if (!validHHMM(time)) {
    error(text.invalid_param);
    process.exit(1);
  }
  const currentBillable = await isCurrentBillable();
  const milliseconds = hhmmToMs(time);
  const endTime = Date.now() - milliseconds;

  if (currentBillable.ok) {
    stopBillable(currentBillable.id, endTime);
    success(text.stopped);
  } else error(text.no_timer_running);
};

module.exports.stopHandler = stopHandler;
