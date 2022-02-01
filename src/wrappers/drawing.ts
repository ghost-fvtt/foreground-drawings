// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { libWrapper } from '../shims/libWrapperShim';

export default function registerDrawingWrappers() {
  const target = 'Drawing.prototype._onUpdate';
  libWrapper.register(packageName, target, onUpdate, 'WRAPPER');
}

function onUpdate(
  this: Drawing,
  wrapped: (this: Drawing, ...args: Parameters<Drawing['_onUpdate']>) => ReturnType<Drawing['_onUpdate']>,
  ...args: Parameters<Drawing['_onUpdate']>
): ReturnType<Drawing['_onUpdate']> {
  const data = args[0];
  const shouldSwapForegroundState = foundry.utils.hasProperty(data, `flags.${packageName}.foreground`);
  if (shouldSwapForegroundState) {
    swapLayer.call(this);
    const hud = this.layer.hud;
    if (hud && hud.object === this) {
      hud.clear();
    }
    this.release();
    data.type = data.type ?? this.data.type; // `Drawing#_onUpdate` performs a redraw if `type` changes, so we touch it to force a redraw.
  }

  wrapped.call(this, ...args);
}

function swapLayer(this: Drawing) {
  const lastLayer = this.data.flags['foreground-drawings']?.foreground ? canvas?.drawings : canvas?.foregroundDrawings;
  const newLayer = this.data.flags['foreground-drawings']?.foreground ? canvas?.foregroundDrawings : canvas?.drawings;

  if (!lastLayer || !newLayer) {
    throw new Error('DrawingsLayer or ForegroundDrawingsLayer not yet defined');
  }
  delete lastLayer._controlled[this.id];
  lastLayer.objects?.removeChild(this);

  newLayer.objects?.addChild(this);
  if (this._controlled) newLayer._controlled[this.id] = this;
}
