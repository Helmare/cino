const { buildWorkspaceCommand } = require('./utils');
const chalk = require('chalk');
const format = require('date-format');
const { MILLIS_TO_HOURS } = require('../core/workspace');

const cmd = buildWorkspaceCommand({
  name: 'view',
  description: 'displays a workspace',
  aliases: ['v'],
  action(ws) {
    let cycles = [];

    /**
     * @type {Date}
     */
    let clkin = undefined;
    ws.clocks.forEach(clk => {
      console.log(clk);
      if (clkin) {
        // Add cycle
        cycles.push(renderRow(clkin, clk));
        clkin = undefined;
      }
      else clkin = clk;
    });
    // Add cycle
    if (clkin) {
      cycles.push(renderRow(clkin));
    }

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
/**
 * @param {Date} clkin 
 * @param {Date} clkout 
 * @returns {string}
 */
function renderRow(clkin, clkout) {
  let render = `${chalk.greenBright(format('MM/dd hh:mm', clkin))} | `;
  if (clkout) {
    render += `${chalk.greenBright(format('MM/dd hh:mm', clkout))}`;
  }
  else {
    render += '     -     ';
  }
  const cycleTime = MILLIS_TO_HOURS * (clkout ? clkout.getTime() - clkin.getTime() : Date.now() - clkin.getTime());
  return `| ${render} | ${chalk.cyanBright(cycleTime.toFixed(2).padStart(7))} |`;
}

module.exports = cmd;