"use client";

import { useEffect, useRef } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";

import { getUserProfile } from "@/actions/user.actions";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { logout } = useAuthStore();

    const { clearUser, setUser } = useUserStore();
    const { login } = useAuthStore();
    const supabase = createClient();
    const router = useRouter();

    const lastSessionId = useRef<string | null>(null);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN" || event === "INITIAL_SESSION") {
                if (!session) {
                    clearUser();
                    logout();
                    return;
                }

                if (lastSessionId.current === session.user.id) return;
                lastSessionId.current = session.user.id;

                if (!session.user.email_confirmed_at) {
                    router.push("/auth/confirm-email");
                    return;
                }

                const profile = await getUserProfile(session.user.id);
                if ("error" in profile) {
                    console.error(profile.error);
                } else {
                    setUser(profile);
                    login(session.user);
                }
            }

            if (event === "SIGNED_OUT") {
                lastSessionId.current = null;
                clearUser();
                logout();
                router.push("/auth/login");
            }

            if (event === "PASSWORD_RECOVERY") {
                router.push("/auth/reset-password");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [clearUser, logout, setUser, router, login, supabase.auth]);

    return <>{children}</>;
}
