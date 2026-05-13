"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function OrganizationSwitcher({
    teams,
}: {
    teams: {
        name: string;
        logo: React.ElementType;
    }[];
}) {
    const { isMobile } = useSidebar();
    const [activeTeam, setActiveTeam] = React.useState(teams[0]);

    if (!activeTeam) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="
                                data-[state=open]:bg-slate-800
                                data-[state=open]:text-white
                                hover:bg-slate-800/70
                                transition-colors
                            "
                        >
                            <div
                                className="
                                    flex aspect-square size-8 items-center justify-center
                                    rounded-lg
                                    bg-slate-700
                                    text-white
                                "
                            >
                                <activeTeam.logo className="size-4" />
                            </div>

                            <span className="truncate font-medium text-slate-100">
                                {activeTeam.name}
                            </span>

                            <ChevronsUpDown className="ml-auto text-slate-400" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="
                            w-(--radix-dropdown-menu-trigger-width)
                            min-w-56
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900
                            text-slate-100
                            shadow-2xl
                            backdrop-blur-xl
                            ml-1
                        "
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={6}
                    >
                        <DropdownMenuLabel className="text-xs text-slate-400">
                            Organizations
                        </DropdownMenuLabel>

                        {teams.map((team) => (
                            <DropdownMenuItem
                                key={team.name}
                                onClick={() => setActiveTeam(team)}
                                className="
                                    gap-2
                                    p-2
                                    rounded-md
                                    cursor-pointer
                                    focus:bg-slate-800
                                    focus:text-white
                                    hover:bg-slate-800
                                    transition-colors
                                "
                            >
                                <div
                                    className="
                                        flex size-7 items-center justify-center
                                        rounded-md
                                        border border-slate-700
                                        bg-slate-800
                                    "
                                >
                                    <team.logo className="size-3.5 shrink-0 text-slate-200" />
                                </div>

                                <span className="text-slate-100">
                                    {team.name}
                                </span>
                            </DropdownMenuItem>
                        ))}

                        <DropdownMenuSeparator className="bg-slate-700" />

                        <DropdownMenuItem
                            className="
                                gap-2
                                p-2
                                rounded-md
                                cursor-pointer
                                focus:bg-slate-800
                                hover:bg-slate-800
                                transition-colors
                            "
                        >
                            <div
                                className="
                                    flex size-7 items-center justify-center
                                    rounded-md
                                    border border-dashed border-slate-600
                                    bg-slate-800/60
                                "
                            >
                                <Plus className="size-4 text-slate-300" />
                            </div>

                            <div className="font-medium text-slate-300">
                                Add organization
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
