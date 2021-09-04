const { program, Command } = require('commander');

module.exports = new Command('create')
  .aliases(['cr'])
  .description('creates a workspace')
  .action(() => {
    const ws = program.opts().ws;
    console.log(`Creating a ${ws} workspace...`);
  });