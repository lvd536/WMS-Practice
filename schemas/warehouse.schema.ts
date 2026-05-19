import * as z from "zod";

export const warehouseSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    address: z.string().min(2, "Address must be at least 2 characters"),

    max_capacity: z.number().int().min(0, "Max capacity cannot be negative"),
});

export type WarehouseFormValues = z.infer<typeof warehouseSchema>;
