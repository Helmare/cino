const fs = require('fs');
const path = require('path');
const jsonf = require('jsonfile');

const WORKSPACE_DIR = path.join(require('os').homedir(), '.ciao');
class Workspace {
  /**
   * 
   * @param {object|string} data 
   */
  constructor(data) {
    if (typeof(data) === 'object') {
      if (data.name) this.name = data.name;
      if (data.clocks) this.clocks = data.clocks;
    }
    else if (typeof(data) === 'string') {
      /**
       * @type {string}
       */
      this.name = data;
      /**
       * @type {object[]}
       */
      this.clocks = [];
    }
  }

  /**
   * Saves the workspace to a file as JSON.
   */
  save() {
    if (!fs.existsSync(WORKSPACE_DIR)) {
      fs.mkdirSync(WORKSPACE_DIR);
    }
    jsonf.writeFileSync(path.join(WORKSPACE_DIR, `${this.name.replace(/\s/g, '_')}.json`), this);
  }
}
module.exports = Workspace;