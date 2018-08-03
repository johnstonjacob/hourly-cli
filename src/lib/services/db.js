const homedir = require('os').homedir();
const chalk = require('chalk');
const Sequelize = require('sequelize');
const { dbName } = require('./../constants.json');

const storage = `${homedir}/${dbName}`;

const sql = new Sequelize('hourly', null, null, {
  dialect: 'sqlite',
  logging: false,
  operatorsAliases: false,
  storage,
});

sql
  .authenticate()
  .catch((error) => {
    console.log(chalk.red('Error connecting to SQLite DB.', error));
    process.exit(1);
  });

//  MODELS
const Billable = sql.define('billable_hours', {
  startTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  endTime: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  totalTime: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

const isCurrentBillable = async () => {
  const currentBillable = await Billable.findOne({
    where: { endTime: null },
  });

  if (currentBillable) {
    const startTime = currentBillable.get('startTime');
    const id = currentBillable.get('id');
    return { ok: true, id, startTime };
  }

  return { ok: false };
};

const startBillable = async () => {
  const startTime = Date.now();
  Billable.create({ startTime });
  return { ok: true };
};

const stopBillable = async (id, time = Date.now()) => {
  const currentBillable = await Billable.findById(id);
  const startTime = currentBillable.get('startTime');
  const endTime = currentBillable.get('endTime');
  const totalTime = endTime - startTime;

  currentBillable.set('endTime', time);
  currentBillable.set('totalTime', totalTime);
  currentBillable.save();
};

const calculateBillable = async () => {
  const currentBillable = await isCurrentBillable();

  if (currentBillable.ok) {
    console.log(chalk.yellow('You have a current timer running. Please end the timer to calculate hours.'));
    process.exit(0);
  }
  const allBillables = await Billable.findAll();
  const allTotalTimes = allBillables.map((billable) => Math.ceil(billable.get('totalTime') / 60000));
  console.log(allTotalTimes);
};

sql
  .sync()
  .catch((error) => {
    console.log(chalk.red('SQLite error', error));
  });

// isCurrentBillable().then((data) => stopBillable(data.id));

// isCurrentBillable().then(console.log);

// Billable.create({ startTime: Date.now() }).then(isCurrentBillable());

calculateBillable();

// const startBillable = async () => {};


module.exports.isCurrentBillable = isCurrentBillable;
module.exports.stopBillable = stopBillable;
module.exports.startBillable = startBillable;
module.exports.calculateBillable = calculateBillable;
