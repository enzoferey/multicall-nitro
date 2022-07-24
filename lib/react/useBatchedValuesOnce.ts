import React from "react";

import type { Call, Config } from "../types";
import { getBatchedValuesOnce } from "../getBatchedValuesOnce";

export function useBatchedValuesOnce<Value extends Record<string, unknown>>(
  calls: Call[],
  config: Config | null
): Partial<Value> | null {
  const [value, setValue] = React.useState<Partial<Value> | null>(null);

  React.useEffect(() => {
    if (config === null) {
      return;
    }

    const updateValue = async () => {
      const batchedValues = await getBatchedValuesOnce<Value>(calls, config);
      setValue(batchedValues);
    };

    updateValue();
  }, [calls, config]);

  return value;
}
