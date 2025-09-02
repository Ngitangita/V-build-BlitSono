
import { create } from "zustand";
import { combine, persist, createJSONStorage } from "zustand/middleware";
import createSelectors from "../utils/createSelectors";
import type { AuthStore, Admin, Client } from "../types/user";


const authStore = create<AuthStore>()(
  persist(
    combine(
      {
        isAuthenticated: false,
        token: null as string | null,
        user: null as Admin | Client | null,
      },
      (set) => ({
        setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),
        setToken: (token: string | null) => set({ token }),
        setUser: (user: Admin | Client | null) => set({ user }),
        logout: () => set({ isAuthenticated: false, token: null, user: null }),
      })
    ),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useAuthStore = createSelectors(authStore) as typeof authStore & {
  use: {
    isAuthenticated: () => boolean;
    token: () => string | null;
    user: () => Admin | Client | null;
    setIsAuthenticated: () => (auth: boolean) => void;
    setToken: () => (token: string | null) => void;
    setUser: () => (user: Admin | Client | null) => void;
    logout: () => () => void;
  };
};
