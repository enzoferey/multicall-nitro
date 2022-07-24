import { describe, it, expect } from "vitest";

import { getErc20BalanceMulticall } from "../getErc20BalanceMulticall";

describe("getErc20BalanceMulticall", () => {
  it("should match the call", () => {
    expect(
      getErc20BalanceMulticall(
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "0xffffffffffffffffffffffffffffffffffffffff"
      )
    ).toMatchSnapshot();
  });
  it("should allow overwritting the value label", () => {
    expect(
      getErc20BalanceMulticall(
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "0xffffffffffffffffffffffffffffffffffffffff",
        { label: "some label" }
      ).label
    ).toMatchSnapshot();
  });
});
