#! /usr/bin/env node

// Setup
const { program } = require('commander');
program
  .name('ciao')
  .requiredOption('-w, --ws <name>', 'the workspace to be used (required)')
  .version('0.1.0');

// Commands
require('./commands/create');
require('./commands/remove');

// Runs
program.parse(process.argv);