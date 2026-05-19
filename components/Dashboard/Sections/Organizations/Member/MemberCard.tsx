"use client";
import { IMember } from "@/types/warehouse.types";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import MemberEditModal from "./MemberEditModal";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { removeMember } from "@/actions/member.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth.store";

export default function MemberCard({
    member,
    canEdit,
}: {
    member: IMember;
    canEdit: boolean;
}) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const { user } = useAuthStore();

    if (!user || !user.id) return null;

    return (
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-indigo-200 transition-colors">
            <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                    <AvatarImage src={member.profiles?.avatar_path ?? ""} />
                    <AvatarFallback>
                        {member.profiles?.name.charAt(0) ?? "UK"}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-foreground">
                        {member.profiles?.name ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                        {member.role}
                    </p>
                </div>
            </div>

            {canEdit && member.profiles?.id !== user.id && (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => setIsEditOpen(true)}
                            >
                                <Edit className="mr-2 w-4 h-4" /> Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => setIsDeleteOpen(true)}
                            >
                                <Trash2 className="mr-2 w-4 h-4" /> Remove
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <MemberEditModal
                        member={member}
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                    />

                    <AlertDialog
                        open={isDeleteOpen}
                        onOpenChange={setIsDeleteOpen}
                    >
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Remove member?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to remove
                                    {member.profiles?.name ?? "Unknown"} from
                                    this organization?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => removeMember(member.id)}
                                    className="bg-red-600"
                                >
                                    Remove
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </div>
    );
}
