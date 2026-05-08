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
import { getUserProfile, loginUser } from "@/actions/user.actions";
import { useUserStore } from "@/stores/user.store";
import { useAuthStore } from "@/stores/auth.store";

const formSchema = z.object({
    email: z.email().min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/[A-Z]/, {
            message: "Must contain at least one uppercase letter",
        })
        .regex(/[0-9]/, { message: "Must contain at least one number" }),
});

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { login } = useAuthStore();
    const { setUser } = useUserStore();
    async function onSubmit(data: z.infer<typeof formSchema>) {
        toast.promise<{ name: string }>(
            () =>
                new Promise(async (resolve) => {
                    const resp = await loginUser({
                        email: data.email,
                        password: data.password,
                    });
                    if ("token" in resp) {
                        resolve({ name: resp.token });
                    }
                }),
            {
                loading: "Log in...",
                success: async (data) => {
                    login(data.name);
                    const user = await getUserProfile(data.name);
                    if (user) {
                        setUser(user);
                    } else return "Cannot get user info, try later";
                    return "Success log in!";
                },
                error: "Login error",
            },
        );
    }
    return (
        <Card className="w-full sm:max-w-md mx-auto mt-10">
            <CardHeader>
                <CardTitle>Login form</CardTitle>
                <CardDescription>Login into your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
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
                        Login
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
