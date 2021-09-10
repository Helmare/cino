const { buildWorkspaceCommand } = require('./utils');
const chalk = require('chalk');

const cmd = buildWorkspaceCommand({
  name: 'clock',
  description: 'performs a clock operation on a workspace',
  aliases: ['clk'],
  confirm(ws) {
    return `Are you sure you want to clock ${ws.clocks.length % 2 == 0 ? 'into' : 'out of'} ${chalk.cyanBright(ws.name)}?`;
  },
  action(ws) {
    ws.clock();
    ws.save();
    console.log(`Succesfully clocked ${ws.clocks.length % 2 == 1 ? 'into' : 'out of'} the ${chalk.cyanBright(ws.name)} workspace.`);
  }
});
module.exports = cmd;