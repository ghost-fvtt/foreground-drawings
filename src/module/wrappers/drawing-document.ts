// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { libWrapper } from '../shims/libWrapperShim';

export default function registerDrawingDocumentWrappers() {
  const layerTarget = 'DrawingDocument.prototype.layer';
  try {
    libWrapper.register(packageName, layerTarget, getLayer, 'OVERRIDE');
  } catch (e) {
    logger.warn(`Failed to override ${layerTarget}, some things might not work correctly:`, e);
  }
}

function getLayer(this: DrawingDocument) {
  return this.data.flags['foreground-drawings']?.foreground ? canvas?.foregroundDrawings : canvas?.drawings;
}
