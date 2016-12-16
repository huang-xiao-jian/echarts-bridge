/**
 * @description - common property assign operation
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
'use strict';

import merge from 'lodash-es/merge';

import assign from './assign';

/**
 * @description - transform string into expression
 *
 * @param {string} expression
 */
export function parse(expression) {
  return {
    assign: (context, value) => {
      return merge(context, assign(expression, value));
    }
  };
}