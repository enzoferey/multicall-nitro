import { describe, it, expect, vi } from "vitest";
import { createWatcher as multicallCreateWatcher } from "@makerdao/multicall";

import type { SubscriptionUpdate } from "../types";
import { getBatchedValuesOnce } from "../getBatchedValuesOnce";

vi.mock("@makerdao/multicall");

describe("getBatchedValuesOnce", () => {
  it("should return batched values once", async () => {
    type Value = { label1: number; label2: number };

    const mockWatcherStart = vi.fn();
    const mockWatcherStop = vi.fn();

    multicallCreateWatcher.mockImplementationOnce(() => {
      return {
        start: mockWatcherStart,
        stop: mockWatcherStop,
        subscribe: (callback: (update: SubscriptionUpdate<Value>) => void) => {
          callback({ type: "label1", value: 1 });
          callback({ type: "label2", value: 2 });
        },
      };
    });

    const values = await getBatchedValuesOnce(
      [
        { target: "", call: [""], label: "label1" },
        { target: "", call: [""], label: "label2" },
      ],
      {
        rpcUrl: "",
        multicallAddress: "",
      }
    );

    expect(mockWatcherStart).toHaveBeenCalledTimes(1);
    expect(mockWatcherStop).toHaveBeenCalledTimes(1);
    expect(values).toEqual({ label1: 1, label2: 2 });
  });
  it("should wait for all values to arrive before returning", async () => {
    type Value = { label1: number; label2: number };

    const mockWatcherStart = vi.fn();
    const mockWatcherStop = vi.fn();

    multicallCreateWatcher.mockImplementationOnce(() => {
      return {
        start: mockWatcherStart,
        stop: mockWatcherStop,
        subscribe: (callback: (update: SubscriptionUpdate<Value>) => void) => {
          callback({ type: "label1", value: 1 });
          // No label2 update
        },
      };
    });

    getBatchedValuesOnce(
      [
        { target: "", call: [""], label: "label1" },
        { target: "", call: [""], label: "label2" },
      ],
      {
        rpcUrl: "",
        multicallAddress: "",
      }
    );

    expect(mockWatcherStart).toHaveBeenCalledTimes(1);
    expect(mockWatcherStop).toHaveBeenCalledTimes(0);
  });
});
