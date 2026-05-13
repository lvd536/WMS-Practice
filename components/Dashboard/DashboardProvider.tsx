"use client";

import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/user.store";
import { Link } from "next-view-transitions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function DashboardProvider({
    children,
}: React.PropsWithChildren) {
    const user = useUserStore((s) => s.user);

    if (!user) return null;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1 px-4" />
                    <h1 className="flex items-center gap-3 font-semibold text-2xl leading-[140%] text-foreground">
                        WMS Dashboard
                    </h1>
                    <Link href="/profile">
                        <Avatar>
                            <AvatarImage src={user?.avatar_path ?? undefined} />
                            <AvatarFallback>
                                {user!.name!.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Link>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-screen">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
