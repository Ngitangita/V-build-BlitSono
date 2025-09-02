import type { StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S extends UseBoundStore<StoreApi<object>>> = S & {
  use: {
    [K in keyof ReturnType<S["getState"]>]: () => ReturnType<S["getState"]>[K];
  };
};

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(store: S) => {
  type State = ReturnType<S["getState"]>;
  const typedStore = store as WithSelectors<S>;
  typedStore.use = {} as WithSelectors<S>["use"];

  for (const k of Object.keys(store.getState()) as Array<keyof State>) {
    typedStore.use[k] = () => store((s) => (s as State)[k]);
  }

  return typedStore;
};

export default createSelectors;
