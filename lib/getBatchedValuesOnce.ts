import type { Call, Config } from "./types";
import { createWatcher } from "./createWatcher";

export async function getBatchedValuesOnce<
  Value extends Record<string, unknown>
>(calls: Call[], config: Config): Promise<Value> {
  const watcher = createWatcher<Value>(calls, config);

  await watcher.start();

  return new Promise<Value>((resolve) => {
    const aggregatedValue = {} as Value;

    const hasCallBeenDone = (call: Call): boolean => {
      return aggregatedValue[call.label] !== undefined;
    };

    watcher.subscribe(async (update) => {
      aggregatedValue[update.type] = update.value;

      if (calls.every(hasCallBeenDone)) {
        await watcher.stop();

        resolve(aggregatedValue);
      }
    });
  });
}
