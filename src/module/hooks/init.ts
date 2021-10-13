// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { ForegroundDrawingsLayer } from '../foreground-drawings-layer';
import { libWrapper } from '../shims/libWrapperShim';
import { onUpdate } from '../wrappers/drawing';
import { getLayer } from '../wrappers/drawing-document';
import { onClickControl } from '../wrappers/drawing-hud';
import { getDocuments } from '../wrappers/drawings-layer';

export default function registerForInitHook(): void {
  Hooks.once('init', init);
}

function init() {
  logger.info(`Initializing ${packageName}`);

  CONFIG.Canvas.layers.foregroundDrawings = ForegroundDrawingsLayer;

  libWrapper.register(packageName, 'DrawingsLayer.prototype.getDocuments', getDocuments, 'WRAPPER');

  const layerTarget = 'DrawingDocument.prototype.layer';
  try {
    libWrapper.register(packageName, layerTarget, getLayer, 'OVERRIDE');
  } catch (e) {
    logger.warn(`Failed to override ${layerTarget}, some things might not work correctly:`, e);
  }

  libWrapper.register(packageName, 'DrawingHUD.prototype._onClickControl', onClickControl, 'WRAPPER');
  libWrapper.register(packageName, 'Drawing.prototype._onUpdate', onUpdate, 'WRAPPER');
}
