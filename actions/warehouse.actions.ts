"use server";

import { createClient } from "@/lib/supabase/server";
import { IWarehouse, IWarehouseProduct } from "@/types/warehouse.types";

export async function getAllWarehouses(organizationId: string) {
    try {
        const supabase = await createClient();
        const { data: warehouses, error: warehousesError } = await supabase
            .from("warehouses")
            .select()
            .eq("organization_id", organizationId);

        if (warehousesError) throw new Error(warehousesError.message);

        return warehouses as IWarehouse[];
    } catch (err) {
        console.error("getAllWarehouses error:", err);
        return {
            status: "error",
            error: {
                message:
                    err instanceof Error
                        ? err.message
                        : "Unexpected error occurred",
            },
        };
    }
}
export async function getWarehouseInfo() {}
export async function getWarehouseProducts(warehouseId: string) {
    try {
        const supabase = await createClient();
        const { data: warehouses, error: warehousesError } = await supabase
            .from("products")
            .select(
                `
                *,
                product_categories(*)
                `,
            )
            .eq("warehouse_id", warehouseId);

        if (warehousesError) throw new Error(warehousesError.message);

        return warehouses as IWarehouseProduct[];
    } catch (err) {
        console.error("getWarehouseProducts error:", err);
        return {
            status: "error",
            error: {
                message:
                    err instanceof Error
                        ? err.message
                        : "Unexpected error occurred",
            },
        };
    }
}
