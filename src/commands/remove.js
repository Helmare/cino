const { buildWorkspaceCommand } = require('./utils');
const { program } = require('commander');
const chalk = require('chalk');
const { Workspace } = require('../core/workspace');

program.addCommand(buildWorkspaceCommand({
  name: 'remove',
  description: 'removes a workspace',
  aliases: ['rm', 'delete', 'del'],
  confirm(ws) {
    return `Are you sure you want to remove the ${chalk.cyanBright(ws.name)} workspace?`;
  },
  action(ws) {
    Workspace.remove(ws.name);
    console.log(`Successfully removed the ${chalk.cyanBright(ws.name)} workspace.`);
  }
}));