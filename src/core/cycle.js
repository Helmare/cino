const { MILLIS_TO_HOURS } = require('./utils');
class Cycle {
  /**
   * @param {Date} start 
   * @param {Date} end 
   */
  constructor(_in, out) {
    this.in = _in;
    this.out = out;
  }
  /**
   * Gets the duration of this cycle in hours.
   * @returns {number}
   */
  get duration() {
    const out = this.out ? this.out.getTime() : Date.now();
    return Math.abs(out - this.in.getTime()) * MILLIS_TO_HOURS;
  }

  /**
   * Determains if the date provided is between in and out times.
   * @param {Date} time 
   */
  includes(time) {
    const _in = this.in.getTime();
    const out = this.out ? this.out.getTime() : Date.now();
    return time.getTime() >= _in && time.getTime() <= out;
  }
}
module.exports = {
  Cycle
};