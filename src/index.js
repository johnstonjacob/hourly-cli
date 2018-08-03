#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const { commands, text } = require('./lib/constants.json');
const { version } = require('../package.json');
const {
  startHandler, stopHandler, reportHandler, endHandler, defaultHandler,
} = require('./lib/commands/index');

// require('./lib/services/configstore');

console.log(chalk.green.bold(text.splash));

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
    reportHandler();
  });

program
  .command('end')
  .description(commands.end)
  .action(async () => {
    await reportHandler();
    endHandler();
  });

program.parse(process.argv);

if (!program.args.length) {
  defaultHandler();
}
