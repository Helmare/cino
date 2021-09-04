#! /usr/bin/env node

// Setup
const { program } = require('commander');
program
  .name('ciao')
  .requiredOption('-w, --ws <name>', 'the workspace to be used (required)')
  .version('0.1.0');

// Parse
program.parse(process.argv);

// Run
console.log(program.opts().ws);