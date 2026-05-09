"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";

import { getUserProfile } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { token, isHydrated, logout } = useAuthStore();

    const { clearUser, setUser } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        async function bootstrap() {
            if (!isHydrated) return;

            if (!token) {
                clearUser();
                router.push("/auth/login");
                return;
            }
            try {
                const profile = await getUserProfile(token);
                setUser(profile);
            } catch {
                logout();
                clearUser();
                router.push("/auth/login");
            }
        }

        bootstrap();
    }, [token, isHydrated, logout, clearUser, setUser, router]);

    return children;
}
