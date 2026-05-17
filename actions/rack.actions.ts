"use server";

import { createClient } from "@/lib/supabase/server";
import {
    IProduct,
    IRackProduct,
    IWarehouseRack,
} from "@/types/warehouse.types";
import { revalidatePath } from "next/cache";

export async function createRack(
    rack: Omit<IWarehouseRack, "id" | "created_at">,
) {
    try {
        const supabase = await createClient();
        const { error: rackCreationError } = await supabase
            .from("warehouse_racks")
            .insert(rack);

        if (rackCreationError) throw new Error(rackCreationError.message);

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/",
            "page",
        );

        return true;
    } catch (err) {
        console.error("createRack error:", err);
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
export async function updateRack(
    rackId: number,
    rack: Omit<IWarehouseRack, "id" | "warehouse_id" | "created_at">,
) {
    try {
        const supabase = await createClient();
        const { error: rackUpdateError } = await supabase
            .from("warehouse_racks")
            .update(rack)
            .eq("id", rackId);

        if (rackUpdateError) throw new Error(rackUpdateError.message);

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/",
            "page",
        );

        return true;
    } catch (err) {
        console.error("updateRack error:", err);
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

export async function deleteRack(rackId: number) {
    try {
        const supabase = await createClient();
        const { error: rackDeleteError } = await supabase
            .from("warehouse_racks")
            .delete()
            .eq("id", rackId);

        if (rackDeleteError) throw new Error(rackDeleteError.message);

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/",
            "page",
        );

        return true;
    } catch (err) {
        console.error("deleteRack error:", err);
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

export async function getWarehouseRack(rackId: number) {
    try {
        const supabase = await createClient();
        const { data, error: getWarehouseRackError } = await supabase
            .from("warehouse_racks")
            .select()
            .eq("id", rackId)
            .maybeSingle();

        if (getWarehouseRackError)
            throw new Error(getWarehouseRackError.message);

        return data as IWarehouseRack;
    } catch (err) {
        console.error("getWarehouseRack error:", err);
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

export async function getRackProducts(rackId: number) {
    try {
        const supabase = await createClient();

        const { data: placements, error: placementsError } = await supabase
            .from("product_placements")
            .select(
                `
                id,
                quantity,
                products (*)
            `,
            )
            .eq("rack_id", rackId);

        if (placementsError) throw new Error(placementsError.message);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedProducts: IRackProduct[] = placements.map((p: any) => ({
            ...p.products,
            placement_id: p.id,
            placement_quantity: p.quantity,
            quantity: p.quantity,
        }));

        return formattedProducts;
    } catch (err) {
        console.error("getRackProducts error:", err);
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

export async function updateRackProduct(
    placementId: number,
    productId: number,
    productData: Partial<Omit<IProduct, "id" | "created_at" | "updated_at">>,
    placementQuantity?: number,
) {
    try {
        const supabase = await createClient();

        if (placementQuantity !== undefined) {
            const { error: placementError } = await supabase
                .from("product_placements")
                .update({ quantity: placementQuantity })
                .eq("id", placementId);

            if (placementError) throw new Error(placementError.message);
        }

        const productUpdateData = { ...productData };
        delete productUpdateData.quantity;

        if (Object.keys(productUpdateData).length > 0) {
            const { error: productError } = await supabase
                .from("products")
                .update(productUpdateData)
                .eq("id", productId);

            if (productError) throw new Error(productError.message);
        }

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/racks/[rackId]",
            "page",
        );

        return { status: "success" };
    } catch (err) {
        console.error("updateRackProduct error:", err);
        return {
            status: "error",
            error: {
                message: err instanceof Error ? err.message : "Error",
            },
        };
    }
}

export async function getWarehouseRacks(warehouseId: number) {
    try {
        const supabase = await createClient();
        const { data: racks, error } = await supabase
            .from("warehouse_racks")
            .select("*")
            .eq("warehouse_id", warehouseId)
            .is("deleted_at", null)
            .order("created_at", { ascending: false });

        if (error) throw new Error(error.message);

        return racks as IWarehouseRack[];
    } catch (err) {
        console.error("getWarehouseRacks error:", err);
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

export async function addProductToRack(
    organizationId: number,
    warehouseId: number,
    rackId: number,
    productData: Omit<IProduct, "id" | "warehouse_id" | "created_at">,
) {
    try {
        const supabase = await createClient();

        const { data: newProduct, error: productError } = await supabase
            .from("products")
            .insert({
                ...productData,
                warehouse_id: warehouseId,
                organization_id: organizationId,
                rack_id: rackId,
            })
            .select()
            .single();

        if (productError) throw new Error(productError.message);

        const { error: placementError } = await supabase
            .from("product_placements")
            .insert({
                product_id: newProduct.id,
                rack_id: rackId,
                quantity: productData.quantity,
            });

        if (placementError) throw new Error(placementError.message);

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/racks/[rackId]",
            "page",
        );

        return { status: "success" };
    } catch (err) {
        console.error("addProductToRack error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}

export async function removeProductFromRack(placementId: number) {
    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from("product_placements")
            .delete()
            .eq("id", placementId);

        if (error) throw new Error(error.message);

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/racks/[rackId]",
            "page",
        );

        return { status: "success" };
    } catch (err) {
        console.error("removeProductFromRack error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}

export async function addExistingProductToRack(
    rackId: number,
    productId: number,
    quantity: number,
) {
    try {
        const supabase = await createClient();

        const { data: existingPlacement, error: checkError } = await supabase
            .from("product_placements")
            .select("id, quantity")
            .eq("rack_id", rackId)
            .eq("product_id", productId)
            .maybeSingle();

        if (checkError) throw new Error(checkError.message);

        if (existingPlacement) {
            const { error: updateError } = await supabase
                .from("product_placements")
                .update({ quantity: existingPlacement.quantity + quantity })
                .eq("id", existingPlacement.id);

            if (updateError) throw new Error(updateError.message);
        } else {
            const { error: insertError } = await supabase
                .from("product_placements")
                .insert({
                    rack_id: rackId,
                    product_id: productId,
                    quantity: quantity,
                });

            if (insertError) throw new Error(insertError.message);
        }

        revalidatePath(
            "/organizations/[organizationId]/warehouses/[warehouseId]/racks/[rackId]",
            "page",
        );

        return { status: "success" };
    } catch (err) {
        console.error("addExistingProductToRack error:", err);
        return {
            status: "error",
            message: err instanceof Error ? err.message : "Error",
        };
    }
}
