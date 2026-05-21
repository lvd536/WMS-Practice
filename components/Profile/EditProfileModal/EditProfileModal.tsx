"use client";

import React from "react";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditProfileForm } from "./EditProfileForm";

interface IProps extends React.PropsWithChildren {
    triggerClassName?: string;
}

export default function EditProfileModal({
    triggerClassName,
    children,
}: IProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children || (
                    <Button className={triggerClassName}>
                        <Pencil /> Edit profile
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <EditProfileForm />
            </DialogContent>
        </Dialog>
    );
}
