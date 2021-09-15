const fs = require('fs');
const path = require('path');
const jsonf = require('jsonfile');
const { Cycle } = require('./cycle');
const { WORKSPACE_DIR, MILLIS_TO_HOURS } = require('./utils');

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
        this.clocks.sort((a, b) => a.getTime() - b.getTime());
      }
    }
    else if (typeof(data) === 'string') {
      this.name = data;
    }
  }

  /**
   * Gets the total hours of all clock cycles.
   * @returns {number}
   */
  get time() {
    let total = 0;
    let clockIn = undefined;

    // Loop through each clock and alternate between
    // clock in and clock out.
    this.clocks.forEach(clk => {
      if (clockIn) {
        total += clk.getTime() - clockIn;
        clockIn = undefined;
      }
      else {
        clockIn = clk.getTime();
      }
    });

    // Check if last clock was a clock in.
    if (clockIn) {
      total += Date.now() - clockIn;
    }

    return total * MILLIS_TO_HOURS;
  }

  /**
   * Gets the hours of the current clock cycle.
   * @returns {number|undefined}
   */
  get cycleTime() {
    if (this.clocks.length % 2 == 1) {
      return (Date.now() - this.clocks[this.clocks.length - 1]) * MILLIS_TO_HOURS;
    }
    else {
      return 0;
    }
  }

  /**
   * Collapses the clocks into cycles.
   * @returns {Cycle[]}
   */
  get cycles() {
    let cycles = [];

    let clkin = undefined;
    this.clocks.forEach(clk => {
      if (clkin) {
        // Add cycle
        cycles.push(new Cycle(clkin, clk))
        clkin = undefined;
      }
      else clkin = clk;
    });
    if (clkin) {
      cycles.push(new Cycle(clkin));
    }

    return cycles;
  }

  /**
   * Performs a clock on this workspace.
   * @param {Date | undefined} time
   */
  clock(time = new Date(Date.now())) {
    if (typeof(time) === 'string' || typeof(time) === 'number') {
      time = new Date(time);
    }
    if (time instanceof Date && !Number.isNaN(time.getTime())) {
      this.clocks.push(time);
    }
  }
  /**
   * Removes a clock at the specified index.
   * @param {number} index 
   */
  unclock(index = 0) {
    if (typeof(index) !== 'number') index = 0;
    this.clocks.splice(this.clocks.length - index - 1, 1);
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
      return new Workspace(jsonf.readFileSync(Workspace.path(name)));
    }
  }
}
module.exports = {
  Workspace
};