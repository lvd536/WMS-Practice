"use server";

import { getWarehouseInfo } from "@/actions/warehouse.actions";
import { getWarehouseRacks } from "@/actions/rack.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { Tabs } from "@/components/ui/tabs";
import { getWarehouseInventoryMovements } from "@/actions/logs.actions";
import WarehouseInventoryMovements from "@/components/Dashboard/Sections/Warehouses/Warehouse/Tabs/WarehouseInventoryMovements";
import WarehouseRacks from "@/components/Dashboard/Sections/Warehouses/Warehouse/Tabs/WarehouseRacks";
import WarehouseAnalytics from "@/components/Dashboard/Sections/Warehouses/Warehouse/Tabs/WarehouseAnalytics";
import WarehouseHeader from "@/components/Dashboard/Sections/Warehouses/Warehouse/WarehouseHeader/WarehouseHeader";
import WarehouseTabs from "@/components/Dashboard/Sections/Warehouses/Warehouse/Tabs/WarehouseTabs";

interface IProps {
    params: Promise<{ warehouseId: string; organizationId: string }>;
}

export default async function Warehouse({ params }: IProps) {
    const { organizationId, warehouseId } = await params;

    const wId = Number(warehouseId);
    const orgId = Number(organizationId);

    const [warehouse, racks, userRole, inventoryMovements] = await Promise.all([
        getWarehouseInfo(wId),
        getWarehouseRacks(wId),
        getCurrentUserRole(orgId),
        getWarehouseInventoryMovements(wId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if (
        "error" in warehouse ||
        "error" in racks ||
        "error" in inventoryMovements
    ) {
        return (
            <div className="p-8 text-red-500">
                Failed to load warehouse data.
            </div>
        );
    }

    return (
        <section id="warehouse" className="p-6 md:p-8">
            <WarehouseHeader
                warehouse={warehouse}
                wId={wId}
                canEdit={canEdit}
            />
            <Tabs defaultValue="racks" className="w-full space-y-6">
                <WarehouseTabs
                    movementsLength={inventoryMovements.length}
                    racksLength={racks.length}
                />

                <WarehouseRacks racks={racks} wId={wId} canEdit={canEdit} />

                <WarehouseInventoryMovements
                    inventoryMovements={inventoryMovements}
                />

                <WarehouseAnalytics inventoryMovements={inventoryMovements} />
            </Tabs>
        </section>
    );
}
