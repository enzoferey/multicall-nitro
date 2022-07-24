import type { Call, CallOptions } from "../../types";

export function getBlockchainNativeTokenBalanceMulticall(
  address: string,
  options: CallOptions
): Call {
  const { label } = options;

  return {
    call: ["getEthBalance(address)(uint256)", address],
    label,
  };
}
