import type { Call, CallOptions } from "../../types";

export function getErc20DecimalsMulticall(
  erc20ContractAddress: string,
  options: CallOptions
): Call {
  const { label } = options;

  return {
    target: erc20ContractAddress,
    call: ["decimals()(uint8)"],
    label,
  };
}
