#! /usr/bin/env node

// Setup
const { program } = require('commander');
program
  .name('ciao')
  .requiredOption('-w, --ws <name>', 'the workspace to be used (required)')
  .version('0.1.0');

// Commands
program.addCommand(require('./commands/create'));

// Runs
program.parse(process.argv);