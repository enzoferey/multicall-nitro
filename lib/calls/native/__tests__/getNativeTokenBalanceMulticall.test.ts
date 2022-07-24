import { describe, it, expect } from "vitest";

import { getNativeTokenBalanceMulticall } from "../getNativeTokenBalanceMulticall";

describe("getNativeTokenBalanceMulticall", () => {
  it("should match the call", () => {
    expect(
      getNativeTokenBalanceMulticall(
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      )
    ).toMatchSnapshot();
  });
  it("should allow overwritting the value label", () => {
    expect(
      getNativeTokenBalanceMulticall(
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        {
          label: "some label",
        }
      ).label
    ).toMatchSnapshot();
  });
});
