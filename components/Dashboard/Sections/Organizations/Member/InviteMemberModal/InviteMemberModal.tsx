"use client";

import { useState } from "react";
import InviteMemberButton from "./InviteMemberButton";
import InviteMemberDialog from "./InviteMemberDialog";

interface IInviteModalProps {
    orgId: number;
    canEdit: boolean;
}

export default function InviteMemberModal({
    orgId,
    canEdit,
}: IInviteModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    if (!canEdit) return null;

    return (
        <>
            <InviteMemberButton onClick={() => setIsOpen(true)} />
            <InviteMemberDialog
                orgId={orgId}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </>
    );
}
