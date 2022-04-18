// SPDX-FileCopyrightText: 2022 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { deleteAllDrawings } from '../delete-all-drawings';

export function registerDrawingsLayerMixin() {
  CONFIG.Canvas.layers.drawings.layerClass = DrawingsLayerMixin(CONFIG.Canvas.layers.drawings.layerClass);
}

function DrawingsLayerMixin(BaseDrawingsLayer: typeof DrawingsLayer) {
  return class extends BaseDrawingsLayer {
    override getDocuments() {
      return super.getDocuments().filter((doc) => !doc.data.flags[packageName]?.foreground);
    }

    override async deleteAll() {
      return deleteAllDrawings({ foreground: false });
    }
  };
}
