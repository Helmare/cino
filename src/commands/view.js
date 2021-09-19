const { buildWorkspaceCommand } = require('./utils');
const { toDate }  = require('../core/utils');
const chalk = require('chalk');
const format = require('date-format');

const cmd = buildWorkspaceCommand({
  name: 'view',
  description: 'displays a workspace',
  aliases: ['v'],
  action(ws, args) {
    // Setup
    let start = args.start;
    if (!(start = toDate(start))) {
      start = new Date();
      start.setDate(start.getDate() - start.getDay());
    }
    start.setHours(0, 0, 0, 0);

    let end = args.end;
    if (!(end = toDate(end))) {
      end = new Date();
      end.setDate(end.getDate() + (6 - end.getDay()));
    }
    end.setHours(23, 59, 59);

    const view = ws.view(start, end);
    

    // Header
    console.log('\n-----------------------------------------');
    console.log(`| ${chalk.bold('name'.padStart(11))} | ${chalk.bold(ws.name.padEnd(23))} |`);
    console.log(`| ${chalk.bold('all hours'.padStart(11))} | ${chalk.cyanBright(`${ws.time.toFixed(2)} hours`.padEnd(23))} |`);
    console.log(`| ${chalk.gray('-----------')} | ${chalk.gray('-----------------------')} |`)
    console.log(`| ${chalk.bold('range'.padStart(11))} | ${chalk.greenBright(format('MM/dd/yyyy', view.start))} - ${chalk.greenBright(format('MM/dd/yyyy', view.end))} |`);
    console.log(`| ${chalk.bold('hours'.padStart(11))} | ${chalk.cyanBright(`${view.time.toFixed(2)} hours`.padEnd(23))} |`);
    console.log('| ------------------------------------- |');
    console.log(`|      ${chalk.bold('in')}     |     ${chalk.bold('out')}     |   ${chalk.bold('hours')}   |`);
    console.log('| ----------- | ----------- | --------- |');

    // Cycles
    view.cycles.forEach(cyc => {
      let str = `${chalk.greenBright(format('MM/dd hh:mm', cyc.in))} | `;
      if (cyc.out) {
        str += `${chalk.greenBright(format('MM/dd hh:mm', cyc.out))}`;
      }
      else {
        str += '     -     ';
      }
      console.log(`| ${str} | ${chalk.cyanBright(cyc.duration.toFixed(2).padStart(9))} |`);
    });

    // Footer
    console.log('-----------------------------------------\n');
  }
})
.option('-s, --start <date>', 'start of time range', 'start of week')
.option('-e, --end <date>', 'end of time range', 'end of week');

module.exports = cmd;