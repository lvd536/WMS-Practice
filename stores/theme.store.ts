import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IThemeStore {
    theme: "light" | "dark";
    toggleTheme: () => void;
}

export const useThemeStore = create<IThemeStore>()(
    persist(
        (set) => ({
            theme: "light",
            toggleTheme: () =>
                set((perv) => ({
                    theme: perv.theme === "light" ? "dark" : "light",
                })),
        }),
        {
            name: "theme-storage",
        },
    ),
);
