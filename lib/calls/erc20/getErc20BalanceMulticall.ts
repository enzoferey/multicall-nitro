import type { Call, CallOptions } from "../../types";

export function getErc20BalanceMulticall(
  erc20ContractAddress: string,
  address: string,
  options: CallOptions
): Call {
  const { label } = options;

  return {
    target: erc20ContractAddress,
    call: ["balanceOf(address)(uint256)", address],
    label,
  };
}
