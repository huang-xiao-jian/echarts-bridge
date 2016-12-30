/**
 * @description - util method for develop
 */
'use strict';

/**
 * @description - check if variable is function
 *
 * @param {any} anything
 *
 * @return {boolean}
 */
export function isFunction(anything) {
  return Object.prototype.toString.apply(anything) === '[object Function]';
}