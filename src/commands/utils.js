const { Command } = require('commander');
const chalk = require('chalk');
const { prompt } = require('enquirer');
const { Workspace } = require('../core/workspace');

module.exports = {
  /**
   * 
   * @param {object} options 
   */
  buildWorkspaceCommand({name, description, aliases=[], action, mustExist = true, confirm = false} = {}) {
    if (!name || !action) {
      throw new Error('Attempted to create workspace command with invalid options.');
    }
    else {
      let cmd = new Command(name)
        .description(description)
        .aliases(aliases)
        .requiredOption('-w, --ws <name>', 'the workspace to be used');
      if (confirm) {
        cmd.option('-y, --yes', 'skips the confirmation prompt');
      }
      cmd.action((args) => {
        // Grab workspace.
        let ws = Workspace.load(args.ws) || args.ws;

        // Check if workspace exists and needs to exist.
        if (typeof(ws) === 'string' && mustExist) {
          console.log(chalk.redBright('The workspace specified does not exist.'));
          return;
        }

        // Perform confirmation if required.
        if (!args.yes && confirm && confirm(ws, args)) {
          prompt({
            type: 'confirm',
            name: 'conf',
            message: confirm(ws, args)
          }).then(ans => {
            if (ans.conf) {
              // Execute action.
              action(ws, args)
            }
          });
        }
        else {
          // Execute action.
          action(ws, args);
        }
      });

      return cmd;
    }
  }
}