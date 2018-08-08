const { success, error } = require('../services/output');
const { text } = require('../constants.json');
const { isCurrentBillable, startBillable } = require('../services/db');
const { hhmmToMs, validHHMM } = require('../services/helpers');

const startHandler = async (time) => {
  if (!validHHMM(time)) {
    error(text.invalid_param);
    process.exit(1);
  }

  const milliseconds = hhmmToMs(time);
  const startTime = Date.now() - milliseconds;

  const currentBillable = await isCurrentBillable();

  if (!currentBillable.ok) {
    startBillable(startTime);
    success(text.started);
  } else error(text.timer_running);
};

module.exports.startHandler = startHandler;
