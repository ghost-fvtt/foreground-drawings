// SPDX-FileCopyrightText: 2021 Johannes Loher
//
// SPDX-License-Identifier: MIT

import { ForegroundDrawingsLayer } from './foreground-drawings-layer';

declare global {
  interface FlagConfig {
    Drawing: {
      'foreground-drawings'?: {
        foreground?: boolean | undefined;
      };
    };
  }

  namespace CONFIG {
    namespace Canvas {
      interface Layers {
        foregroundDrawings: ConstructorOf<ForegroundDrawingsLayer>;
      }
    }
  }

  interface Canvas {
    foregroundDrawings: ForegroundDrawingsLayer | undefined;
  }
}
