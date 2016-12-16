/**
 * @description - observable test suits
 */
'use strict';

import { parse } from '../src/bridge';

describe('@bornkiller/echarts-stream bridge suit', function () {
  it('should parse single field', function () {
    let base = { jasmine: 'tool', usage: 'inline' };
    let intermediate = parse('jasmine');

    intermediate.assign(base, 'framework');

    expect(base.jasmine).toEqual('framework');
  });

  it('should parse several field in ideal situation', function () {
    let base = {
      jasmine: 'tool',
      usage: {
        time: 'morning',
        season: 'summer'
      }
    };
    let intermediate = parse('usage.season');

    intermediate.assign(base, 'winter');

    expect(base.usage.season).toEqual('winter');
  });

  it('should parse several field in worse situation', function () {
    let base = {
      jasmine: 'tool'
    };
    let intermediate = parse('usage.season');

    intermediate.assign(base, 'winter');

    expect(base.usage.season).toEqual('winter');
  });
});