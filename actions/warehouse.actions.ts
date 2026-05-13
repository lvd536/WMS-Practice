"use server";

import { createClient } from "@/lib/supabase/server";
import {
    ICategory,
    IWarehouse,
    IWarehouseProduct,
} from "@/types/warehouse.types";

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
export async function getWarehouseInfo(warehouseId: string) {
    try {
        const supabase = await createClient();
        const { data: warehouse, error: warehouseError } = await supabase
            .from("warehouses")
            .select()
            .eq("id", warehouseId)
            .maybeSingle();

        if (warehouseError) throw new Error(warehouseError.message);

        return warehouse as IWarehouse;
    } catch (err) {
        console.error("getWarehouseInfo error:", err);
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
export async function getWarehouseProducts(warehouseId: string) {
    try {
        const supabase = await createClient();
        const { data: warehouses, error: warehousesError } = await supabase
            .from("products")
            .select()
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

export async function getAllProductCategories() {
    try {
        const supabase = await createClient();
        const { data: categories, error: categoriesError } = await supabase
            .from("product_categories")
            .select();

        if (categoriesError) throw new Error(categoriesError.message);

        return categories as ICategory[];
    } catch (err) {
        console.error("getAllProductCategories error:", err);
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
