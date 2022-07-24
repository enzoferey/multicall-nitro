import type { Call, CallOptions } from "../../types";

export function getErc20AllowanceMulticall(
  erc20ContractAddress: string,
  ownerAddress: string,
  spenderAddress: string,
  options: CallOptions
): Call {
  const { label } = options;

  return {
    target: erc20ContractAddress,
    call: ["allowance(address,address)(uint256)", ownerAddress, spenderAddress],
    label,
  };
}
