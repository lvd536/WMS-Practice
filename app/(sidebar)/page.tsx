"use client";

import { Building2, CircleUser, Warehouse } from "lucide-react";
import { useUserStore } from "@/stores/user.store";
import { useOrganizationsStore } from "@/stores/organizations.store";
import MainCard from "@/components/Dashboard/Sections/Main/MainCard";
import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";

export default function Home() {
    const user = useUserStore((s) => s.user);
    const organization = useOrganizationsStore((s) => s.currentOrganization);

    if (!user) return <DashboardSkeleton />;

    return (
        <div className="flex flex-col w-full h-screen items-center container mt-4">
            <h1 className="w-full text-start font-bold text-3xl leading-[120%] tracking-[-0.02em] text-foreground mb-8">
                Welcome back, {user.name}!
            </h1>
            <div className="flex flex-wrap w-full gap-5">
                <MainCard
                    Icon={CircleUser}
                    title="Profile Settings"
                    description="Manage your operator
                credentials, preferences, and
                security settings."
                    href="/profile"
                />
                <MainCard
                    Icon={Building2}
                    title="Organizations"
                    description="Switch between different
                    corporate entities and manage
                    global access rights."
                    href="/organizations"
                />
                <MainCard
                    Icon={Warehouse}
                    title="Warehouses"
                    description="Access physical locations, floor
                    plans, and localized settings."
                    href={
                        organization
                            ? `/organizations/${organization.id}/warehouses`
                            : ""
                    }
                />
            </div>
        </div>
    );
}
