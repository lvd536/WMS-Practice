import * as z from "zod";

export const organizationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z
        .string()
        .max(75, "Description must be at most 75 characters.")
        .optional(),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;
