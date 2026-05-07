import { create } from "zustand";

interface IAuthStore {
    token: string | null;
    isAuthenticated: boolean;
    setToken: (token: string | null) => void;
    setAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    token: null,
    isAuthenticated: false,
    setToken: (token) => set({ token }),
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}))();
