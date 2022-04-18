// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { packageName } from './const';

const loggingContext = packageName;
const loggingSeparator = '|';

type LogLevel = 'debug' | 'info' | 'warning' | 'error';
type LoggingFunction = (...data: unknown[]) => void;

const getLoggingFunction = (type: LogLevel = 'info'): LoggingFunction => {
  const log = { debug: console.debug, info: console.info, warning: console.warn, error: console.error }[type];
  return (...data: unknown[]) => log(loggingContext, loggingSeparator, ...data);
};

export const logger = Object.freeze({
  debug: getLoggingFunction('debug'),
  info: getLoggingFunction('info'),
  warn: getLoggingFunction('warning'),
  error: getLoggingFunction('error'),
  getLoggingFunction,
});
