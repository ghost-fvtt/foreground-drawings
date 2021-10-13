// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from '../const';

export function getDocuments(wrapped: DrawingsLayer['getDocuments']) {
  return wrapped().filter((doc) => !doc.data.flags[packageName]?.foreground);
}
