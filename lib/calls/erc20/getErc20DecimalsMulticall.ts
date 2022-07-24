import type { Call } from "../../types";

export function getErc20DecimalsMulticall(
  erc20ContractAddress: string,
  options: { label?: string } = {}
): Call {
  const { label = "decimals" } = options;

  return {
    target: erc20ContractAddress,
    call: ["decimals()(uint8)"],
    label,
  };
}
