const { buildWorkspaceCommand } = require('./utils');
const chalk = require('chalk');
const format = require('date-format');

const cmd = buildWorkspaceCommand({
  name: 'view',
  description: 'displays a workspace',
  aliases: ['v'],
  action(ws) {
    let cycles = [];
    ws.collapse().forEach(cyc => {
      let render = `${chalk.greenBright(format('MM/dd hh:mm', cyc.in))} | `;
      if (cyc.out) {
        render += `${chalk.greenBright(format('MM/dd hh:mm', cyc.out))}`;
      }
      else {
        render += '     -     ';
      }
      cycles.push(`| ${render} | ${chalk.cyanBright(cyc.duration.toFixed(2).padStart(7))} |`);
    });

    console.log('\n---------------------------------------');
    console.log(`| ${chalk.bold('name'.padStart(11))} | ${chalk.bold(ws.name.padEnd(21))} |`);
    console.log(`| ${chalk.bold('time'.padStart(11))} | ${chalk.cyanBright(`${ws.time.toFixed(2)} hours`.padEnd(21))} |`);
    console.log('| ----------------------------------- |');
    console.log(`|      ${chalk.bold('in')}     |     ${chalk.bold('out')}     |  ${chalk.bold('hours')}  |`);
    console.log('| ----------- | ----------- | ------- |');
    cycles.reverse().forEach(cyc => {
      console.log(cyc);
    });
    console.log('---------------------------------------\n');
  }
});

module.exports = cmd;