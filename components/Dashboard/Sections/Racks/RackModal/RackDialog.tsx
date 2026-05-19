"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { createRack, updateRack } from "@/actions/rack.actions";

import { IWarehouseRack } from "@/types/warehouse.types";

import { RackFormValues } from "@/schemas/rack.schema";

import RackForm from "./RackForm";

interface RackDialogProps {
    warehouseId: number;
    isOpen: boolean;
    onClose: () => void;
    initialData?: IWarehouseRack | null;
}

export default function RackDialog({
    warehouseId,
    isOpen,
    onClose,
    initialData,
}: RackDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const isEditMode = !!initialData;

    const handleSubmit = async (data: RackFormValues) => {
        setIsLoading(true);

        try {
            if (isEditMode && initialData) {
                await updateRack(initialData.id, data);
            } else {
                await createRack({
                    ...data,
                    warehouse_id: warehouseId,
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
                        {isEditMode ? "Edit Rack" : "Add New Rack"}
                    </DialogTitle>
                </DialogHeader>

                <RackForm
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
