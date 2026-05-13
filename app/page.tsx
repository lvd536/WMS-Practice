"use client";
import DashboardProvider from "@/components/Dashboard/DashboardProvider";
import MainPage from "@/components/Dashboard/Sections/Main/MainPage";
import EditProfileModal from "@/components/EditProfileModal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";
import { ArrowLeft } from "lucide-react";

export default function Home() {
    const user = useUserStore((s) => s.user);
    const email = useAuthStore((s) => s.user?.email);

    if (!user || !email || !user.name) return null;

    return (
        <DashboardProvider>
            <MainPage />
        </DashboardProvider>
    );
}
