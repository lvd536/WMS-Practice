"use server";

import { createClient } from "@/lib/supabase/server";
import {
    IInventoryMovement,
    IProductInventoryMovement,
    IDetailedInventoryMovement,
} from "@/types/warehouse.types";

export async function getOrganizationInventoryMovements(orgId: number) {
    try {
        const supabase = await createClient();

        const { data: movements, error } = await supabase.rpc(
            "get_org_inventory_movements",
            { p_org_id: orgId },
        );

        if (error) throw new Error(error.message);

        return movements as IDetailedInventoryMovement[];
    } catch (err) {
        console.error("getOrganizationInventoryMovements error:", err);
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

export async function getWarehouseInventoryMovements(warehouseId: number) {
    try {
        const supabase = await createClient();

        const { data: movements, error } = await supabase.rpc(
            "get_warehouse_movements",
            { p_warehouse_id: warehouseId },
        );

        if (error) throw new Error(error.message);

        return movements as IDetailedInventoryMovement[];
    } catch (err) {
        console.error("getWarehouseInventoryMovements error:", err);
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

export async function getRackMovements(rackId: number) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("inventory_movements")
            .select()
            .or(`from_rack_id.eq.${rackId}, to_rack_id.eq.${rackId}`);

        if (error) throw new Error(error.message);

        return data as IInventoryMovement[];
    } catch (err) {
        console.error("getProductMovements error:", err);
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

export async function getProductMovements(productId: number) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase.rpc("get_product_movements", {
            p_product_id: productId,
        });

        if (error) throw new Error(error.message);

        return data as IProductInventoryMovement[];
    } catch (err) {
        console.error("getProductMovements error:", err);
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
