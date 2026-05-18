"use server";

import { createClient } from "@/lib/supabase/server";
import { IInventoryMovement } from "@/types/warehouse.types";
import { revalidatePath } from "next/cache";

export async function getRackInventoryMovements(
    rackId: number,
    selectFromRack: boolean = true,
    selectToRack: boolean = true,
) {
    try {
        const supabase = await createClient();

        const conditions = [];

        if (selectFromRack || !selectToRack) {
            conditions.push(`from_rack_id.eq.${rackId}`);
        }

        if (selectToRack) {
            conditions.push(`to_rack_id.eq.${rackId}`);
        }

        let query = supabase.from("inventory_movements").select();

        if (conditions.length > 0) query = query.or(conditions.join(","));

        const { data, error } = await query;

        if (error) throw new Error(error.message);

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/racks/[rackId]",
            "page",
        );

        return data as IInventoryMovement[];
    } catch (err) {
        console.error("getRackInventoryMovements error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}

export async function getProductInventoryMovements(productId: number) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("inventory_movements")
            .select()
            .eq("product_id", productId);

        if (error) throw new Error(error.message);

        return data as IInventoryMovement[];
    } catch (err) {
        console.error("getProductInventoryMovements error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}
