import * as z from "zod";

export const rackSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),

    code: z.string().min(2, "Code must be at least 2 characters"),

    description: z.string().optional(),

    max_weight: z.number().min(0, "Max weight cannot be negative"),

    max_volume: z.number().min(0, "Max volume cannot be negative"),
});

export type RackFormValues = z.infer<typeof rackSchema>;
