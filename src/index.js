#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const { commands } = require('./lib/constants.json');
const { version } = require('../package.json');
const { startHandler } = require('./lib/commands/start');
const { stopHandler } = require('./lib/commands/stop');


// require('./lib/services/configstore');
// require('./lib/services/db');

console.log(chalk.green.bold('Hourly hours tracker'));

program
  .version(version);

program
  .command('start [time]')
  .description(commands.start)
  .action(() => {
    startHandler();
  });

program
  .command('stop [time]')
  .description(commands.stop)
  .action(() => {
    stopHandler();
  });

program
  .command('report')
  .description(commands.report)
  .action(() => {
    console.log('report');
  });

program
  .command('end')
  .description(commands.end)
  .action(() => {
    console.log('end');
  });

program.parse(process.argv);

if (!program.args.length) {
  console.log('default');
}
