import type { Call } from "../../types";

export function getErc20BalanceMulticall(
  erc20ContractAddress: string,
  address: string,
  options: { label?: string } = {}
): Call {
  const { label = "balance" } = options;

  return {
    target: erc20ContractAddress,
    call: ["balanceOf(address)(uint256)", address],
    label,
  };
}
