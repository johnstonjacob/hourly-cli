const { success } = require('../services/output');
const { isCurrentBillable, stopBillable, startBillable } = require('../services/db');


const defaultHandler = async () => {
  const currentBillable = await isCurrentBillable();
  if (currentBillable.ok) {
    await stopBillable(currentBillable.id);
    success('Billable hours stopped');
  } else {
    await startBillable();
    success('Billable hours started');
  }
};


module.exports.defaultHandler = defaultHandler;
