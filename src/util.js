/**
 * @description - helper method
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @description - determine function variable
 *
 * @param {*} anything
 *
 * @return {boolean}
 */
export function isFunction(anything) {
  return Object.prototype.toString.apply(anything) === '[object Function]';
}

/**
 * @description - generate unique identity for easier watch
 *
 * @return {string}
 */
export function uuid() {
  return Math.random().toString(36).substr(2, 9);
}
