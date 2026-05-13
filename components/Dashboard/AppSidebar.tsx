"use client";

import * as React from "react";
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Command,
    GalleryVerticalEnd,
    Settings2,
    SquareTerminal,
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
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Organizations",
            url: "#",
            icon: Bot,
        },
        {
            title: "Warehouses",
            url: "#",
            icon: BookOpen,
        },
        {
            title: "Profile",
            url: "#",
            icon: Settings2,
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
