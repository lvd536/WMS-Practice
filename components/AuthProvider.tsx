"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";

import { getUserProfile } from "@/actions/user.actions";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { token, isHydrated, logout } = useAuthStore();

    const { clearUser, setUser } = useUserStore();

    useEffect(() => {
        async function bootstrap() {
            if (!isHydrated) return;

            if (!token) {
                clearUser();
                return;
            }
            try {
                const profile = await getUserProfile(token);
                setUser(profile);
            } catch {
                logout();
                clearUser();
            }
        }

        bootstrap();
    }, [token, isHydrated, logout, clearUser, setUser]);

    return children;
}
