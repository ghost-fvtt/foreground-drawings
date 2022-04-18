// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';
import { enforce, getGame } from '../helpers';
import { logger } from '../logger';

export function registerForRenderDrawingHUDHook() {
  Hooks.on<Hooks.RenderApplication<DrawingHUD>>('renderDrawingHUD', renderDrawingHUD);
}

function renderDrawingHUD(drawingHUD: DrawingHUD, jQuery: JQuery): void {
  const html = jQuery[0];
  const leftControlIcons = html?.querySelector<HTMLDivElement>('div.col.left');
  if (html && leftControlIcons) {
    leftControlIcons.insertAdjacentHTML('beforeend', getControlIconsHTML(drawingHUD));
    activateListeners(drawingHUD, html);
  } else {
    logger.warn("Couldn't find left column of DrawingHUD.");
  }
}

function getControlIconsHTML(drawingHUD: DrawingHUD) {
  const game = getGame();
  const isForground = drawingHUD.object?.data.flags['foreground-drawings']?.foreground ?? false;
  const foregroundClass = isForground ? 'active' : '';
  const foregroundTitle = game.i18n.localize('foreground-drawings.HUD.DrawingForeground');
  const backgroundClass = isForground ? '' : 'active';
  const backgroundTitle = game.i18n.localize('foreground-drawings.HUD.DrawingBackground');

  return `<div class="control-icon foreground-drawings ${foregroundClass}" data-action="foreground">
  <i class="fas fa-caret-square-up" title="${foregroundTitle}"></i>
</div>
<div class="control-icon foreground-drawings ${backgroundClass}" data-action="background">
  <i class="fas fa-caret-square-down" title="${backgroundTitle}"></i>
</div>`;
}

function activateListeners(drawingHUD: DrawingHUD, html: HTMLElement) {
  html
    .querySelectorAll<HTMLElement>('.control-icon.foreground-drawings')
    .forEach((element) => element.addEventListener('click', (event) => onClickControl(drawingHUD, event)));
}

function onClickControl(drawingHUD: DrawingHUD, event: MouseEvent) {
  const controlIcon = event.currentTarget;
  enforce(controlIcon instanceof HTMLElement, `Expected ${controlIcon} to be an HTMLElement but it isn't.`);
  switch (controlIcon.dataset.action) {
    case 'foreground':
      return onToggleForeground(drawingHUD, true);
    case 'background':
      return onToggleForeground(drawingHUD, false);
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
