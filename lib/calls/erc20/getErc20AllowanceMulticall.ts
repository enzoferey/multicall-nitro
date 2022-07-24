import type { Call } from "../../types";

export function getErc20AllowanceMulticall(
  erc20ContractAddress: string,
  ownerAddress: string,
  spenderAddress: string,
  options: { label?: string } = {}
): Call {
  const { label = "allowance" } = options;

  return {
    target: erc20ContractAddress,
    call: ["allowance(address,address)(uint256)", ownerAddress, spenderAddress],
    label,
  };
}
