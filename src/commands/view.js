const { program, Command } = require('commander');
const chalk = require('chalk');
const { Workspace } = require('../core/workspace');

program.addCommand(new Command('view')
  .aliases(['v'])
  .description('views a workspace')
  .action(function() {
    const ws = Workspace.load(program.opts().ws);
    if (ws) {
      console.log(ws);
      console.log(ws.time);
      console.log(ws.cycleTime);
    }
    else {
      console.log(chalk.yellowBright('Workspace does not exist.'));
    }
  }));