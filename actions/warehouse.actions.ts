"use server";

import { createClient } from "@/lib/supabase/server";
import { ICategory, IWarehouse, IProduct } from "@/types/warehouse.types";
import { revalidatePath } from "next/cache";

export async function getAllWarehouses(organizationId: number) {
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
export async function getWarehouseInfo(warehouseId: number) {
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
export async function getWarehouseProducts(warehouseId: number) {
    try {
        const supabase = await createClient();
        const { data: warehouses, error: warehousesError } = await supabase
            .from("products")
            .select()
            .eq("warehouse_id", warehouseId);
        if (warehousesError) throw new Error(warehousesError.message);

        return warehouses as IProduct[];
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

export async function createWarehouse(
    warehouse: Omit<IWarehouse, "id" | "created_at" | "updated_at">,
) {
    try {
        const supabase = await createClient();
        const { error: warehouseCreationError } = await supabase
            .from("warehouses")
            .insert(warehouse);

        if (warehouseCreationError)
            throw new Error(warehouseCreationError.message);

        revalidatePath("/organizations/[organizationId]/warehouses/", "page");

        return true;
    } catch (err) {
        console.error("createWarehouse error:", err);
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

export async function deleteWarehouse(warehouseId: number) {
    try {
        const supabase = await createClient();
        const { error: warehouseDeleteError } = await supabase
            .from("warehouses")
            .delete()
            .eq("id", warehouseId);

        if (warehouseDeleteError) throw new Error(warehouseDeleteError.message);

        revalidatePath("/organizations/[organizationId]/warehouses/", "page");

        return true;
    } catch (err) {
        console.error("deleteWarehouse error:", err);
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

export async function updateWarehouse(
    warehouseId: number,
    warehouseData: Partial<
        Omit<IWarehouse, "id" | "created_at" | "updated_at">
    >,
) {
    try {
        const supabase = await createClient();
        const { error } = await supabase
            .from("warehouses")
            .update(warehouseData)
            .eq("id", warehouseId);

        if (error) throw new Error(error.message);

        revalidatePath("/organizations/[organizationId]/warehouses/", "page");

        return { status: "success" };
    } catch (err) {
        console.error("updateWarehouse error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}
