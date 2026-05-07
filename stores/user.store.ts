import { create } from "zustand";

interface IUserStore {
    name: string | null;
    email: string | null;
    phone: string | null;
    about: string | null;
    avatar_url: string | null;
    background_url: string | null;
    setUserCredits: (name: string | null, email: string | null) => void;
    setUserInfo: (
        phone?: string | null,
        about?: string | null,
        avatar_url?: string | null,
        background_url?: string | null,
    ) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
    name: null,
    email: null,
    phone: null,
    about: null,
    avatar_url: null,
    background_url: null,
    setUserCredits: (name, email) => set({ name, email }),
    setUserInfo: (phone, about, avatar_url, background_url) =>
        set({ phone, about, avatar_url, background_url }),
}))();
