#!/usr/bin/env node
const program = require('commander');
const { successBold, warning } = require('./lib/services/output');
const { configSetup } = require('./lib/services/configstore');
const { commands, text } = require('./lib/constants.json');
const { version } = require('../package.json');
const {
  startHandler, stopHandler, reportHandler, endHandler, defaultHandler, configHandler,
} = require('./lib/commands/index');

const config = configSetup();

successBold(text.splash);

if (config.firstRun) warning(text.first_run);

program
  .version(version);

program
  .command('start [time]')
  .description(commands.start)
  .action(startHandler);

program
  .command('stop [time]')
  .description(commands.stop)
  .action(stopHandler);

program
  .command('report')
  .description(commands.report)
  .action(reportHandler);

program
  .command('end')
  .description(commands.end)
  .action(async () => {
    await reportHandler();
    endHandler();
  });

program
  .command('config [option] [newValue]')
  .description(commands.config)
  .action((option, newValue) => configHandler([option, newValue]));

program.parse(process.argv);

if (!program.args.length) {
  defaultHandler();
}
