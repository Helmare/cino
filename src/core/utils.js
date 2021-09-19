const MILLIS_TO_HOURS = 1 / 3600000;
const WORKSPACE_DIR = require('path').join(require('os').homedir(), '.cino');
module.exports = {
  MILLIS_TO_HOURS, WORKSPACE_DIR,
  /**
   * @typedef {Date|string|number} DateLike
   */
  /**
   * Converts a DateLike to a Date.
   * @param {DateLike} val 
   * @returns {Date|undefined}
   */
  toDate(val) {
    if (typeof(val) === 'string' && val.toLowerCase() == 'now') {
      return new Date(Date.now());
    }
    if (typeof(val) === 'string' || typeof(val) === 'number') {
      val = new Date(val);
    }
    if (val instanceof Date && !Number.isNaN(val.getTime())) {
      return val;
    }
  }
}