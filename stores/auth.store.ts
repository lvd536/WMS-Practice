import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface IAuthStore {
    user: User | null;
    isAuthenticated: boolean;

    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>()((set) => ({
    user: null,
    isAuthenticated: false,
    isHydrated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));
