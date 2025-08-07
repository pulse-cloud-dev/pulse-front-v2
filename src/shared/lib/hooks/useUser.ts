import { useEffect } from "react";

import { useUserStore } from "@/state";

export function useUser() {
  const userStore = useUserStore();

  const login = (token: string) => {
    if (!token) return;
    userStore.setToken(token);
    localStorage.setItem("pulse", JSON.stringify({ token }));
  };

  const logout = () => {
    userStore.setToken(null);
    localStorage.removeItem("pulse");
  };

  useEffect(() => {
    const token = localStorage.getItem("pulse");

    if (!token) return;

    userStore.setToken(token);
  }, []);

  return {
    isLogin: userStore.isLogin,
    login,
    logout,
  };
}
