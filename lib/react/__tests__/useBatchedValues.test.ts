/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from "vitest";
import React from "react";
import { createWatcher as multicallCreateWatcher } from "@makerdao/multicall";
import { renderHook, act, waitFor } from "@testing-library/react";

import type { Call, SubscriptionUpdate } from "../../types";
import { useBatchedValues } from "../useBatchedValues";

vi.mock("@makerdao/multicall");

describe("useBatchedValues", () => {
  it("should return values as they arrive and keep updating them afterwards", async () => {
    type Value = { label1: number; label2: number };

    const mockWatcherStart = vi.fn();
    const mockWatcherStop = vi.fn();

    const subscriptions: Array<(update: SubscriptionUpdate<Value>) => void> =
      [];

    multicallCreateWatcher.mockImplementationOnce(() => {
      return {
        start: mockWatcherStart,
        stop: mockWatcherStop,
        subscribe: (callback: (update: SubscriptionUpdate<Value>) => void) => {
          subscriptions.push(callback);
        },
      };
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

      return useBatchedValues<Value>(calls, config);
    });

    expect(mockWatcherStart).toHaveBeenCalledTimes(1);
    expect(result.current).toBe(null);

    await waitFor(() => {
      expect(subscriptions.length > 0).toBe(true);
    });

    // Send first value
    for (const subscription of subscriptions) {
      act(() => {
        subscription({ type: "label1", value: 1 });
      });
    }
    expect(result.current).toEqual({ label1: 1 });

    // Send second value
    for (const subscription of subscriptions) {
      act(() => {
        subscription({ type: "label2", value: 2 });
      });
    }
    expect(result.current).toEqual({ label1: 1, label2: 2 });

    // Send first value updated
    for (const subscription of subscriptions) {
      act(() => {
        subscription({ type: "label1", value: 10 });
      });
    }
    expect(result.current).toEqual({ label1: 10, label2: 2 });
  });
  it("should stop the watcher when unmounting", () => {
    const mockWatcherStart = vi.fn();
    const mockWatcherStop = vi.fn();

    multicallCreateWatcher.mockImplementationOnce(() => {
      return {
        start: mockWatcherStart,
        stop: mockWatcherStop,
        subscribe: () => {
          // do nothing
        },
      };
    });

    const { unmount } = renderHook(() => {
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

      return useBatchedValues(calls, config);
    });

    expect(mockWatcherStart).toHaveBeenCalledTimes(1);
    expect(mockWatcherStop).toHaveBeenCalledTimes(0);

    unmount();

    expect(mockWatcherStart).toHaveBeenCalledTimes(1);
    expect(mockWatcherStop).toHaveBeenCalledTimes(1);
  });
  it("should do nothing with a null config", () => {
    const { result } = renderHook(() => {
      const calls: Call[] = [];
      const config = null;

      return useBatchedValues(calls, config);
    });

    expect(multicallCreateWatcher).toHaveBeenCalledTimes(0);
    expect(result.current).toBe(null);
  });
});
