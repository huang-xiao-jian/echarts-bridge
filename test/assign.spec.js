import assign from '../src/assign';

describe('@bornkiller/echarts-stream assign suit', function () {
  it('should support single field', function () {
    expect(assign('jasmine', 'framework')).toEqual({ jasmine: 'framework' });
  });

  it('should support several field', function () {
    expect(assign('jasmine.season', 'winter')).toEqual({ jasmine: { season: 'winter' } });
  });
});