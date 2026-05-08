import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
    token: string | null;

    isAuthenticated: boolean;
    isHydrated: boolean;

    login: (token: string) => void;
    logout: () => void;

    setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            isHydrated: false,
            login: (token) => set({ token: token, isAuthenticated: true }),
            logout: () => set({ isAuthenticated: false, token: null }),
            setHydrated: (value) => set({ isHydrated: value }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
            }),

            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        },
    ),
);
