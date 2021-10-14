// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import registerDrawingWrappers from './drawing';
import registerGetLayerWrapper from './drawing-document';
import registerDrawingHUDWrappers from './drawing-hud';
import registerDrawingsLayerWrappers from './drawings-layer';

export default function registerWrappers() {
  registerDrawingsLayerWrappers();
  registerGetLayerWrapper();
  registerDrawingHUDWrappers();
  registerDrawingWrappers();
}
