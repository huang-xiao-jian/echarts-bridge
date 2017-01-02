/**
 * @description - util suit
 */
'use strict';

import { isFunction, uuid } from '../index';

describe('util methods', function () {
  it('should judge function type', function () {
    let example = () => {};

    expect(isFunction(example)).toBeTruthy();
    expect(isFunction({})).toBeFalsy();
  });

  it('should generate uniq identity', function () {
    let prev = uuid();
    let next = uuid();

    expect(prev).not.toEqual(next);
  });
});
