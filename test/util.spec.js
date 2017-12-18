/**
 * @description - util suit
 */

import { isFunction, uuid } from '../src/util';

describe('util methods', () => {
  it('should judge function type', () => {
    const example = () => {};

    expect(isFunction(example)).toBeTruthy();
    expect(isFunction({})).toBeFalsy();
  });

  it('should generate uniq identity', () => {
    const prev = uuid();
    const next = uuid();

    expect(prev).not.toEqual(next);
  });
});
