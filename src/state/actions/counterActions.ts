import type { CounterState, SetAction } from "@/state";

export const increment = (set: SetAction<CounterState>) => {
  set((state: CounterState) => ({ count: state.count + 1 }));
};

export const decrement = (set: SetAction<CounterState>) => {
  set((state: CounterState) => ({ count: state.count - 1 }));
};
