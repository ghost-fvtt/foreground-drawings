// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

export function getGame(): Game {
  if (!(game instanceof Game)) {
    throw new Error('Game is not initialized yet.');
  }
  return game;
}
