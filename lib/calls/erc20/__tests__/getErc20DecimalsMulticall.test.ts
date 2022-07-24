import { describe, it, expect } from "vitest";

import { getErc20DecimalsMulticall } from "../getErc20DecimalsMulticall";

describe("getErc20DecimalsMulticall", () => {
  it("should match the call", () => {
    expect(
      getErc20DecimalsMulticall("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", {
        label: "some label",
      })
    ).toMatchSnapshot();
  });
});
