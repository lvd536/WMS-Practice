"use server";

import {
    getAllProductCategories,
    getWarehouseInfo,
    getWarehouseProducts,
} from "@/actions/warehouse.actions";
import { getCurrentUserRole } from "@/actions/user.actions";
import { Box, MapPin } from "lucide-react";
import ProductsTable from "@/components/Dashboard/Sections/Warehouses/ProductsTable";
import WarehouseHeaderActions from "@/components/Dashboard/Sections/Warehouses/WarehouseHeaderActions";

interface IProps {
    params: Promise<{ warehouseId: string; organizationId: string }>;
}

export default async function Warehouse({ params }: IProps) {
    const { organizationId, warehouseId } = await params;

    const wId = Number(warehouseId);
    const orgId = Number(organizationId);

    const [warehouse, products, categories, userRole] = await Promise.all([
        getWarehouseInfo(wId),
        getWarehouseProducts(wId),
        getAllProductCategories(),
        getCurrentUserRole(orgId),
    ]);

    const canEdit = userRole === "owner" || userRole === "admin";

    if ("error" in warehouse || "error" in products || "error" in categories)
        return (
            <div className="p-8 text-red-500">
                Failed to load warehouse data.
            </div>
        );

    return (
        <section id="warehouse" className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                    <WarehouseHeaderActions
                        warehouseId={wId}
                        categories={categories}
                    />
                )}
            </div>

            <ProductsTable
                warehouseId={wId}
                products={products}
                categories={categories}
                canEdit={canEdit}
            />
        </section>
    );
}
