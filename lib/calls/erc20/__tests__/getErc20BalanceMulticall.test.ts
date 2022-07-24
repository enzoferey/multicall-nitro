import { describe, it, expect } from "vitest";

import { getErc20BalanceMulticall } from "../getErc20BalanceMulticall";

describe("getErc20BalanceMulticall", () => {
  it("should match the call", () => {
    expect(
      getErc20BalanceMulticall(
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "0xffffffffffffffffffffffffffffffffffffffff",
        { label: "some label" }
      )
    ).toMatchSnapshot();
  });
});
