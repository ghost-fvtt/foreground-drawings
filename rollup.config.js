// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

const sourcemaps = require('rollup-plugin-sourcemaps');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/module/foreground-drawings.ts',
  output: {
    dir: 'dist/module',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    sourcemaps(),
    typescript({}),
    process.env.NODE_ENV === 'production' && terser({ ecma: 2020, keep_fnames: true }),
  ],
};

module.exports = config;
