const { success, warning } = require('../services/output');
const { calculateBillable } = require('../services/db');
const { minutesToHHMM } = require('../services/helpers');
const { text } = require('../constants.json');


const reportHandler = async () => {
  const billables = await calculateBillable();
  if (!billables.ok) {
    warning(text.timer_running);
    process.exit(0);
  }
  const hhmm = minutesToHHMM(
    billables
      .minutes
      .reduce((acc, minutes) => acc += minutes, 0)); // eslint-disable-line

  success(`${text.report}${hhmm}`);
};


module.exports.reportHandler = reportHandler;
