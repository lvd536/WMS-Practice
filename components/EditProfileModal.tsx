"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserProfile, updateUserProfile } from "@/actions/user.actions";
import { useUserStore } from "@/stores/user.store";
import { Label } from "./ui/label";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "./ui/input-group";
import { Pencil } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";

interface IProps {
    triggerClassName?: string;
}

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.email().min(1, { message: "Email is required" }),
    phone: z
        .string()
        .min(5, {
            message: "Phone number must be at least 5 characters",
        })
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

export default function EditProfileModal({ triggerClassName }: IProps) {
    const user = useUserStore((s) => s.user);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name ?? "",
            email: user?.email ?? "",
            about: user?.about ?? "",
            phone: user?.phone ?? "",
        },
    });
    const token = useAuthStore((s) => s.token);
    async function onSubmit(data: z.infer<typeof formSchema>) {
        toast.promise<{ name: string }>(
            () =>
                new Promise(async (resolve) => {
                    const updated = await updateUserProfile(data, token!);
                    if (updated.success) {
                        resolve({ name: "Your profile successfully updated" });
                    }
                }),
            {
                loading: "Updating profile...",
                success: async (data) => {
                    const profile = await getUserProfile(token!);
                    useUserStore.getState().setUser(profile);
                    return data.name;
                },
                error: "Profile update error",
            },
        );
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={triggerClassName}>
                    <Pencil /> Edit profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form
                    id="edit-profile-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <DialogHeader className="mb-3">
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        {...field}
                                        id="name"
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="John Doe"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="example@gmail.com"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="about"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label htmlFor="about">About</Label>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="about"
                                            placeholder="Warehouse manager."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {field.value && (
                                            <InputGroupAddon align="block-end">
                                                <InputGroupText className="tabular-nums">
                                                    {field.value.length}/100
                                                    characters
                                                </InputGroupText>
                                            </InputGroupAddon>
                                        )}
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        {...field}
                                        id="phone"
                                        type="tel"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="+79991118989"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="avatar"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label htmlFor="avatar">Avatar</Label>

                                    <Input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            field.onChange(
                                                e.target.files?.[0] ?? null,
                                            );
                                        }}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="background"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <Label htmlFor="background">
                                        Background
                                    </Label>

                                    <Input
                                        id="background"
                                        type="file"
                                        accept="image/*"
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        onChange={(e) => {
                                            field.onChange(
                                                e.target.files?.[0] ?? null,
                                            );
                                        }}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
