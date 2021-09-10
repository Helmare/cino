const { buildWorkspaceCommand } = require('./utils');
const chalk = require('chalk');
const { Workspace } = require('../core/workspace');

const cmd = buildWorkspaceCommand({
  name: 'create',
  description: 'creates new workspace',
  aliases: ['cr', 'make', 'mk'],
  mustExist: false,
  confirm(ws) {
    return typeof(ws) === 'string' ? `Are you sure you want to create a ${chalk.cyanBright(ws)} workspace?` : false;
  },
  action(ws) {
    if (typeof(ws) === 'string') {
      new Workspace(ws).save();
      console.log(`Successfully created the ${chalk.cyanBright(ws)} workspace.`);
    }
    else {
      console.log(chalk.redBright('Workspace already exists.'));
    }
  }
});
module.exports = cmd;