import { IUserProfile } from "@/types/user.types";
import { create } from "zustand";

interface IUserStore {
    user: IUserProfile | null;
    setUser: (user: IUserProfile | null) => void;
    updateUser: (data: Partial<IUserProfile>) => void;
    clearUser: () => void;
}

export const useUserStore = create<IUserStore>()((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    updateUser: (data) =>
        set((state) => ({
            user: state.user
                ? {
                      ...state.user,
                      ...data,
                  }
                : null,
        })),
    clearUser: () => set({ user: null }),
}));
