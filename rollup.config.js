/**
 * @description - rollup configuration
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  input: 'src/index.js',
  plugins: [
    eslint({
      include: ['src/*.js']
    }),
    resolve(),
    babel({
      exclude: ['**/*.css', '**/*.scss'],
      runtimeHelpers: true
    })
  ],
  external: (id) => ['echarts', 'babel-runtime'].some((name) => id.startsWith(name)),
  output: [
    { file: 'bundle/echarts-bridge.common.js', format: 'cjs' },
    { file: 'bundle/echarts-bridge.esm.js', format: 'es' }
  ]
};
