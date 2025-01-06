import type { Token } from "@/shared/types";
import type { UserState, SetAction } from "@/state";

export const setToken = (set: SetAction<UserState>, token: Token) => {
  set((state: UserState) => ({ token, isLogin: token ? true : false }));
};
