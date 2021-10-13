// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

export function getLayer(this: DrawingDocument) {
  return this.data.flags['foreground-drawings']?.foreground ? canvas?.foregroundDrawings : canvas?.drawings;
}
