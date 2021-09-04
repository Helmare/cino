const { program, Command } = require('commander');
const chalk = require('chalk');
const Workspace = require('../core/workspace');

program.addCommand(new Command('remove')
  .aliases(['rm', 'delete', 'del'])
  .description('removes a workspace')
  .action(function() {
    const ws = program.opts().ws;
    if (Workspace.exists(ws)) {
      Workspace.remove(ws);
      console.log(`Successfully removed the ${chalk.cyanBright(ws)} workspace.`);
    }
    else {
      console.log(chalk.yellowBright('Workspace doesn\'t exist'));
    }
  }));