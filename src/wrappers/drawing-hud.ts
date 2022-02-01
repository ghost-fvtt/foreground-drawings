// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { libWrapper } from '../shims/libWrapperShim';

export default function registerDrawingHUDWrappers() {
  libWrapper.register(packageName, 'DrawingHUD.prototype._onClickControl', onClickControl, 'WRAPPER');
}

function onClickControl(this: DrawingHUD, wrapped: (event: JQuery.ClickEvent) => unknown, event: JQuery.ClickEvent) {
  wrapped(event);
  if (event.isDefaultPrevented()) {
    return;
  }
  const button = event.currentTarget;
  switch (button.dataset.action) {
    case 'foreground':
      return onToggleForeground(this, true);
    case 'background':
      return onToggleForeground(this, false);
  }
}

/**
 * Handle toggling the foreground state of the Drawing.
 */
function onToggleForeground(drawingHUD: DrawingHUD, foreground: boolean) {
  // Toggle the underhead/overhead state
  const updates = drawingHUD.layer?.controlled.map((o) => {
    return { _id: o.id, flags: { [packageName]: { foreground } } };
  });

  // Update all objects
  return canvas?.scene?.updateEmbeddedDocuments('Drawing', updates);
}
