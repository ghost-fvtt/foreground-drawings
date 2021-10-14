// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

const { rollup } = require('rollup');
const argv = require('yargs').argv;
const chalk = require('chalk');
const fs = require('fs-extra');
const gulp = require('gulp');
const path = require('path');
const rollupConfig = require('./rollup.config');

/********************/
/*  CONFIGURATION   */
/********************/

const name = path.basename(path.resolve('.'));
const sourceDirectory = './src';
const distDirectory = './dist';
const sourceFileExtension = 'ts';
const staticFiles = ['lang', 'module.json'];

/********************/
/*      BUILD       */
/********************/

/**
 * Build the distributable JavaScript code
 */
async function buildCode() {
  const build = await rollup({ input: rollupConfig.input, plugins: rollupConfig.plugins });
  return build.write(rollupConfig.output);
}

/**
 * Copy static files
 */
async function copyFiles() {
  for (const file of staticFiles) {
    if (fs.existsSync(`${sourceDirectory}/${file}`)) {
      await fs.copy(`${sourceDirectory}/${file}`, `${distDirectory}/${file}`);
    }
  }
}

/**
 * Watch for changes for each build step
 */
function buildWatch() {
  gulp.watch(`${sourceDirectory}/**/*.${sourceFileExtension}`, { ignoreInitial: false }, buildCode);
  gulp.watch(
    staticFiles.map((file) => `${sourceDirectory}/${file}`),
    { ignoreInitial: false },
    copyFiles,
  );
}

/********************/
/*      CLEAN       */
/********************/

/**
 * Remove built files from `dist` folder while ignoring source files
 */
async function clean() {
  const files = [...staticFiles, 'module'];

  console.log(' ', chalk.yellow('Files to clean:'));
  console.log('   ', chalk.blueBright(files.join('\n    ')));

  for (const filePath of files) {
    await fs.remove(`${distDirectory}/${filePath}`);
  }
}

/********************/
/*       LINK       */
/********************/

/**
 * Get the data path of Foundry VTT based on what is configured in `foundryconfig.json`
 */
function getDataPath() {
  const config = fs.readJSONSync('foundryconfig.json');

  if (config?.dataPath) {
    if (!fs.existsSync(path.resolve(config.dataPath))) {
      throw new Error('User Data path invalid, no Data directory found');
    }

    return path.resolve(config.dataPath);
  } else {
    throw new Error('No User Data path defined in foundryconfig.json');
  }
}

/**
 * Link build to User Data folder
 */
async function linkUserData() {
  let destinationDirectory;
  if (fs.existsSync(path.resolve(sourceDirectory, 'module.json'))) {
    destinationDirectory = 'modules';
  } else {
    throw new Error(`Could not find ${chalk.blueBright('module.json')}`);
  }

  const linkDirectory = path.resolve(getDataPath(), 'Data', destinationDirectory, name);

  if (argv.clean || argv.c) {
    console.log(chalk.yellow(`Removing build in ${chalk.blueBright(linkDirectory)}.`));

    await fs.remove(linkDirectory);
  } else if (!fs.existsSync(linkDirectory)) {
    console.log(chalk.green(`Linking dist to ${chalk.blueBright(linkDirectory)}.`));
    await fs.ensureDir(path.resolve(linkDirectory, '..'));
    await fs.symlink(path.resolve(distDirectory), linkDirectory);
  }
}

const execBuild = gulp.parallel(buildCode, copyFiles);

exports.build = gulp.series(clean, execBuild);
exports.watch = buildWatch;
exports.clean = clean;
exports.link = linkUserData;
