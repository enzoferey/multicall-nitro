import React from "react";

import type { Watcher, Call, Config } from "../types";
import { createWatcher } from "../createWatcher";

export function useBatchedValues<Value extends Record<string, unknown>>(
  calls: Call[],
  config: Config | null
): Partial<Value> | null {
  const [value, setValue] = React.useState<Partial<Value> | null>(null);

  const watcher = React.useMemo<Watcher<Value> | null>(() => {
    if (config === null) {
      return null;
    }

    return createWatcher<Value>(calls, config);
  }, [calls, config]);

  const startWatcher = React.useCallback<
    (watcher: Watcher<Value>) => Promise<void>
  >(async (watcher) => {
    await watcher.start();

    watcher.subscribe((update) => {
      setValue((currentValue) => {
        if (currentValue === null) {
          return {
            [update.type]: update.value,
          } as Partial<Value>;
        }
        return {
          ...currentValue,
          [update.type]: update.value,
        };
      });
    });
  }, []);

  React.useEffect(() => {
    if (watcher === null) {
      return;
    }

    startWatcher(watcher);

    return () => {
      watcher.stop();
    };
  }, [startWatcher, watcher]);

  return value;
}
