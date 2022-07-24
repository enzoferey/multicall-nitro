export interface Watcher<Value = unknown> {
  start: () => Promise<void>;
  subscribe: (
    subscriptionCallback: (update: SubscriptionUpdate<Value>) => void
  ) => void;
  stop: () => Promise<void>;
}

export interface MulticallCall {
  target?: string;
  call: unknown[];
  returns: Array<[string]>;
}

export interface Call {
  target?: string;
  call: unknown[];
  label: string;
}

export interface Config {
  rpcUrl: string;
  multicallAddress: string;
}

type ValueOf<T> = T[keyof T];

export interface SubscriptionUpdate<Value> {
  type: keyof Value;
  value: ValueOf<Value>;
}
