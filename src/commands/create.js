const { program, Command } = require('commander');
const chalk = require('chalk');
const { Workspace } = require('../core/workspace');

program.addCommand(new Command('create')
  .aliases(['cr', 'make', 'mk'])
  .description('creates a workspace')
  .action(function() {
    const ws = program.opts().ws;
    if (Workspace.exists(ws)) {
      console.log(chalk.yellowBright('Workspace already exists.'));
    }
    else {
      new Workspace(ws).save();
      console.log(`Successfully created the ${chalk.cyanBright(ws)} workspace.`);
    }
  }));