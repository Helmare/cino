const fs = require('fs');
const path = require('path');
const jsonf = require('jsonfile');
const { Cycle } = require('./cycle');
const { WORKSPACE_DIR, MILLIS_TO_HOURS, toDate } = require('./utils');

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
          this.clock(e);
        });
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
   * Gets an overview of the workspace between two dates.
   * @param {Date} start 
   * @param {Date} end 
   */
  view(start, end) {
    if ((start = toDate(start)) && (end = toDate(end))) {
      let cycles = [];
      let time = 0;
      this.cycles.forEach(cyc => {
        if (cyc.includes(start, end)) {
          cycles.unshift(cyc);

          time += cyc.duration;
          if (cyc.includes(start)) {
            time -= (start.getTime() - cyc.in.getTime()) * MILLIS_TO_HOURS;
          }
          if (cyc.includes(end)) {
            const out = cyc.out ? cyc.out.getTime() : Date.now();
            time -= (out - end.getTime()) * MILLIS_TO_HOURS;
          }
        }
      });

      // Build view
      return {
        start, end, time, cycles
      }
    }
  }

  /**
   * Performs a clock on this workspace.
   * @param {DateLike} [time]
   */
  clock(time = new Date(Date.now())) {
    if (time = toDate(time)) {
      this.clocks.push(time);
      this.clocks.sort((a, b) => a.getTime() - b.getTime());
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
   * @param {string | fs.PathLike} ws
   * @return {Workspace}
   */
  static load(ws) {
    if (fs.existsSync(ws) || fs.existsSync(ws = Workspace.path(ws))) {
      return new Workspace(jsonf.readFileSync(ws));
    }
  }
}
module.exports = {
  Workspace
};