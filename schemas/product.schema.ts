import * as z from "zod";

export const newProductSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    category_id: z
        .number({ message: "Please select a category" })
        .min(1, "Please select a category"),
    quantity: z
        .number({ message: "Required" })
        .int()
        .min(0, "Quantity cannot be negative"),
    length: z.number({ message: "Required" }).min(0.001, "Required"),
    width: z.number({ message: "Required" }).min(0.001, "Required"),
    height: z.number({ message: "Required" }).min(0.001, "Required"),
    weight: z.number({ message: "Required" }).min(0.001, "Required"),
});

export const existingProductSchema = z.object({
    product_id: z
        .number({ message: "Please select a product" })
        .min(1, "Please select a product"),
    quantity: z
        .number({ message: "Required" })
        .int()
        .min(1, "Quantity must be at least 1"),
});

export type NewProductFormValues = z.infer<typeof newProductSchema>;
export type ExistingProductFormValues = z.infer<typeof existingProductSchema>;
