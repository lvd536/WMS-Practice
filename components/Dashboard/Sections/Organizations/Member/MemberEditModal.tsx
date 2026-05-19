"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateMemberRole } from "@/actions/member.actions";
import { useState } from "react";
import { IMember } from "@/types/warehouse.types";

interface IProps {
    member: IMember;
    isOpen: boolean;
    onClose: () => void;
}

export default function MemberEditModal({ member, isOpen, onClose }: IProps) {
    const [role, setRole] = useState(member.role);
    const handleSave = async () => {
        await updateMemberRole(member.id, role);
        onClose();
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xs">
                <DialogHeader>
                    <DialogTitle>Edit Role</DialogTitle>
                </DialogHeader>
                <Select
                    value={role}
                    onValueChange={(value) =>
                        setRole(value as "owner" | "admin" | "member")
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={handleSave} className="w-full bg-primary">
                    Save Changes
                </Button>
            </DialogContent>
        </Dialog>
    );
}
