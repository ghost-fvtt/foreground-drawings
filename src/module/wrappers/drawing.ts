// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { libWrapper } from '../shims/libWrapperShim';

export default function registerDrawingWrappers() {
  const target = 'Drawing.prototype._onUpdate';
  try {
    libWrapper.register(packageName, target, onUpdate, 'OVERRIDE');
  } catch (e) {
    logger.warn(`Failed to override ${target}, some things might not work correctly:`, e);
  }
}

function onUpdate(this: Drawing, data: DeepPartial<foundry.data.DrawingData['_source']>) {
  const superOnUpdate = Object.getPrototypeOf(Drawing).prototype._onUpdate.bind(this);
  const keys = new Set(Object.keys(data));
  const redraw = ['type', 'text', 'texture', 'fontFamily', 'fontSize', 'textColor'];

  const shouldSwapForegroundState = foundry.utils.hasProperty(data, `flags.${packageName}.foreground`);
  const shouldFullyRedraw = shouldSwapForegroundState || redraw.some((k) => keys.has(k));

  if (shouldSwapForegroundState) {
    swapLayer.call(this);
    const hud = this.layer.hud;
    if (hud && hud.object === this) {
      hud.clear();
    }
    this.release();
  }

  if (shouldFullyRedraw) {
    this.draw().then(() => superOnUpdate(data));
  } else {
    superOnUpdate(data);
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
