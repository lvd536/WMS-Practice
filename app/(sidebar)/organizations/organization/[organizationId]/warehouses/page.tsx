"use server";

import { getCurrentUserRole } from "@/actions/user.actions";
import { getAllWarehouses } from "@/actions/warehouse.actions";
import WarehouseCard from "@/components/Dashboard/Sections/Warehouses/WarehouseCard";
import WarehousesHeaderActions from "@/components/Dashboard/Sections/Warehouses/WarehousesHeaderActions";

interface IProps {
    params: Promise<{ organizationId: number }>;
}

export default async function Warehouses({ params }: IProps) {
    const { organizationId } = await params;
    const orgId = Number(organizationId);

    const [warehouses, userRole] = await Promise.all([
        getAllWarehouses(orgId),
        getCurrentUserRole(orgId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if ("error" in warehouses) return null;

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

                <WarehousesHeaderActions
                    orgId={organizationId}
                    canEdit={canEdit}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {warehouses.map((warehouse) => (
                    <WarehouseCard
                        key={warehouse.id}
                        warehouse={warehouse}
                        canEdit={canEdit}
                    />
                ))}
            </div>
        </section>
    );
}
