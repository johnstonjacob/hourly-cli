#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const { commands } = require('./lib/constants.json');
const { version } = require('../package.json');


// require('./lib/services/configstore');
// require('./lib/services/db');

console.log(chalk.green('Hourly hours tracker'));

program
  .version(version);

program
  .command('start [time]')
  .description(commands.start)
  .action((time) => {
    console.log('start', time);
  });

program
  .command('stop [time]')
  .description(commands.stop)
  .action((time) => {
    console.log('stop', time);
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
