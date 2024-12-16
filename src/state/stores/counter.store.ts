// src/stores/useCounterStore.ts
import { create } from "zustand";
import { increment, decrement } from "@/state";

export interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => increment(set),
  decrement: () => decrement(set),
}));
