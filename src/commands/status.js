const { Command } = require('commander');
const { WORKSPACE_DIR, toDate }  = require('../core/utils');
const fs = require('fs');
const path = require('path');
const { Workspace } = require('../core');
const chalk = require('chalk');
const format = require('date-format');

const cmd = new Command('status')
  .description('displays a daily status across all workspaces')
  .option('-d, --day <day>', 'the that will be displayed')
  .action(args => {
    // Setup
    const start = toDate(args.day) || new Date(Date.now());
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    // Get a view for each workspace
    const views = [];
    const files = fs.readdirSync(WORKSPACE_DIR);
    files.forEach(file => {
      const fpath = path.join(WORKSPACE_DIR, file);
      const stat = fs.statSync(fpath);
      if (stat.isFile() && file.endsWith('.json')) {
        views.push(Workspace.load(fpath).view(start, end));
      }
    });
    console.log(views);
  });

module.exports = cmd;