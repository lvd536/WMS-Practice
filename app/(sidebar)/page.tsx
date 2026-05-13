"use client";
import MainPage from "@/components/Dashboard/Sections/Main/MainPage";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";

export default function Home() {
    const user = useUserStore((s) => s.user);
    const email = useAuthStore((s) => s.user?.email);

    if (!user || !email || !user.name) return null;

    return <MainPage />;
}
