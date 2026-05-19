"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { createWarehouse, updateWarehouse } from "@/actions/warehouse.actions";

import { IWarehouse } from "@/types/warehouse.types";

import { WarehouseFormValues } from "@/schemas/warehouse.schema";

import WarehouseForm from "./WarehouseForm";

interface WarehouseDialogProps {
    orgId: number;
    isOpen: boolean;
    onClose: () => void;
    initialData?: IWarehouse | null;
}

export default function WarehouseDialog({
    orgId,
    isOpen,
    onClose,
    initialData,
}: WarehouseDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const isEditMode = !!initialData;

    const handleSubmit = async (data: WarehouseFormValues) => {
        setIsLoading(true);

        try {
            if (isEditMode && initialData) {
                await updateWarehouse(initialData.id, data);
            } else {
                await createWarehouse({
                    ...data,
                    organization_id: orgId,
                });
            }

            router.refresh();

            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-125">
                <DialogHeader>
                    <DialogTitle>
                        {isEditMode ? "Edit Warehouse" : "Add New Warehouse"}
                    </DialogTitle>
                </DialogHeader>

                <WarehouseForm
                    initialData={initialData}
                    isEditMode={isEditMode}
                    isLoading={isLoading}
                    onClose={onClose}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}
