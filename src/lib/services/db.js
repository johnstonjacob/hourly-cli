const homedir = require('os').homedir();
const Sequelize = require('sequelize');
const { error } = require('./output');
const { dbName, dbNameTest } = require('./../constants.json');

const storage = `${homedir}/${process.env.NODE_ENV !== 'test' ? dbName : dbNameTest}`;

const sql = new Sequelize('hourly', null, null, {
  dialect: 'sqlite',
  logging: false,
  operatorsAliases: false,
  storage,
});

sql
  .authenticate()
  .catch((exception) => {
    error('Error connecting to SQLite DB.', exception);
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

const startBillable = async (startTime = Date.now()) => {
  Billable.create({ startTime });
  return { ok: true };
};

const stopBillable = async ({ id }, time = Date.now()) => {
  const currentBillable = await Billable.findById(id);
  currentBillable.set('endTime', time);

  const startTime = currentBillable.get('startTime');
  const endTime = currentBillable.get('endTime');
  const totalTime = endTime - startTime;

  currentBillable.set('totalTime', totalTime);
  currentBillable.save();
  return { ok: true };
};

const calculateBillable = async () => {
  const currentBillable = await isCurrentBillable();

  if (currentBillable.ok) return { ok: false };

  const allBillables = await Billable.findAll();
  const minutes = allBillables
    .map((billable) => Math.ceil(billable.get('totalTime') / 60000));

  return { ok: true, minutes };
};

const endBillablePeriod = async () => {
  Billable.destroy({ where: {}, truncate: false });
  return { ok: true };
};

sql
  .sync()
  .catch((exception) => {
    error('SQLite error', exception);
  });

module.exports = {
  isCurrentBillable,
  stopBillable,
  startBillable,
  calculateBillable,
  endBillablePeriod,
  Billable,
};
