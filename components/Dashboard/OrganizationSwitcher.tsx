"use client";

import {
    Building2,
    BriefcaseBusiness,
    Boxes,
    Factory,
    FolderOpen,
    Globe,
    HardHat,
    Landmark,
    Layers3,
    Package,
    Shield,
    Store,
    Truck,
    Users,
    Warehouse,
    ChevronsUpDown,
    Plus,
} from "lucide-react";

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

import { useOrganizationsStore } from "@/stores/organizations.store";
import { useEffect, useState } from "react";
import OrganizationModal from "./Sections/Organizations/OrganizationModal";

const ORGANIZATION_ICONS = [
    Building2,
    Warehouse,
    Boxes,
    Factory,
    Globe,
    BriefcaseBusiness,
    Layers3,
    Landmark,
    Store,
    Shield,
    Truck,
    Package,
    Users,
    HardHat,
    FolderOpen,
];

function hashString(value: string) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        hash = (hash * 31 + value.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}

function getOrganizationIconIndex(seed: string) {
    return hashString(seed) % ORGANIZATION_ICONS.length;
}

export function OrganizationSwitcher() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isMobile } = useSidebar();

    const organizations = useOrganizationsStore((state) => state.organizations);

    const currentOrganization = useOrganizationsStore(
        (state) => state.currentOrganization,
    );

    const setCurrentOrganization = useOrganizationsStore(
        (state) => state.setCurrentOrganization,
    );

    const activeOrganization = currentOrganization ?? organizations[0];

    useEffect(() => {
        if (!currentOrganization && organizations.length > 0) {
            setCurrentOrganization(organizations[0]);
        }
    }, [organizations, currentOrganization, setCurrentOrganization]);

    if (!activeOrganization) return null;

    const activeIconIndex = getOrganizationIconIndex(
        String(activeOrganization.id ?? activeOrganization.name),
    );

    const ActiveIcon = ORGANIZATION_ICONS[activeIconIndex];

    return (
        <>
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
                                    <ActiveIcon className="size-4" />
                                </div>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium text-slate-100">
                                        {activeOrganization.name}
                                    </span>
                                    <span className="truncate text-xs text-slate-400">
                                        Current organization
                                    </span>
                                </div>

                                <ChevronsUpDown className="ml-auto text-slate-400" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="
                            w-[--radix-dropdown-menu-trigger-width]
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

                            {organizations.map((org) => {
                                const orgIconIndex = getOrganizationIconIndex(
                                    String(org.id ?? org.name),
                                );

                                const OrgIcon =
                                    ORGANIZATION_ICONS[orgIconIndex];

                                const isActive =
                                    activeOrganization.id === org.id;

                                return (
                                    <DropdownMenuItem
                                        key={org.id}
                                        onClick={() =>
                                            setCurrentOrganization(org)
                                        }
                                        className={`
                                        gap-2
                                        p-2
                                        rounded-md
                                        cursor-pointer
                                        transition-colors
                                        focus:bg-slate-800
                                        hover:bg-slate-800
                                        ${isActive ? "bg-slate-800 text-slate-100" : "text-slate-100"}
                                    `}
                                    >
                                        <div
                                            className="
                                            flex size-7 items-center justify-center
                                            rounded-md
                                            border border-slate-700
                                            bg-slate-800
                                        "
                                        >
                                            <OrgIcon className="size-3.5 shrink-0 text-slate-200" />
                                        </div>

                                        <span className="text-slate-100">
                                            {org.name}
                                        </span>
                                    </DropdownMenuItem>
                                );
                            })}

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
                                text-slate-300
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

                                <button
                                    type="button"
                                    className="font-medium text-slate-300"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Add organization
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            {isModalOpen && (
                <OrganizationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
}
