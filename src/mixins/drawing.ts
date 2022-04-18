// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { enforce } from '../helpers';

export function registerDrawingMixin() {
  CONFIG.Drawing.objectClass = DrawingMixin(CONFIG.Drawing.objectClass);
}

function DrawingMixin(BaseDrawing: typeof Drawing) {
  return class extends BaseDrawing {
    override _onUpdate(...args: Parameters<Drawing['_onUpdate']>) {
      const data = args[0];
      const shouldSwapForegroundState = foundry.utils.hasProperty(data, `flags.${packageName}.foreground`);
      if (shouldSwapForegroundState) {
        this.#swapLayer();
        const hud = this.layer.hud;
        if (hud && hud.object === this) {
          hud.clear();
        }
        this.release();
        data.type = data.type ?? this.data.type; // `Drawing#_onUpdate` performs a redraw if `type` changes, so we touch it to force a redraw.
      }

      super._onUpdate(...args);
    }

    #swapLayer() {
      const lastLayer = this.data.flags['foreground-drawings']?.foreground
        ? canvas?.drawings
        : canvas?.foregroundDrawings;
      const newLayer = this.data.flags['foreground-drawings']?.foreground
        ? canvas?.foregroundDrawings
        : canvas?.drawings;

      enforce(lastLayer && newLayer, 'DrawingsLayer or ForegroundDrawingsLayer not yet defined');
      delete lastLayer._controlled[this.id];
      lastLayer.objects?.removeChild(this);

      newLayer.objects?.addChild(this);
      if (this._controlled) newLayer._controlled[this.id] = this;
    }
  };
}
