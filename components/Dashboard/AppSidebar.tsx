"use client";

import * as React from "react";
import {
    AudioWaveform,
    Building2,
    Command,
    GalleryVerticalEnd,
    LayoutDashboard,
    User,
    Warehouse,
} from "lucide-react";

import { NavMain } from "@/components/Dashboard/NavMain";
import { OrganizationSwitcher } from "@/components/Dashboard/OrganizationSwitcher";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
        },
        {
            name: "Evil Corp.",
            logo: Command,
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Organizations",
            url: "#",
            icon: Building2,
        },
        {
            title: "Warehouses",
            url: "#",
            icon: Warehouse,
        },
        {
            title: "Profile",
            url: "/profile",
            icon: User,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <OrganizationSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
