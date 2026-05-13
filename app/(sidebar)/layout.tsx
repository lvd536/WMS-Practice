import DashboardProvider from "@/components/Dashboard/DashboardProvider";

export default function SidebarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <DashboardProvider>{children}</DashboardProvider>;
}
