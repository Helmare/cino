#! /usr/bin/env node
const { WORKSPACE_DIR } = require('./core/workspace');

// Setup
const { program } = require('commander');
program
  .name('ciao')
  .option('-w, --ws <name>', 'the workspace to be used (required)')
  .version('0.1.0');

program.command('dir').action(() => {
  console.log(WORKSPACE_DIR);
});

// Commands
require('./commands/create');
require('./commands/remove');

// Runs
program.parse(process.argv);