"use client";

import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface InviteMemberButtonProps {
    onClick: () => void;
}

export default function InviteMemberButton({
    onClick,
}: InviteMemberButtonProps) {
    return (
        <Button
            onClick={onClick}
            variant="outline"
            className="h-10 border-border text-foreground hover:bg-muted shadow-sm"
        >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
        </Button>
    );
}
