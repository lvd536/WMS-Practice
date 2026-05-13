"use server";

import {
    getAllProductCategories,
    getWarehouseInfo,
    getWarehouseProducts,
} from "@/actions/warehouse.actions";
import { Button } from "@/components/ui/button";
import { Box, MapPin, Plus } from "lucide-react";
import ProductsTable from "@/components/Dashboard/Sections/Warehouses/ProductsTable";

interface IProps {
    params: Promise<{ warehouseId: string }>;
}

export default async function Warehouse({ params }: IProps) {
    const { warehouseId } = await params;

    const [warehouse, products, categories] = await Promise.all([
        getWarehouseInfo(warehouseId),
        getWarehouseProducts(warehouseId),
        getAllProductCategories(),
    ]);

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

                <Button className="h-10 bg-indigo-600 hover:bg-indigo-700 shadow-md">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <ProductsTable products={products} categories={categories} />
        </section>
    );
}
