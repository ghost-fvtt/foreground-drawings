// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { libWrapper } from '../shims/libWrapperShim';
import logger from '../logger';

export default function registerDrawingDocumentWrappers() {
  const target = 'DrawingDocument.prototype.layer';
  try {
    libWrapper.register(packageName, target, getLayer, 'OVERRIDE');
  } catch (e) {
    logger.warn(`Failed to override ${target}, some things might not work correctly:`, e);
  }
}

function getLayer(this: DrawingDocument) {
  return this.data.flags['foreground-drawings']?.foreground ? canvas?.foregroundDrawings : canvas?.drawings;
}
