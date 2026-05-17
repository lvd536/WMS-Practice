"use server";

import { getWarehouseInfo } from "@/actions/warehouse.actions";
import { getWarehouseRacks } from "@/actions/rack.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { Box, MapPin, Layers } from "lucide-react";
import RackCard from "@/components/Dashboard/Sections/Racks/RackCard";
import RacksHeaderActions from "@/components/Dashboard/Sections/Racks/RacksHeaderActions";

interface IProps {
    params: Promise<{ warehouseId: string; organizationId: string }>;
}

export default async function Warehouse({ params }: IProps) {
    const { organizationId, warehouseId } = await params;

    const wId = Number(warehouseId);
    const orgId = Number(organizationId);

    const [warehouse, racks, userRole] = await Promise.all([
        getWarehouseInfo(wId),
        getWarehouseRacks(wId),
        getCurrentUserRole(orgId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if ("error" in warehouse || "error" in racks) {
        return (
            <div className="p-8 text-red-500">
                Failed to load warehouse data.
            </div>
        );
    }

    return (
        <section id="warehouse" className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        {warehouse.name}
                    </h1>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
                            {warehouse.address}
                        </div>
                        <div className="rounded-full w-1 h-1 bg-slate-300 mx-3" />
                        <div className="flex items-center text-sm text-slate-600">
                            <Box className="w-4 h-4 mr-1.5 text-slate-400" />
                            Max Capacity: {warehouse.max_capacity} units
                        </div>
                    </div>
                </div>

                {canEdit && (
                    <RacksHeaderActions warehouseId={wId} canEdit={canEdit} />
                )}
            </div>

            {racks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {racks.map((rack) => (
                        <RackCard
                            key={rack.id}
                            warehouseId={wId}
                            rack={rack}
                            canEdit={canEdit}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <Layers className="w-12 h-12 text-slate-300 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900">
                        No racks found
                    </h3>
                    <p className="text-slate-500 text-sm mt-1 mb-4 text-center max-w-sm">
                        This warehouse doesn&lsquo;t have any racks yet.
                        {canEdit && "Add your first rack."}
                    </p>
                </div>
            )}
        </section>
    );
}
