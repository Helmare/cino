const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

async function build() {
  console.log('Building documentaiton...');
  let doc = '';

  doc += await docUsage('Create Workspace', 'create');
  doc += await docUsage('Clock In\\Out', 'clock');
  doc += await docUsage('View Timesheet', 'view');
  doc += await docUsage('Remove Clock Instance', 'unclock');
  doc += await docUsage('Remove Workspace', 'remove');


  return doc;
}
async function docUsage(header, cmds) {
  const child = exec(`node . ${cmds} -h`);
  let doc = `### ${header}\n\`\`\`\n`;
  child.stdout.on('data', (data) => {
    doc += data;
  });
  await onexit(child);

  return doc + '\n```\n\n';
}
function onexit(child) {
  return new Promise(resolve => {
    child.once('exit', () => resolve());
  });
}

build().then((docs) => {
  fs.writeFileSync(path.join(__dirname, 'docs.md'), docs, 'utf-8');
  console.log('finished');
});