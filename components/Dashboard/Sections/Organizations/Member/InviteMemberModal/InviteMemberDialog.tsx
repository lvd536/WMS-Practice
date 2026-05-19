"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { inviteUserToOrganization } from "@/actions/organization.actions";
import InviteMemberForm from "./InviteMemberForm";

interface InviteMemberDialogProps {
    orgId: number;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function InviteMemberDialog({
    orgId,
    isOpen,
    onOpenChange,
}: InviteMemberDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();

    const handleClose = () => {
        onOpenChange(false);
        setErrorMsg("");
    };

    const handleSubmit = async (email: string) => {
        setIsLoading(true);
        setErrorMsg("");

        try {
            const result = await inviteUserToOrganization(orgId, email);

            if (result?.status === "error") {
                const message = result.message ?? "Unhandled error";
                setErrorMsg(message);
                toast.error(message);
                return;
            }

            router.refresh();
            toast.success(
                `Successfully invited user ${email} into organization`,
            );
            handleClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Invite to Organization</DialogTitle>
                </DialogHeader>

                <InviteMemberForm
                    onSubmit={handleSubmit}
                    onCancel={handleClose}
                    isLoading={isLoading}
                    errorMsg={errorMsg}
                />
            </DialogContent>
        </Dialog>
    );
}
