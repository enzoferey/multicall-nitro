# multicall-nitro

![Tests](https://github.com/enzoferey/multicall-nitro/actions/workflows/test.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@enzoferey%2Fmulticall-nitro.svg)](https://badge.fury.io/js/@enzoferey%2Fmulticall-nitro)
[![codecov](https://codecov.io/gh/enzoferey/multicall-nitro/branch/main/graph/badge.svg?token=8KLY137H6P)](https://codecov.io/gh/enzoferey/multicall-nitro)

Supercharge Multicall.js with nitro features 💨

## Highlights

- TypeScript support ✅
- Ready-to-use calls ✍🏻
- React hook ⚛️
- One time call 🎯
- Simplified API ✨

## Why

While [Multicall.js](https://github.com/makerdao/multicall.js) provides a JavaScript interface to the amazing [Multicall](https://github.com/makerdao/multicall) contract by MakerDAO, it still requires a bit of work to integrate it into a real world production application. This is where `multicall-nitro` comes in.

The goal is to provide a layer on top of Multicall.js that supercharges its features and eases its usage in different contexts. Thanks to fully typed and simplified APIs plus different utilities, your Multicall integration will be on nitro 💨

## Getting started

1. Install the package & its peer dependency

```sh
yarn add @enzoferey/multicall-nitro @makerdao/multicall
```

2. Follow along the use cases below 👇🏻

> 💡 No matter the use case, you will need to provide a configuration object containing:
>
> - `rpcUrl`: the url of the RPC node you want to use to make the calls (it could be Infura, Alchemy, etc.)
> - `multicallAddress`: the address of the Multicall contract in your target blockchain. See [here](https://github.com/makerdao/multicall)

### Get batched values and subscribe to changes

The most common use case is to get batched values from the blockchain and subscribe to changes.

```ts
import {
  createWatcher,
  BigNumber,
  getErc20BalanceMulticall,
} from "@enzoferey/multicall-nitro";

type Value = { balanceToken1: BigNumber; balanceToken2: BigNumber };

const connectedAccountAddress = "0x...";

const tokenAddress1 = "0x...";
const tokenAddress2 = "0x...";

const calls = [
  getErc20BalanceMulticall(tokenAddress1, connectedAccountAddress, {
    label: "balanceToken1",
  }),
  getErc20BalanceMulticall(tokenAddress2, connectedAccountAddress, {
    label: "balanceToken2",
  }),
];

const watcher = createWatcher<Value>(calls, {
  rpcUrl: "INSERT HERE YOUR RPC NODE URL",
  multicallAddress: "INSERT HERE THE TARGET MULTICALL CONTRACT ADDRESS",
});

// Start watching for the values
await watcher.start();

// Subscribe to values changes
watcher.subscribe((update) => {
  // `update` contains the value for one of the calls
  //  -> `update.type` is the label of the call
  //  -> `update.value` is the value of the call
  //
  // For example, with the calls above, we could get `{ type: "balanceToken1", value: BigNumber(...) }`
  console.log(`Call with label ${update.type} returned value ${update.value}`);
});

// Later when finished
await watcher.stop();
```

### Get batched values once

Sometimes you do not want to subscribe to values updates but just get them once. The returned promise will resolve when all values have been received.

```ts
import {
  getBatchedValuesOnce,
  BigNumber,
  getErc20BalanceMulticall,
} from "@enzoferey/multicall-nitro";

type Value = { balanceToken1: BigNumber; balanceToken2: BigNumber };

const connectedAccountAddress = "0x...";

const tokenAddress1 = "0x...";
const tokenAddress2 = "0x...";

const calls = [
  getErc20BalanceMulticall(tokenAddress1, connectedAccountAddress, {
    label: "balanceToken1",
  }),
  getErc20BalanceMulticall(tokenAddress2, connectedAccountAddress, {
    label: "balanceToken2",
  }),
];

const batchedValues = await getBatchedValuesOnce<Value>(calls, {
  rpcUrl: "INSERT HERE YOUR RPC NODE URL",
  multicallAddress: "INSERT HERE THE TARGET MULTICALL CONTRACT ADDRESS",
});

// At this point `batchedValues` contains the values of the specified calls
// -> `batchedValues.balanceToken1` is the value of the call with label "balanceToken1"
// -> `batchedValues.balanceToken2` is the value of the call with label "balanceToken2"
```

### Get ERC20 token values

Writing calls is tedious and error-prone, use these utilities to get values of ERC20 tokens.

```ts
import {
  getErc20BalanceMulticall,
  getErc20DecimalsMulticall,
  getErc20AllowanceMulticall,
} from "@enzoferey/multicall-nitro";

const tokenAddress1 = "0x...";
const connectedAccountAddress = "0x...";
const someOtherAccountAddress = "0x...";

const calls = [
  // Get the ERC20 token balance of `connectedAccountAddress`
  getErc20BalanceMulticall(tokenAddress1, connectedAccountAddress, {
    label: "balanceToken1",
  }),
  // Get the ERC20 token decimals
  getErc20DecimalsMulticall(tokenAddress1, {
    label: "decimalsToken1",
  }),
  // Get the ERC20 token allowance provided by `connectedAccountAddress` to `someOtherAccountAddress`
  getErc20AllowanceMulticall(
    tokenAddress1,
    connectedAccountAddress,
    someOtherAccountAddress,
    {
      label: "allowanceToken1",
    }
  ),
];

// you can then pass these `calls` into `createWatcher`, `getBatchedValuesOnce` or any other entry point
```

Are you missing any utility for ERC20 tokens values ? Please open an issue or pull request 🙏🏻

### Get blockchain values

Writing calls is tedious and error-prone, use these utilities to get values of the blockchain you connect to.

```ts
import { getBlockchainNativeTokenBalanceMulticall } from "@enzoferey/multicall-nitro";

const connectedAccountAddress = "0x...";

const calls = [
  // Get the native token (ETH, MATIC, BNB, etc.) balance of `connectedAccountAddress`
  getBlockchainNativeTokenBalanceMulticall(connectedAccountAddress, {
    label: "nativeTokenBalance",
  }),
];

// you can then pass these `calls` into `createWatcher`, `getBatchedValuesOnce` or any other entry point
```

Are you missing any utility for blockchain values ? Please open an issue or pull request 🙏🏻

### Custom calls

On top of the built-in utilities that enable you to construct common calls, you can write your own custom calls.

```ts
import { Call } from "@enzoferey/multicall-nitro";

const calls = [
  // Call method "getResult" on contract address 0x2222222222222222222222222222222222222222
  // This method takes an `uint256` and a `string` as argument and returns a `string`
  {
    target: "0x2222222222222222222222222222222222222222",
    call: ["getResult(uint256,string)(string)", 10, "hello"],
    label: "someCustomCallLabel1",
  },
  // Call method "getBestNumber" on contract address 0x3333333333333333333333333333333333333333
  // This method takes three `uint16` and returns a `uint16`
  {
    target: "0x3333333333333333333333333333333333333333",
    call: ["getBestNumber(uint16,uint16,uint16)(uint16)", 10, 12, 14],
    label: "someCustomCallLabel2",
  },
  // any other call you want to make
];

// you can then pass these `calls` into `createWatcher`, `getBatchedValuesOnce` or any other entry point
```

### Use batched values in React

Wraps [`createWatcher`](#get-batched-values-and-subscribe-to-changes) into a React hook.

> 💡 In order to use this hook, you need to have the `react` peer dependency installed.
>
> ```sh
> yarn add react
> ```
>
> Notice the trailing `/react` on the import statement, this is for reducing bundle size
> if you don't use the React specific code.

```ts
import { useBatchedValues } from "@enzoferey/multicall-nitro/react";
import { Call, BigNumber } from "@enzoferey/multicall-nitro";

// You can define your calls outside the render function if statis
const calls = [
  getErc20BalanceMulticall("0x...", connectedAddress, { label: "balance" }),
  getErc20DecimalsMulticall("0x...", {
    label: "decimals",
  }),
];

const MyComponent = (props) => {
  const { tokenAddress } = props;

  // You can define your calls inside the render function if dynamic
  const calls = React.useMemo<Call[]>(() => {
    return [
      getErc20BalanceMulticall(tokenAddress, connectedAddress, {
        label: "balance",
      }),
      getErc20DecimalsMulticall(tokenAddress, {
        label: "decimals",
      }),
    ];
  }, []);

  // In both cases, you can then use `useBatchedValues` to get the values of your calls
  const batchedValues = useBatchedValues<{
    balance: BigNumber;
    decimals: number;
  }>(calls);

  // First, `batchedValues` will be `null` until the first value arrives
  // Then, `batchedValues` will be the partial object defined by the type passed, in this case:
  // `{ balance?: BigNumber, decimals?: number }`
};
```

### Use batched values once in React

Wraps [`getBatchedValuesOnce`](#get-batched-values-once) into a React hook. The returned value will be `null` until all values have been received.

> 💡 In order to use this hook, you need to have the `react` peer dependency installed.
>
> ```sh
> yarn add react
> ```
>
> Notice the trailing `/react` on the import statement, this is for reducing bundle size
> if you don't use the React specific code.

```ts
import { useBatchedValuesOnce } from "@enzoferey/multicall-nitro/react";
import { Call, BigNumber } from "@enzoferey/multicall-nitro";

// You can define your calls outside the render function if statis
const calls = [
  getErc20BalanceMulticall("0x...", connectedAddress, { label: "balance" }),
  getErc20DecimalsMulticall("0x...", {
    label: "decimals",
  }),
];

const MyComponent = (props) => {
  const { tokenAddress } = props;

  // You can define your calls inside the render function if dynamic
  const calls = React.useMemo<Call[]>(() => {
    return [
      getErc20BalanceMulticall(tokenAddress, connectedAddress, {
        label: "balance",
      }),
      getErc20DecimalsMulticall(tokenAddress, {
        label: "decimals",
      }),
    ];
  }, []);

  // In both cases, you can then use `useBatchedValuesOnce` to get the values of your calls
  const batchedValues = useBatchedValuesOnce<{
    balance: BigNumber;
    decimals: number;
  }>(calls);

  // First, `batchedValues` will be `null` until all values are received
  // Then, `batchedValues` will be the object defined by the type passed
};
```
