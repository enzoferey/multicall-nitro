import { describe, it, expect } from "vitest";

import { getBlockchainNativeTokenBalanceMulticall } from "../getBlockchainNativeTokenBalanceMulticall";

describe("getBlockchainNativeTokenBalanceMulticall", () => {
  it("should match the call", () => {
    expect(
      getBlockchainNativeTokenBalanceMulticall(
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      )
    ).toMatchSnapshot();
  });
  it("should allow overwritting the value label", () => {
    expect(
      getBlockchainNativeTokenBalanceMulticall(
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        {
          label: "some label",
        }
      ).label
    ).toMatchSnapshot();
  });
});
