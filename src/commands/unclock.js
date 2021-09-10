const { buildWorkspaceCommand } = require('./utils');
const chalk = require('chalk');

const cmd = buildWorkspaceCommand({
  name: 'unclock',
  description: 'removes clock from a workspace',
  aliases: ['unclk'],
  confirm(ws) {
    return `Are you sure you want to unclock the ${chalk.cyanBright(ws.name)} workspace?`;
  },
  action(ws, args) {
    if (!args.index) args.index = 0;
    else args.index = parseInt(args.index);
    
    ws.unclock(args.index);
    ws.save();
    console.log(`Succesfully unclocked the ${chalk.cyanBright(ws.name)} workspace.`);
  }
}).option('-i, --index', 'index of the clock', '0');
module.exports = cmd;