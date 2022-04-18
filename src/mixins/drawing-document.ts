// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { enforce } from '../helpers';

export function registerDrawingDocumentMixin() {
  CONFIG.Drawing.documentClass = DrawingDocumentMixin(CONFIG.Drawing.documentClass);
}

function DrawingDocumentMixin(BaseDrawingDocument: typeof DrawingDocument) {
  return class extends BaseDrawingDocument {
    override get layer() {
      enforce(canvas, 'canvas not initialized yet!');
      enforce(canvas.foregroundDrawings, 'ForegroundDrawings layer not initialized yet!');
      return this.data.flags['foreground-drawings']?.foreground ? canvas.foregroundDrawings : super.layer;
    }
  };
}
