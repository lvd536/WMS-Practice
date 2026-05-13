import { AppSidebar } from "@/components/Dashboard/AppSidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardProvider({
    children,
}: React.PropsWithChildren) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <SidebarTrigger className="-ml-1 px-4" />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-screen">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
