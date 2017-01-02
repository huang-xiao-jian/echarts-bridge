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

/**
 * @description - generate uniq identity for easier watch
 *
 * @return {string}
 */
export function uuid() {
  return Math.random().toString(36).substr(2, 9);
}