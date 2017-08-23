/**
 * @description - rollup configuration
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  entry: 'index.js',
  plugins: [
    eslint({
      include: ['index.js', 'src/*.js']
    }),
    resolve(),
    babel({
      exclude: ['**/*.css', '**/*.scss'],
      runtimeHelpers: true
    })
  ],
  external: (id) => {
    return ['echarts', 'babel-runtime'].some((name) => id.startsWith(name));
  },
  targets: [
    { dest: 'bundle/bridge.common.js', format: 'cjs' },
    { dest: 'bundle/bridge.esm.js', format: 'es' }
  ]
};
