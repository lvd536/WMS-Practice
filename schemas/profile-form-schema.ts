import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    phone: z
        .string()
        .min(5, { message: "Phone number must be at least 5 characters" })
        .optional()
        .or(z.literal("")),
    about: z
        .string()
        .max(100, "Description must be at most 100 characters.")
        .optional(),
    avatar: z
        .instanceof(File)
        .optional()
        .nullable()
        .refine(
            (file) => !file || file.size < 5 * 1024 * 1024,
            "Max file size is 5MB",
        )
        .refine(
            (file) => !file || file.type.startsWith("image/"),
            "Avatar must be an image",
        ),
    background: z
        .instanceof(File)
        .optional()
        .nullable()
        .refine(
            (file) => !file || file.size < 5 * 1024 * 1024,
            "Max file size is 5MB",
        )
        .refine(
            (file) => !file || file.type.startsWith("image/"),
            "Background must be an image",
        ),
});

export type EditProfileFormValues = z.infer<typeof formSchema>;
