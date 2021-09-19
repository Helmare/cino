#! /usr/bin/env node
const { WORKSPACE_DIR } = require('./core');
const { program } = require('commander');

// Setup
program.name('cino').version('0.1.0');

// Basic Commands
program.command('dir').action(() => {
  console.log(WORKSPACE_DIR);
}).description('display workspace directory');

// Imported Commands
program.addCommand(require('./commands/create'));
program.addCommand(require('./commands/clock'));
program.addCommand(require('./commands/view'));
program.addCommand(require('./commands/unclock'));
program.addCommand(require('./commands/remove'));

// Runs
program.parse(process.argv);