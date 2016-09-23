/**
 * @description - observable package rollup configuration
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [babel()],
  moduleId: 'bk.stream',
  moduleName: 'bk.stream',
  external: [],
  globals: {},
  targets: [
    {format: 'umd', dest: 'dist/stream.bundle.js'},
    {format: 'es', dest: 'dist/stream.bundle.esm.js'}
  ]
};