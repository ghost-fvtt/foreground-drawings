// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { registerForGetSceneControlButtonsHook } from './get-scene-control-buttons';
import { registerForInitHook } from './init';
import { registerForRenderDrawingHUDHook } from './render-drawing-hud';

export function registerForHooks() {
  registerForInitHook();
  registerForGetSceneControlButtonsHook();
  registerForRenderDrawingHUDHook();
}
