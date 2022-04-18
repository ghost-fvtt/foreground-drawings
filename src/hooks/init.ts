// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { ForegroundDrawingsLayer } from '../foreground-drawings-layer';
import { registerMixins } from '../mixins';
import { registerSettings } from '../settings';

export function registerForInitHook(): void {
  Hooks.once('init', init);
}

function init() {
  logger.info(`Initializing ${packageName}`);
  CONFIG.Canvas.layers.foregroundDrawings = {
    layerClass: ForegroundDrawingsLayer,
    group: 'interface',
  };
  registerMixins();
  registerSettings();
}
