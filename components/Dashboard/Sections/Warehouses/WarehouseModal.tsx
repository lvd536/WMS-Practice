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
import { IWarehouse } from "@/types/warehouse.types";
import { createWarehouse, updateWarehouse } from "@/actions/warehouse.actions";

const warehouseSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    address: z.string().min(2, "Address must be at least 2 characters"),
    max_capacity: z.number().int().min(0, "Max capacity cannot be negative"),
});

type WarehouseFormValues = z.infer<typeof warehouseSchema>;

interface IWarehouseModalProps {
    orgId: number;
    isOpen: boolean;
    onClose: () => void;
    initialData?: IWarehouse | null;
}

export default function WarehouseModal({
    orgId,
    isOpen,
    onClose,
    initialData,
}: IWarehouseModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const isEditMode = !!initialData;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<WarehouseFormValues>({
        resolver: zodResolver(warehouseSchema),
        defaultValues: {
            name: initialData?.name ?? "",
            address: initialData?.address ?? "",
            max_capacity: initialData?.max_capacity ?? "",
        } as WarehouseFormValues,
    });

    const onSubmit = async (data: WarehouseFormValues) => {
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
            reset();
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

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name">Warehouse Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Berlin Central Warehouse"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 font-medium">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Warehouse Address</Label>
                        <Input
                            id="address"
                            placeholder="e.g. Alexanderplatz 12, Berlin, Germany"
                            {...register("address")}
                        />
                        {errors.address && (
                            <p className="text-sm text-red-500 font-medium">
                                {errors.address.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="max_capacity">
                            Warehouse Max Capacity
                        </Label>
                        <Input
                            type="number"
                            id="max_capacity"
                            placeholder="e.g. 12000"
                            {...register("max_capacity", {
                                valueAsNumber: true,
                            })}
                        />
                        {errors.max_capacity && (
                            <p className="text-sm text-red-500 font-medium">
                                {errors.max_capacity.message}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isLoading ? "Saving..." : "Save Warehouse"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
