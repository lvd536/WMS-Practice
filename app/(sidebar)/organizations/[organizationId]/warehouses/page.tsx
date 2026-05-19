"use server";

import { getOrganizationMembers } from "@/actions/member.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { getAllWarehouses } from "@/actions/warehouse.actions";
import InviteMemberModal from "@/components/Dashboard/Sections/Organizations/Member/InviteMemberModal/InviteMemberModal";
import MemberCard from "@/components/Dashboard/Sections/Organizations/Member/MemberCard";
import WarehouseCard from "@/components/Dashboard/Sections/Warehouses/WarehouseCard";
import WarehousesHeaderActions from "@/components/Dashboard/Sections/Warehouses/WarehousesHeaderActions";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Warehouse,
    Users,
} from "lucide-react";

interface IProps {
    params: Promise<{ organizationId: number }>;
}

export default async function Warehouses({ params }: IProps) {
    const { organizationId } = await params;
    const orgId = Number(organizationId);

    const [warehouses, userRole, members] = await Promise.all([
        getAllWarehouses(orgId),
        getCurrentUserRole(orgId),
        getOrganizationMembers(orgId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if ("error" in warehouses || "error" in members) return null;

    return (
        <section id="warehouses" className="p-6 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Active Warehouses
                    </h1>
                    <p className="text-slate-500 mt-1">
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
                <div className="border-b border-slate-200">
                    <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-8">
                        <TabsTrigger
                            value="warehouses"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-slate-500 transition-all hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none"
                        >
                            <Warehouse className="w-4 h-4 mr-2" />
                            Warehouse Racks
                            <Badge
                                variant="secondary"
                                className="ml-2 bg-slate-100 text-slate-600 group-data-[state=active]:bg-indigo-50 group-data-[state=active]:text-indigo-600"
                            >
                                {warehouses.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="Members"
                            className="relative h-12 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-2 text-sm font-medium text-slate-500 transition-all hover:text-slate-700 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none"
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
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                <Warehouse className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">
                                No warehouses found
                            </h3>
                            <p className="text-slate-500 text-sm mt-1">
                                This organization doesn&lsquo;t have any
                                warehouses yet.
                            </p>
                        </div>
                    )}
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
