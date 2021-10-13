// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { getGame } from '../helpers';
import logger from '../logger';

export default function registerForRenderDrawingHUDHook() {
  Hooks.on<Hooks.RenderApplication<DrawingHUD>>('renderDrawingHUD', renderDrawingHUD);
}

function renderDrawingHUD(app: DrawingHUD, html: JQuery): void {
  const isForground = app.object?.data.flags['foreground-drawings']?.foreground ?? false;
  const foregroundClass = isForground ? 'active' : '';
  const foregroundTitle = getGame().i18n.localize('foreground-drawings.HUD.DrawingForeground');
  const backgroundClass = isForground ? '' : 'active';
  const backgroundTitle = getGame().i18n.localize('foreground-drawings.HUD.DrawingBackground');

  const contents = `<div class="control-icon ${foregroundClass}" data-action="foreground">
  <i class="fas fa-caret-square-up" title="${foregroundTitle}"></i>
</div>
<div class="control-icon ${backgroundClass}" data-action="background">
  <i class="fas fa-caret-square-down" title="${backgroundTitle}"></i>
</div>`;

  const elem = html[0]?.querySelector<HTMLDivElement>('div.col.left');
  if (elem) {
    elem.innerHTML = contents;
    app.activateListeners(html);
  } else {
    logger.warn("Couldn't find left column of DrawingHUD.");
  }
}
