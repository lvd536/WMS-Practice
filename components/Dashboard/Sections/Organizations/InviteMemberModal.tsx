"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { inviteUserToOrganization } from "@/actions/organization.actions";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

const inviteSchema = z.object({
    email: z.email("Please enter a valid email address"),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

interface IInviteModalProps {
    orgId: number;
    canEdit: boolean;
}

export default function InviteMemberModal({
    orgId,
    canEdit,
}: IInviteModalProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InviteFormValues>({
        resolver: zodResolver(inviteSchema),
        defaultValues: { email: "" },
    });

    const handleClose = () => {
        setIsOpen(false);
        setErrorMsg("");
        reset();
    };

    const onSubmit = async (data: InviteFormValues) => {
        setIsLoading(true);
        setErrorMsg("");

        try {
            const result = await inviteUserToOrganization(orgId, data.email);

            if (result?.status === "error") {
                setErrorMsg(result.message ?? "Unhandled error");
                toast.error(result.message ?? "Unhandled error");
                return;
            }

            router.refresh();
            toast.success(
                `Successfully invited user ${data.email} into organization`,
            );
            handleClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!canEdit) return null;

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                className="h-10 border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
            >
                <UserPlus className="mr-2 h-4 w-4" /> Invite Member
            </Button>

            <Dialog
                open={isOpen}
                onOpenChange={(open) => !open && handleClose()}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Invite to Organization</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 mt-2"
                    >
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
                            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                                {errorMsg}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {isLoading
                                    ? "Sending Invite..."
                                    : "Send Invite"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
