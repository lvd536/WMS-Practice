"use client";

import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/user.store";

export default function DashboardProvider({
    children,
}: React.PropsWithChildren) {
    const user = useUserStore((s) => s.user);

    if (!user) return null;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
