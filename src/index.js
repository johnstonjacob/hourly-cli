#!/usr/bin/env node
const { argv } = require('yargs');
// const chalk = require('chalk');

// require('./lib/services/configstore');
require('./lib/services/db');

console.log(argv);
