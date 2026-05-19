"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    createOrganization,
    getAllOrganizations,
    updateOrganization,
} from "@/actions/organization.actions";

import { useOrganizationsStore } from "@/stores/organizations.store";
import { useUserStore } from "@/stores/user.store";

import { IOrganization } from "@/types/organization.types";
import { OrganizationFormValues } from "@/schemas/organization.schema";

import OrganizationForm from "./OrganizationForm";

interface OrganizationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: IOrganization | null;
}

export default function OrganizationDialog({
    isOpen,
    onClose,
    initialData,
}: OrganizationDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const user = useUserStore((s) => s.user);

    const { currentOrganization, setCurrentOrganization } =
        useOrganizationsStore();

    const isEditMode = !!initialData;

    const onSubmit = async (data: OrganizationFormValues) => {
        if (!user) return;

        setIsLoading(true);

        try {
            if (isEditMode && initialData) {
                await updateOrganization(initialData.id, data);
            } else {
                await createOrganization({
                    ...data,
                    owner_id: user.id!,
                });
            }

            const freshOrgs = await getAllOrganizations();

            if (Array.isArray(freshOrgs)) {
                useOrganizationsStore.setState({
                    organizations: freshOrgs,
                });

                if (isEditMode && currentOrganization?.id === initialData?.id) {
                    const updatedCurrent = freshOrgs.find(
                        (o) => o.id === initialData.id,
                    );

                    if (updatedCurrent) {
                        setCurrentOrganization(updatedCurrent);
                    }
                }
            }

            router.refresh();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        onClose();
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode
                            ? "Edit Organization"
                            : "Add New Organization"}
                    </DialogTitle>
                </DialogHeader>

                <OrganizationForm
                    initialData={initialData}
                    isLoading={isLoading}
                    onCancel={onClose}
                    onSubmit={onSubmit}
                    isEditMode={isEditMode}
                />
            </DialogContent>
        </Dialog>
    );
}
