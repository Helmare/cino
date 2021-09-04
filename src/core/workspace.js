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
    jsonf.writeFileSync(Workspace.path(this.name), this);
  }

  /**
   * @param {string} name 
   * @returns the path of the workspace.
   */
  static path(name) {
    return path.join(WORKSPACE_DIR, `${name.replace(/\s/g, '_')}.json`);
  }
  /**
   * Checks whether or not the workspace exists.
   * @param {string} name 
   * @returns {boolean}
   */
  static exists(name) {
    return fs.existsSync(Workspace.path(name));
  }
  /**
   * Removes the workspace.
   * @param {string} name 
   */
  static remove(name) {
    fs.unlinkSync(Workspace.path(name));
  }
}
module.exports = Workspace;