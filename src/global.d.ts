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
        foregroundDrawings: CONFIG.Canvas.LayerDefinition<ConstructorOf<ForegroundDrawingsLayer>>;
      }
    }
  }

  interface Canvas {
    foregroundDrawings: ForegroundDrawingsLayer | undefined;
  }

  namespace ClientSettings {
    interface Values {
      'foreground-drawings.clearDrawingsOnlyOnActiveLayer': boolean;
    }
  }
}
