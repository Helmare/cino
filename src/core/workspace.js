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
    /**
     * @type {string}
     */
    this.name = '';
    /**
     * @type {Date[]}
     */
    this.clocks = [];

    if (typeof(data) === 'object') {
      if (data.name) this.name = data.name;
      if (data.clocks) {
        data.clocks.forEach(e => {
          this.clocks.push(new Date(e));
        });
      }

      console.log(this.clocks);
    }
    else if (typeof(data) === 'string') {
      this.name = data;
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
  /**
   * Loads a workspace.
   * @param {string} name 
   * @return {Workspace}
   */
  static load(name) {
    if (Workspace.exists(name)) {
      return new Workspace(jsonf.readFile(Workspace.path(name)));
    }
  }
  /**
   * Loads a workspace or creates a new one if it doesn't exist.
   * @param {string} name 
   */
  static loadOrNew(name) {
    const ws = Workspace.load(name);
    if (ws) return ws;
    else return new Workspace(name);
  }
}
module.exports = {
  WORKSPACE_DIR,
  Workspace
};