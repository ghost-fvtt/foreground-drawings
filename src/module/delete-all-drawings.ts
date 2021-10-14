// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { getGame } from './helpers';

export async function deleteAllDrawings(
  { foreground } = { foreground: false },
): Promise<DrawingDocument[] | false | null> {
  const type = 'Drawing';
  const game = getGame();
  if (!game.user?.isGM) {
    throw new Error(`You do not have permission to delete ${type} objects from the Scene.`);
  }
  return Dialog.confirm({
    title: game.i18n.localize('CONTROLS.ClearAll'),
    content: `<p>${game.i18n.format('CONTROLS.ClearAllHint', {
      type: foreground ? `Foreground ${type}` : `Background ${type}`,
    })}</p>`,
    yes: () =>
      canvas?.scene?.deleteEmbeddedDocuments(
        type,
        canvas.scene.drawings
          .filter((drawing) => (drawing.data.flags['foreground-drawings']?.foreground ?? false) === foreground)
          .map((drawing) => drawing.id)
          .filter((id): id is string => !!id),
      ) ?? null,
  }) as Promise<DrawingDocument[] | false | null>;
}
