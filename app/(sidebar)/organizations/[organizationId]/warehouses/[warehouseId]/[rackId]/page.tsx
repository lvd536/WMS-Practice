"use server";

import {
    getAllProductCategories,
    getWarehouseInfo,
    getWarehouseProducts,
} from "@/actions/warehouse.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { Box, FileText, Hash, Scale, Warehouse } from "lucide-react";
import ProductsTable from "@/components/Dashboard/Sections/Racks/Product/ProductsTable";
import RackHeaderActions from "@/components/Dashboard/Sections/Racks/RackHeaderActions";
import { getRackProducts, getWarehouseRack } from "@/actions/rack.actions";

interface IProps {
    params: Promise<{
        warehouseId: string;
        organizationId: string;
        rackId: string;
    }>;
}

export default async function Rack({ params }: IProps) {
    const { organizationId, warehouseId, rackId } = await params;

    const wId = Number(warehouseId);
    const orgId = Number(organizationId);
    const rId = Number(rackId);

    const [
        warehouse,
        rackProducts,
        allWarehouseProducts,
        categories,
        userRole,
        rack,
    ] = await Promise.all([
        getWarehouseInfo(wId),
        getRackProducts(rId),
        getWarehouseProducts(wId),
        getAllProductCategories(),
        getCurrentUserRole(orgId),
        getWarehouseRack(rId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if (
        "error" in warehouse ||
        "error" in rackProducts ||
        "error" in allWarehouseProducts ||
        "error" in categories ||
        "error" in rack
    )
        return (
            <div className="p-8 text-red-500">Failed to load rack data.</div>
        );

    return (
        <section id="rack" className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            {rack.name}
                        </h1>
                        <span className="flex items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                            <Hash className="w-3 h-3 mr-1" />
                            {rack.code}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center mt-3 gap-y-2 text-sm text-slate-600">
                        <div className="flex items-center">
                            <Warehouse className="w-4 h-4 mr-1.5 text-slate-400" />
                            {warehouse.name}
                        </div>
                        <div className="hidden md:block rounded-full w-1 h-1 bg-slate-300 mx-3" />
                        <div className="flex items-center">
                            <Scale className="w-4 h-4 mr-1.5 text-slate-400" />
                            Weight:
                            <span
                                className={`font-medium ${(rack.current_weight ?? 0) > rack.max_weight ? "text-red-500" : "text-slate-900"} ml-1`}
                            >
                                {rack.current_weight} / {rack.max_weight} kg
                            </span>
                        </div>
                        <div className="hidden md:block rounded-full w-1 h-1 bg-slate-300 mx-3" />
                        <div className="flex items-center">
                            <Box className="w-4 h-4 mr-1.5 text-slate-400" />
                            Volume:
                            <span
                                className={`font-medium ${(rack.current_volume ?? 0) > rack.max_volume ? "text-red-500" : "text-slate-900"} ml-1`}
                            >
                                {rack.current_volume} / {rack.max_volume} m³
                            </span>
                        </div>
                    </div>

                    {rack.description && (
                        <p className="mt-2 text-sm text-slate-500 flex items-start">
                            <FileText className="w-4 h-4 mr-1.5 text-slate-400 shrink-0 mt-0.5" />
                            {rack.description}
                        </p>
                    )}
                </div>

                {canEdit && (
                    <RackHeaderActions
                        organizationId={orgId}
                        allWarehouseProducts={allWarehouseProducts}
                        rackId={rId}
                        warehouseId={wId}
                        categories={categories}
                    />
                )}
            </div>

            <ProductsTable
                organizationId={orgId}
                warehouseId={wId}
                rackId={rId}
                products={rackProducts}
                allWarehouseProducts={allWarehouseProducts}
                categories={categories}
                canEdit={canEdit}
            />
        </section>
    );
}
