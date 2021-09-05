const { program, Command } = require('commander');
const chalk = require('chalk');
const { Workspace } = require('../core/workspace');

program.addCommand(new Command('clock')
  .aliases(['clk'])
  .description('performs a clock operation on a workspace')
  .action(function() {
    const ws = Workspace.load(program.opts().ws);
    if (ws) {
      ws.clock();
      ws.save();
      console.log(`Succesfully clocked the ${chalk.cyanBright(ws.name)} workspace.`);
    }
    else {
      console.log(chalk.yellowBright('Workspace does not exist.'));
    }
  }));