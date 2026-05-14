"use client";

import * as React from "react";
import { Building2, LayoutDashboard, User, Warehouse } from "lucide-react";

import { NavMain } from "@/components/Dashboard/NavMain";
import { OrganizationSwitcher } from "@/components/Dashboard/OrganizationSwitcher";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { useOrganizationsStore } from "@/stores/organizations.store";
import { useAuthStore } from "@/stores/auth.store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useAuthStore((s) => s.user);
    const currentOrganization = useOrganizationsStore(
        (s) => s.currentOrganization,
    );
    const organizations = useOrganizationsStore((s) => s.organizations);

    const data = {
        navMain: [
            {
                title: "Dashboard",
                url: "/",
                icon: LayoutDashboard,
                isActive: true,
            },
            {
                title: "Organizations",
                url: "/organizations",
                icon: Building2,
            },
            {
                title: "Warehouses",
                url: currentOrganization
                    ? `/organizations/organization/${currentOrganization.id}/warehouses`
                    : "/",
                icon: Warehouse,
                disabled: !currentOrganization,
            },
            {
                title: "Profile",
                url: "/profile",
                icon: User,
                disabled: !user,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrganizationSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
