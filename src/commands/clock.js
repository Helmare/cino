const { buildWorkspaceCommand } = require('./utils');
const chalk = require('chalk');
const format = require('date-format');

const cmd = buildWorkspaceCommand({
  name: 'clock',
  description: 'clocks in/out of a workspace',
  aliases: ['clk'],
  confirm(ws, args) {
    if (args.time) {
      return `Are you sure you want to submit a clock for ${chalk.greenBright(format('MM/dd hh:mm', new Date(args.time)))} in the ${chalk.cyanBright(ws.name)} workspace?`;
    }
    else {
      return `Are you sure you want to clock ${ws.clocks.length % 2 == 0 ? 'into' : 'out of'} ${chalk.cyanBright(ws.name)}?`;
    }
  },
  action(ws, args) {
    if (args.time) args.time = new Date(args.time);
    else args.time = new Date();

    ws.clock(args.time);
    ws.save();
    console.log(`Succesfully submited clock to the ${chalk.cyanBright(ws.name)} workspace.`);
  }
}).option('-t, --time <time>', 'time of the clock');
module.exports = cmd;