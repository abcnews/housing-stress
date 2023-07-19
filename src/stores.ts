import { get, derived, type Readable } from 'svelte/store';

export const createPreviousStore = <T extends unknown>(store: Readable<T>) => {
  let previousValue = get(store);
  const previousStore = derived(store, (newVal, set: (value: T) => void) => {
    set(previousValue);
    previousValue = newVal;
  });
  return previousStore;
};
