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

const formSchema = z.object({
    fullName: z
        .string()
        .min(2, "Fullname must be at least 5 characters.")
        .max(24, "Fullname must be at most 32 characters."),
    email: z.email().min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, {
            message: "Must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, { message: "Must contain at least one number" }),
    confirmPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, {
            message: "Must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, { message: "Must contain at least one number" }),
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
    async function onSubmit(data: z.infer<typeof formSchema>) {
        toast.promise<{ name: string }>(
            () =>
                new Promise(async (resolve) => {
                    const resp = await registerUser({
                        name: data.fullName,
                        email: data.email,
                        password: data.password,
                    });
                    if ("success" in resp) {
                        resolve({ name: "Success register" });
                    }
                }),
            {
                loading: "Register your account...",
                success: (data) => data.name,
                error: "Register error",
            },
        );
    }
    return (
        <Card className="w-full sm:max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Registor form</CardTitle>
                <CardDescription>
                    Create your own account and start exploring new experience
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="fullName"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Fullname
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
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
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
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
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="●●●●●●●●"
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
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="●●●●●●●●"
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
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        Register
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
