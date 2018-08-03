#!/usr/bin/env node
const cmd = require('commander');
const { commands } = require('./lib/constants.json');
const { version } = require('../package.json');

// const chalk = require('chalk');

// require('./lib/services/configstore');
// require('./lib/services/db');

cmd
  .version(version);

cmd
  .command('start [time]')
  .description(commands.start)
  .action((time) => {
    console.log('start', time);
  });

cmd
  .command('stop [time]')
  .description(commands.stop)
  .action((time) => {
    console.log('stop', time);
  });

cmd
  .command('report')
  .description(commands.report)
  .action(() => {
    console.log('report');
  });

cmd
  .command('end')
  .description(commands.end)
  .action(() => {
    console.log('end');
  });

cmd.parse(process.argv);
