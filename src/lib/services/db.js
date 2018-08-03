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
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return this.getDataValue('startTime');
    },
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: true,
    set(val) {
      this.setDataValue('endTime', val);
    },
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
  Billable.create({ startTime: Date.now() });
  return { ok: true };
};

const stopBillable = async (id, time = Date.now()) => {
  const currentBillable = await Billable.findById(id);

  currentBillable.set('endTime', time);
  currentBillable.save();
};

sql
  .sync()
  .catch((error) => {
    console.log(chalk.red('SQLite error', error));
  });

// isCurrentBillable().then((data) => stopBillable(data.id));

// isCurrentBillable().then(console.log);

// Billable.create({ startTime: Date.now() }).then(isCurrentBillable());


// const startBillable = async () => {};


module.exports.isCurrentBillable = isCurrentBillable;
module.exports.stopBillable = stopBillable;
module.exports.startBillable = startBillable;
