// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from './const';
import { getGame } from './helpers';

export default function registerSettings() {
  const game = getGame();
  game.settings.register(packageName, 'clearDrawingsOnlyOnActiveLayer', {
    name: 'foreground-drawings.CONTROLS.ClearDrawingsOnlyOnActiveLayerSetting',
    hint: 'foreground-drawings.CONTROLS.ClearDrawingsOnlyOnActiveLayerSettingHint',
    scope: 'client',
    config: true,
    type: Boolean,
    default: true,
    onChange: () => window.location.reload(),
  });
}
