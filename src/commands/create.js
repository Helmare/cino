const { program, Command } = require('commander');
const chalk = require('chalk');
const Workspace = require('../core/workspace');

module.exports = new Command('create')
  .aliases(['cr'])
  .description('creates a workspace')
  .action(function() {
    const ws = program.opts().ws;
    new Workspace(ws).save();
    console.log(`Successfully created the ${chalk.cyanBright(ws)} workspace.`);
  });