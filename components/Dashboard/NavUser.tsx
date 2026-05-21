"use client";

import {
    ChevronsUpDown,
    BadgeCheck,
    Bell,
    LogOut,
    Pencil,
    Sun,
    Moon,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
    useSidebar,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "../ui/sidebar";
import { useUserStore } from "@/stores/user.store";
import { useAuthStore } from "@/stores/auth.store";
import Notifications from "../Notifications";
import { Link } from "next-view-transitions";
import { createClient } from "@/lib/supabase/client";
import { useThemeStore } from "@/stores/theme.store";
import EditProfileModal from "../Profile/EditProfileModal/EditProfileModal";

export default function NavUser() {
    const { theme, toggleTheme } = useThemeStore();
    const { user: profile, clearUser } = useUserStore();
    const { user, logout } = useAuthStore();
    const { isMobile } = useSidebar();
    const supabase = createClient();

    const handleLogout = () => {
        clearUser();
        logout();
        supabase.auth.signOut();
    };

    if (!user || !profile || !profile.name || !user.email) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={profile.avatar_path ?? ""}
                                    alt="Profile Avatar"
                                />
                                <AvatarFallback className="rounded-lg">
                                    {profile.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {profile.name}
                                </span>
                                <span className="truncate text-xs text-sidebar-foreground/70">
                                    {user.email}
                                </span>
                            </div>

                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={profile.avatar_path ?? ""}
                                            alt={profile.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {profile.name
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {profile.name}
                                        </span>
                                        <span className="truncate text-xs text-sidebar-foreground/70">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="bg-sidebar-border" />

                        <DropdownMenuGroup>
                            <Link href="/profile">
                                <DropdownMenuItem className="focus:bg-sidebar-accent focus:text-sidebar-accent-foreground">
                                    <BadgeCheck />
                                    Profile
                                </DropdownMenuItem>
                            </Link>

                            <EditProfileModal>
                                <DropdownMenuItem
                                    className="focus:bg-sidebar-accent focus:text-sidebar-accent-foreground"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Pencil />
                                    Edit Profile
                                </DropdownMenuItem>
                            </EditProfileModal>

                            <Notifications>
                                <DropdownMenuItem
                                    className="focus:bg-sidebar-accent focus:text-sidebar-accent-foreground"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </Notifications>
                            <DropdownMenuItem
                                className="focus:bg-sidebar-accent focus:text-sidebar-accent-foreground"
                                onSelect={toggleTheme}
                            >
                                {theme === "light" ? <Sun /> : <Moon />}
                                Switch Theme
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="bg-sidebar-border" />

                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="focus:bg-sidebar-accent focus:text-sidebar-accent-foreground"
                                onClick={handleLogout}
                            >
                                <LogOut />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
