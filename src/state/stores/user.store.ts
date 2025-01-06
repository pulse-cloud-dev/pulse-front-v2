import { create } from "zustand";

import type { Token } from "@/shared/types";
import { setToken } from "@/state";

export interface UserState {
  isLogin: boolean;
  token: Token;
  setToken: (token: Token) => void;
}

export const useUserStore = create<UserState>((set) => ({
  isLogin: false,
  token: "",
  setToken: (token: Token) => setToken(set, token!),
}));
