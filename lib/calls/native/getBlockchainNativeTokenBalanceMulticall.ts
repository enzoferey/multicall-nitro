import type { NativeCall, CallOptions } from "../../types";

export function getBlockchainNativeTokenBalanceMulticall(
  address: string,
  options: CallOptions
): NativeCall {
  const { label } = options;

  return {
    call: ["getEthBalance(address)(uint256)", address],
    label,
  };
}
