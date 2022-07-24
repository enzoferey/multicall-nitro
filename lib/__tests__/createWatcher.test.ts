import { describe, it, expect, vi } from "vitest";
import { createWatcher as multicallCreateWatcher } from "@makerdao/multicall";

import type { Call, Config } from "../types";
import { createWatcher } from "../createWatcher";

vi.mock("@makerdao/multicall");

describe("createWatcher", () => {
  it("should call the multi call create watcher function", () => {
    const calls: Call[] = [
      {
        target: "0x0",
        call: ["whatever()"],
        label: "label",
      },
    ];
    const config: Config = {
      rpcUrl: "https://rpc.url",
      multicallAddress: "0x1",
    };

    createWatcher(calls, config);

    expect(multicallCreateWatcher).toHaveBeenCalledTimes(1);
    expect(multicallCreateWatcher).toHaveBeenCalledWith(
      [{ target: "0x0", call: ["whatever()"], returns: [["label"]] }],
      config
    );
  });
});
