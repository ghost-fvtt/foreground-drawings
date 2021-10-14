// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

const typescript = require('@rollup/plugin-typescript');

module.exports = {
  input: 'src/module/foreground-drawings.ts',
  output: {
    dir: 'dist/module',
    format: 'es',
    sourcemap: true,
  },
  plugins: [typescript({})],
};
