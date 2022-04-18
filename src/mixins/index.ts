// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { registerDrawingMixin } from './drawing';
import { registerDrawingDocumentMixin } from './drawing-document';
import { registerDrawingsLayerMixin } from './drawings-layer';

export function registerMixins() {
  registerDrawingMixin();
  registerDrawingDocumentMixin();
  registerDrawingsLayerMixin();
}
