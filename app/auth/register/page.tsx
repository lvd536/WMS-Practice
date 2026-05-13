"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserProfile, registerUser } from "@/actions/user.actions";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUserStore } from "@/stores/user.store";

const formSchema = z
    .object({
        fullName: z
            .string()
            .min(2, "Fullname must be at least 2 characters.")
            .max(24, "Fullname must be at most 24 characters."),

        email: z.email().min(1, { message: "Email is required" }),

        password: z
            .string()
            .min(8, {
                message: "Password must be at least 8 characters",
            })
            .regex(/[A-Z]/, {
                message: "Must contain at least one uppercase letter",
            })
            .regex(/[0-9]/, {
                message: "Must contain at least one number",
            }),

        confirmPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default function Register() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const { login } = useAuthStore();
    const { setUser } = useUserStore();
    const router = useRouter();
    async function onSubmit(data: z.infer<typeof formSchema>) {
        toast.promise(
            async () => {
                const resp = await registerUser({
                    email: data.email,
                    password: data.password,
                });

                if ("error" in resp! || !resp?.user) {
                    throw new Error(
                        "error" in resp!
                            ? resp.error
                            : "Can't register user now",
                    );
                }

                return {
                    id: resp.user.id,
                    rawResponse: resp,
                };
            },
            {
                loading: "Register your account...",
                success: async (result) => {
                    const profile = await getUserProfile(result.id);

                    if (result.rawResponse.user && !("error" in profile)) {
                        setUser(profile);
                        login(result.rawResponse.user);
                        return "Success register!";
                    }
                    return "Cannot get user info, try later";
                },
                error: (err) => err.message || "Register error",
            },
        );
    }
    return (
        <Card className="w-full sm:max-w-md mx-auto mt-10">
            <CardHeader className="flex flex-col items-center justify-center">
                <CardTitle className="font-bold text-2xl leading-[150%] tracking-[-0.03em] text-[#3525cd]">
                    WMS
                </CardTitle>
                <CardDescription>Create account</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="fullName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="full-name">
                                        Fullname
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="full-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="John Doe"
                                        autoComplete="off"
                                        className="border px-4 py-3 h-fit! rounded-lg border-solid border-[#c7c4d8]"
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
                                    <FieldLabel htmlFor="email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="example@gmail.com"
                                        autoComplete="off"
                                        className="border px-4 py-3 h-fit! rounded-lg border-solid border-[#c7c4d8]"
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
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="●●●●●●●●"
                                        autoComplete="off"
                                        className="border px-4 py-3 h-fit! rounded-lg border-solid border-[#c7c4d8]"
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
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="confirm-password">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="confirm-password"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="●●●●●●●●"
                                        autoComplete="off"
                                        className="border px-4 py-3 h-fit! rounded-lg border-solid border-[#c7c4d8]"
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
                    <Button
                        type="submit"
                        form="register-form"
                        className="mt-8 w-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] py-2.5 h-fit leading-[150%] tracking-wider uppercase text-center text-white"
                    >
                        Create Account
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    variant="ghost"
                    className="font-medium text-sm text-center text-[#464555] mx-auto"
                    onClick={() => router.push("/auth/login")}
                >
                    <ArrowLeft />
                    Back to Login
                </Button>
            </CardFooter>
        </Card>
    );
}
