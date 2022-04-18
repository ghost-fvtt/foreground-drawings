// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

export function getGame(): Game {
  enforce(game instanceof Game, 'Game is not initialized yet.');
  return game;
}

const defaultErrorMessage =
  'There has been an unexpected error in the Foreground Drawings module. For more details, please take a look at the console (F12).';

/**
 * Tests if the given `value` is truthy.
 *
 * If it is not truthy, an {@link Error} is thrown, which depends on the given `message` parameter:
 * - If `message` is a string`, it is used to construct a new {@link Error} which then is thrown.
 * - If `message` is an instance of {@link Error}, it is thrown.
 * - If `message` is `undefined`, an {@link Error} with a default message is thrown.
 */
export function enforce(value: unknown, message: string | Error = defaultErrorMessage): asserts value {
  if (!value) {
    throw message instanceof Error ? message : new Error(message);
  }
}
