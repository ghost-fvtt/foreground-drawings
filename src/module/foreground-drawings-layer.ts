// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from './const';
import { deleteAllDrawings } from './delete-all-drawings';
import { getGame } from './helpers';

export class ForegroundDrawingsLayer extends DrawingsLayer {
  /** @override */
  static get layerOptions() {
    return foundry.utils.mergeObject(super.layerOptions, {
      name: 'foregroundDrawings',
      zIndex: 550,
    });
  }

  /** @override */
  activate() {
    super.activate();
    this.refresh();
    return this;
  }

  /** @override */
  deactivate() {
    super.deactivate();
    this.refresh();
    return this;
  }

  /** @override */
  async deleteAll() {
    if (getGame().settings.get(packageName, 'clearDrawingsOnlyOnActiveLayer')) {
      return deleteAllDrawings({ foreground: true });
    } else {
      return super.deleteAll();
    }
  }

  /** @override */
  _getNewDrawingData(...args: Parameters<DrawingsLayer['_getNewDrawingData']>) {
    const newDrawingData = super._getNewDrawingData(...args);
    return foundry.utils.mergeObject(newDrawingData, {
      flags: { [packageName]: { foreground: true } },
    });
  }

  /** @override */
  getDocuments() {
    return this.documentCollection?.filter((doc) => doc.data.flags[packageName]?.foreground ?? false) ?? [];
  }

  /**
   * Refresh the display of drawings on the Drawings Foreground Layer.
   */
  refresh() {
    // Toggle the opacity of the container when the background drawings layer is active
    this.alpha = canvas?.drawings?._active ?? false ? 0.25 : 1.0;
  }
}
