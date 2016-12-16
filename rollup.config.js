/**
 * @description - observable package rollup configuration
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  plugins: [
    eslint({
      include: ['index.js', 'src/*.js', 'test/*.js']
    }),
    resolve({ jsnext: true, main: true }),
    commonjs({
      include: 'node_modules/@bornkiller/**',
    }),
    babel()
  ],
  moduleId: 'bk.stream',
  moduleName: 'bk.stream',
  external: [],
  globals: {},
  targets: [
    { format: 'umd', dest: 'dist/stream.bundle.js' },
    { format: 'es', dest: 'dist/stream.bundle.esm.js' }
  ]
};