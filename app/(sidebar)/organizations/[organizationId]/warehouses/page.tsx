"use server";

import { getOrganizationInventoryMovements } from "@/actions/logs.actions";
import { getOrganizationMembers } from "@/actions/member.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { getAllWarehouses } from "@/actions/warehouse.actions";
import WarehousesAnalyticsTab from "@/components/Dashboard/Sections/Warehouses/WarehousesAnalyticsTab";
import WarehousesHeader from "@/components/Dashboard/Sections/Warehouses/WarehousesHeader";
import WarehousesMambersTab from "@/components/Dashboard/Sections/Warehouses/WarehousesMambersTab";
import WarehousesTab from "@/components/Dashboard/Sections/Warehouses/WarehousesTab";
import WarehousesTabs from "@/components/Dashboard/Sections/Warehouses/WarehousesTabs";
import { Tabs } from "@/components/ui/tabs";

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
            <WarehousesHeader organizationId={orgId} canEdit={canEdit} />

            <Tabs defaultValue="warehouses" className="w-full space-y-6">
                <WarehousesTabs warehousesLength={warehouses.length} />

                <WarehousesTab warehouses={warehouses} canEdit={canEdit} />

                <WarehousesAnalyticsTab globalMovements={globalMovements} />

                <WarehousesMambersTab members={members} canEdit={canEdit} />
            </Tabs>
        </section>
    );
}
