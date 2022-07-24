import { createWatcher as multicallCreateWatcher } from "@makerdao/multicall";

import type { MulticallCall, Call, Config, Watcher } from "./types";

export function createWatcher(calls: Call[], config: Config): Watcher {
  const multicallCalls = getMulticallCalls(calls);
  return multicallCreateWatcher(multicallCalls, config);
}

function getMulticallCalls(calls: Call[]): MulticallCall[] {
  return calls.map<MulticallCall>((call) => {
    return {
      target: call.target,
      call: call.call,
      returns: [[call.label]],
    };
  });
}
