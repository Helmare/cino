const { program, Command } = require('commander');
const { prompt } = require('enquirer');
const chalk = require('chalk');
const { Workspace } = require('../core/workspace');

/**
 * Clocks a workspace
 * @param {Workspace} ws 
 */
function perform(ws) {
  ws.clock();
  ws.save();
  console.log(`Succesfully clocked ${ws.clocks.length % 2 == 1 ? 'into' : 'out of'} the ${chalk.cyanBright(ws.name)} workspace.`);
}

program.addCommand(new Command('clock')
  .aliases(['clk'])
  .description('performs a clock operation on a workspace')
  .action(function() {
    const ws = Workspace.load(program.opts().ws);
    if (ws) {
      if (program.opts().yes) perform(ws);
      else {
        prompt({
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to clock ${ws.clocks.length % 2 == 0 ? 'into' : 'out of'} ${chalk.cyanBright(ws.name)}?`
        }).then(ans => { if (ans.confirm) perform(ws) });
      }
    }
    else {
      console.log(chalk.yellowBright('Workspace does not exist.'));
    }
  }));