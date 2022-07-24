import type { Call } from "../../types";

export function getNativeTokenBalanceMulticall(
  address: string,
  options: { label?: string } = {}
): Call {
  const { label = "balance" } = options;

  return {
    call: ["getEthBalance(address)(uint256)", address],
    label,
  };
}
