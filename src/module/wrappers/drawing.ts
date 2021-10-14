// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { libWrapper } from '../shims/libWrapperShim';

export default function registerDrawingWrappers() {
  libWrapper.register(packageName, 'Drawing.prototype._onUpdate', onUpdate, 'WRAPPER');
}

function onUpdate(
  this: Drawing,
  wrapped: (data: DeepPartial<foundry.data.DrawingData['_source']>) => void,
  data: DeepPartial<foundry.data.DrawingData['_source']>,
) {
  // Swap the foreground state
  if (foundry.utils.hasProperty(data, `flags.${packageName}.foreground`)) {
    swapLayer.call(this);
    const hud = this.layer.hud;
    if (hud && hud.object === this) {
      hud.clear();
    }
    this.release();
    this.draw().then(() => wrapped(data));
  } else {
    wrapped(data);
  }
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
