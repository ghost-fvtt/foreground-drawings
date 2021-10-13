// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

export default function registerForGetSceneControlButtonsHook() {
  Hooks.on('getSceneControlButtons', getSceneControlButtons);
}

function getSceneControlButtons(controls: SceneControl[]) {
  const drawings = controls.find((control) => control.name === 'drawings');
  if (!drawings) {
    throw new Error('Could not find drawings scene controlls');
  }

  const indexOfConfigure = drawings.tools.findIndex((tool) => tool.name === 'configure');
  drawings.tools.splice(indexOfConfigure, 0, {
    name: 'foregroundDrawings',
    title: 'foreground-drawings.CONTROLS.DrawingForeground',
    icon: 'fas fa-caret-square-up',
    toggle: true,
    active: canvas?.foregroundDrawings?._active ?? false,
    onClick: (toggled: boolean) => canvas?.[toggled ? 'foregroundDrawings' : 'drawings']?.activate(),
  });
}
