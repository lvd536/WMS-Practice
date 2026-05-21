"use server";

import { getOrganizationInventoryMovements } from "@/actions/logs.actions";
import { getOrganizationMembers } from "@/actions/member.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { getAllWarehouses } from "@/actions/warehouse.actions";
import MovementActivityChart from "@/components/Dashboard/Analytics/MovementActivityChart";
import WriteOffChart from "@/components/Dashboard/Analytics/WriteOffChart";
import InviteMemberModal from "@/components/Dashboard/Sections/Organizations/Member/InviteMemberModal/InviteMemberModal";
import MemberCard from "@/components/Dashboard/Sections/Organizations/Member/MemberCard";
import WarehouseCard from "@/components/Dashboard/Sections/Warehouses/Warehouse/WarehouseCard";
import WarehousesHeaderActions from "@/components/Dashboard/Sections/Warehouses/WarehousesHeaderActions";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getMovementDataPoint } from "@/utils/analytics.utils";
import { Warehouse, Users, BarChart3 } from "lucide-react";

interface IProps {
    params: Promise<{ organizationId: number }>;
}

export default async function Warehouses({ params }: IProps) {
    const { organizationId } = await params;
    const orgId = Number(organizationId);

    const [warehouses, userRole, members, globalMovements] = await Promise.all([
        getAllWarehouses(orgId),
        getCurrentUserRole(orgId),
        getOrganizationMembers(orgId),
        getOrganizationInventoryMovements(orgId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if (
        "error" in warehouses ||
        "error" in members ||
        "error" in globalMovements
    )
        return null;

    return (
        <section id="warehouses" className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Active Warehouses
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and monitor operational warehouses across your
                        network.
                    </p>
                </div>

                <InviteMemberModal orgId={organizationId} canEdit={canEdit} />

                <WarehousesHeaderActions
                    orgId={organizationId}
                    canEdit={canEdit}
                />
            </div>

            <Tabs defaultValue="warehouses" className="w-full space-y-6">
                <div className="border-b border-border">
                    <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-8">
                        <TabsTrigger
                            value="warehouses"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            <Warehouse className="w-4 h-4 mr-2" />
                            Warehouse Racks
                            <Badge
                                variant="secondary"
                                className="ml-2 bg-muted text-foreground group-data-[state=active]:bg-primary/10 group-data-[state=active]:text-primary"
                            >
                                {warehouses.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="analytics"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Global Analytics
                        </TabsTrigger>
                        <TabsTrigger
                            value="Members"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:border-indigo-600 data-[state=active]:text-primary data-[state=active]:shadow-none"
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Members
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="warehouses" className="mt-0 outline-none">
                    {warehouses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {warehouses.map((warehouse) => (
                                <WarehouseCard
                                    key={warehouse.id}
                                    warehouse={warehouse}
                                    canEdit={canEdit}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-dashed border-border">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Warehouse className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">
                                No warehouses found
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1">
                                This organization doesn&lsquo;t have any
                                warehouses yet.
                            </p>
                        </div>
                    )}
                </TabsContent>

                <TabsContent
                    value="analytics"
                    className="space-y-6 outline-none"
                >
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2">
                            <MovementActivityChart
                                data={getMovementDataPoint(globalMovements)}
                                title="Company-wide Operations"
                                description="Daily active movement across all warehouses"
                            />
                        </div>

                        <div className="xl:col-span-1">
                            <WriteOffChart
                                data={getMovementDataPoint(globalMovements)}
                                title="Loss Tracking"
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="Members">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Array.isArray(members) &&
                            members.map((member) => (
                                <MemberCard
                                    key={member.id}
                                    member={member}
                                    canEdit={canEdit}
                                />
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}
