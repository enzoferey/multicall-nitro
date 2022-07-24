/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, Mock } from "vitest";
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";

import type { Call } from "../../types";
import { getBatchedValuesOnce } from "../../getBatchedValuesOnce";
import { useBatchedValuesOnce } from "../useBatchedValuesOnce";

vi.mock("../../getBatchedValuesOnce");

describe("useBatchedValuesOnce", () => {
  it("should return batched values once", async () => {
    // Only fake setTimeout as setInterval is being used by waitFor
    vi.useFakeTimers({ toFake: ["setTimeout"] });

    type Value = { label1: number; label2: number };

    const batchedValues = { label1: 1, label2: 2 };

    (getBatchedValuesOnce as Mock).mockImplementationOnce(() => {
      return new Promise<Value>((resolve) => {
        setTimeout(() => {
          resolve(batchedValues);
        }, 100000);
      });
    });

    const { result } = renderHook(() => {
      const calls = React.useMemo(() => {
        return [
          { target: "", call: [""], label: "label1" },
          { target: "", call: [""], label: "label2" },
        ];
      }, []);

      const config = React.useMemo(() => {
        return {
          rpcUrl: "",
          multicallAddress: "",
        };
      }, []);

      return useBatchedValuesOnce<Value>(calls, config);
    });

    expect(getBatchedValuesOnce).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(null);

    vi.runAllTimers();

    await waitFor(() => {
      return expect(result.current).toEqual(batchedValues);
    });

    vi.restoreAllMocks();
  });
  it("should do nothing with a null config", () => {
    const { result } = renderHook(() => {
      const calls: Call[] = [];
      const config = null;

      return useBatchedValuesOnce(calls, config);
    });

    expect(getBatchedValuesOnce).toHaveBeenCalledTimes(0);
    expect(result.current).toBe(null);
  });
});
