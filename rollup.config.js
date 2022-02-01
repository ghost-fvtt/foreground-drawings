// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import copy from '@guanghechen/rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

import { distDirectory, name, sourceDirectory } from './tools/const.mjs';

const staticFiles = [
  '.reuse',
  'CHANGELOG.md.license',
  'CHANGELOG.md',
  'lang',
  'LICENSE.md',
  'LICENSES',
  'media',
  'module.json.license',
  'module.json',
  'README.md',
];
const isProduction = process.env.NODE_ENV === 'production';

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: { [`${name}`]: `${sourceDirectory}/${name}.ts` },
  output: {
    dir: distDirectory,
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    typescript({ noEmitOnError: true }),
    copy({
      targets: [{ src: staticFiles, dest: distDirectory }],
    }),
    isProduction && terser({ ecma: 2020, keep_fnames: true }),
  ],
};

export default config;
