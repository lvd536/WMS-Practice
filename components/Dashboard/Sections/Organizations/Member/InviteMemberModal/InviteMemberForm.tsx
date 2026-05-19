"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const inviteSchema = z.object({
    email: z.email("Please enter a valid email address"),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

interface InviteMemberFormProps {
    onSubmit: (email: string) => Promise<void>;
    onCancel: () => void;
    isLoading: boolean;
    errorMsg: string;
}

export default function InviteMemberForm({
    onSubmit,
    onCancel,
    isLoading,
    errorMsg,
}: InviteMemberFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InviteFormValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { email: "" },
    });

    const submitHandler = async (data: InviteFormValues) => {
        await onSubmit(data.email);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 mt-2">
            <div className="space-y-2">
                <Label htmlFor="email">User Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="colleague@example.com"
                    {...register("email")}
                />
                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {errorMsg && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                    {errorMsg}
                </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/90"
                >
                    {isLoading ? "Sending Invite..." : "Send Invite"}
                </Button>
            </div>
        </form>
    );
}
