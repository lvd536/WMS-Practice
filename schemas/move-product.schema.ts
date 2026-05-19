import * as z from "zod";

export const createMoveProductSchema = (maxQuantity: number) =>
    z.object({
        warehouse_id: z.number().min(1, "Select target warehouse"),
        rack_id: z.number().min(1, "Select target rack"),
        quantity: z
            .number()
            .min(1, "Quantity must be at least 1")
            .max(maxQuantity, `Max available is ${maxQuantity}`),
    });

export type MoveFormValues = z.infer<
    ReturnType<typeof createMoveProductSchema>
>;
