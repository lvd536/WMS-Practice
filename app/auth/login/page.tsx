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
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
    async function onSubmit(data: z.infer<typeof formSchema>) {
        toast.promise(
            async () => {
                const resp = await loginUser({
                    email: data.email,
                    password: data.password,
                });

                if ("error" in resp! || !resp?.user) {
                    throw new Error(
                        "error" in resp! ? resp.error : "Can't login user now",
                    );
                }

                return {
                    id: resp.user.id,
                    rawResponse: resp,
                };
            },
            {
                loading: "Log in...",
                success: async (result) => {
                    const profile = await getUserProfile(result.id);

                    if (result.rawResponse.user && !("error" in profile)) {
                        setUser(profile);
                        login(result.rawResponse.user);
                        router.push("/profile");
                        return "Success log in!";
                    }
                    return "Cannot get user info, try later";
                },
                error: (err) => err.message || "Login error",
            },
        );
    }
    return (
        <Card className="w-full sm:max-w-md mx-auto mt-10">
            <CardHeader className="flex flex-col items-center justify-center">
                <CardTitle className="font-bold text-2xl leading-[150%] tracking-[-0.03em] text-[#3525cd]">
                    WMS
                </CardTitle>
                <CardDescription>Login into your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
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
                    </FieldGroup>
                    <Button
                        type="submit"
                        form="login-form"
                        className="mt-8 w-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] py-2.5 h-fit leading-[150%] tracking-wider uppercase text-center text-white"
                    >
                        Login
                    </Button>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    type="button"
                    variant="ghost"
                    className="font-medium text-sm text-center text-[#464555] mx-auto"
                    onClick={() => router.push("/auth/register")}
                >
                    <ArrowLeft />
                    Back to Register
                </Button>
            </CardFooter>
        </Card>
    );
}
