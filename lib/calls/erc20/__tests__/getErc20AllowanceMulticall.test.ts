import { describe, it, expect } from "vitest";

import { getErc20AllowanceMulticall } from "../getErc20AllowanceMulticall";

describe("getErc20AllowanceMulticall", () => {
  it("should match the call", () => {
    expect(
      getErc20AllowanceMulticall(
        "0xdddddddddddddddddddddddddddddddddddddddd",
        "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        "0xffffffffffffffffffffffffffffffffffffffff",
        { label: "some label" }
      )
    ).toMatchSnapshot();
  });
});
